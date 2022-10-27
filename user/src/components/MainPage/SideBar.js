import React, { useContext, useEffect, useState } from 'react'
import './SideBar.css'
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import DarkModeIcon from '@material-ui/icons/Brightness4';
import { Avatar, Dialog, IconButton } from '@material-ui/core';
import { GoogleLogout } from 'react-google-login';
import SearchIcon from '@material-ui/icons/Search';
import Contacts from './Contacts';
import { clientId } from '../../constants/data';
import { AccountContext } from '../context/AccountProvider';
import { getgroups, getUsers, grpDetail } from '../../service/api';
import { UserContext } from '../context/UserProvider';
import Group from './Group';
import { GroupContext } from '../context/GroupProvider';


function SideBar() {

    //CONTEXT
    const {account,setAccount} = useContext(AccountContext)
    const {grpE,setGrpE} = useContext(GroupContext)
    
    //PROFILE URL
    const profileUrl = account.imageUrl

    //FREIND LIST 
    const [friend,setFriend]=useState([])
    const [group,setGroup] = useState(true)
    const [grpData,setGrpData] = useState([])


    //MOdal
    const [showModal, setShowModal] = useState(false);
    const [name,setName]=useState('')

    //LOGOUT PROCESS
    const onLoginSuccess = () =>{
        setAccount(null)
        // setPerson(null)
        alert("You have logged out success")
        console.clear()
        
    }

    const  handleSubmit = async (e) => {
        e.preventDefault();
        grpDetail({
            admin:account.googleId,
            grpName:name,
        },)
        setName("")
        
        setShowModal(false);
    }

    // useEffect(()=>{
    //     if(showModal){
    //         var modal = document.getElementById("myModal");
    //         var modal1 = document.getElementById("opmodal");
            
    //         window.onclick = function(event) {
    //             console.log(event.target,showModal)
    //             if (event.target != modal && event.target!=modal1) {
    //                 console.log(9)
    //               setShowModal(false)
    //             }
    //         }
    //     }
    // },[showModal])

    //GETTING ALL FRIENDS
    useEffect(() =>{
        const fetchData = async ()=>{
            const usersData = await getUsers()
            
            setFriend(usersData)
            
        }
        fetchData()
        
    },[])
    useEffect(() =>{
        const fetchDataG = async ()=>{
            const grpnames = await getgroups()
            console.log(grpnames)
            setGrpData(grpnames)
        }
        fetchDataG()
        
    },[])

    //Group Name
    // function handleSubmit(e){
    //     e.preventDefault();
        
    //     handleClose();
    // }

    
    
  return (
    <div className='side'>
        <div className="side_header">
            <Avatar src={profileUrl} />
            <div className="side_hright">
                
                <IconButton>
                    {/* <MoreVertIcon /> */}
                    <GoogleLogout 
                    buttonText='Logout'
                        clientId={clientId}
                        isSignedIn={true}
                        onLogoutSuccess={onLoginSuccess}
                        
                    />
                </IconButton>
                <IconButton>
                    <DarkModeIcon style={{color:'white',fontSize:'30'}}/>
                </IconButton>
                <IconButton>
                    <GroupAddIcon 
                        style={{color:'white',fontSize:'30'}} 
                        onClick={()=>setShowModal(true)}
                        id='opmodal'
                        />
                </IconButton>
                
            </div>
        </div>
        <div className="side_search">
            <div className="search">
                <SearchIcon style={{verticalAlign:'middle'}}/>
                <input type="text" placeholder='Search or start new chat' spellCheck="false"/>
            </div>
        </div>
        <div className="side_user">
        <div className='g-contain'>
            <span onClick={() =>{setGroup(true);setGrpE(true)}} className={group?'s-active':''}>PRIVATE</span>
            <span onClick={() =>{setGroup(false);setGrpE(false)}} className={!group?'s-active':''}>GROUP</span>
        </div>
        {group ?
        <div>
               
            {friend.map(user =>(
                user.googleId != account.googleId &&
                <Contacts key={user.googleId} userInfo={user}/> 
            ))}
            </div>    
            :
            <div>   
            {grpData.map(grps =>(
                <Group key={grps._id} grpInfo={grps}/>
            ))}
            </div> 
            
            }
        </div>
        
        <div id="myModal" className="modal" style={{display:showModal ? 'block' : 'none'}}>
        <form onSubmit={handleSubmit}>
            <label for="fname">First Name</label>
            <input type="text" id="fname" placeholder="Your name.." 
                value={name} onChange={(e)=>setName(e.target.value)}
            />
            <input type="submit" value="Submit" />
        </form>
            

        </div>
        
    </div>
  )
}

export default SideBar