import { Avatar, IconButton } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import SearchIcon from '@material-ui/icons/Search';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MoodIcon from '@material-ui/icons/Mood';
import SendIcon from '@material-ui/icons/Send';
import GetAppIcon from '@material-ui/icons/GetApp';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import  './Chat.css'
import { getCoversation, getGrpMessage, imagefile, newGrpMessage, newMessage, uploadFile } from '../../service/api';
import { AccountContext } from '../context/AccountProvider';
import { smily,hand,animal, family, sports, places } from './emojiArray';
import { GroupContext } from '../context/GroupProvider';
function Chat() {

    //USECONTEXT TO SET USER
    const {room,setActivegrps,socket} = useContext(GroupContext)
    const {account,  activeUsers,newMessageFlag, setNewMessageFlag } =useContext(AccountContext)
    
    //USESTATE
    const [converse,setConverse] = useState({})
    const [smile,setSmile] = useState(false)
    const [emoji,setEmoji] = useState(smily)
    const [value,setValue]=useState('')
    const [conversations,setConversations]=useState([])
    const [incomingMessage, setIncomingMessage] = useState(null);
    const [newImage,setNewImage] = useState({})
    const [imageName,setImageName] = useState('')
    // const [imageURL,setImageURL] = useState('')
    
    console.log(room)
    useEffect(() => {
        
        socket.current.on('getgrpMessage', data => {
            
            setIncomingMessage({
                sender: data.senderId,
                text: data.text,
                photo:data.photo,
                name:data.name,
                conversationId:data.conversationId,
                createdAt: Date.now()
            })
        })
    }, []);


    //when room is clicked on sidebar fetch the new rooms converations
  

    

    useEffect(() =>{
        const getMessageDetails = async () =>{
            let data = await getGrpMessage(room._id)
            console.log(data)
            setConversations(data)
        }
        getMessageDetails();
    },[room._id,newMessageFlag,converse?._id])

    //fetch conversations between users 
    useEffect(() => {
        incomingMessage  && 
            setConversations((prev) => [...prev, incomingMessage]);
        
        
    }, [incomingMessage]);
    //SOCKET.IO CONNECTING USERS
    
    useEffect(()=>{console.log(room._id)
        socket.current.emit('addGrp',room._id)
        socket.current.on('getGrp',users =>{
            console.log(users)
            setActivegrps(users)
        })
    },[room])

    const receiverId = room._id;
    //ON ENTER PRESS SEND TEXT TO MONGODB
    const sendText = async (e) =>{
        let code = e.keyCode || e.which
        console.log(e)
        if (code==13 || e.type=='click'){
            imagefile(newImage)
            let message={
                name:account.name,
                sender:account.googleId,
                conversationId:room._id,
                text:value,
                photo:imageName
            }
            socket.current.emit('sendgrpMessage', {
                flag:0,
                name:account.name,
                senderId: account.googleId,
                receiverId,
                text: value,
                photo:imageName
            })
            
            await newGrpMessage(message)
            
            setValue('')
            setImageName('')
            setNewMessageFlag(prev => !prev);
        }
    }
    const handlePhoto = async (e) =>{
        const formData = new FormData()
        const dateImg = Date.now()
        const val=e.target.files[0]
        const imgfile = new File([val], dateImg+val.name, {type: val.type});
        formData.append('photo',imgfile)
        formData.append('sender',account.googleId)
        formData.append('conversationId',converse._id)
        formData.append('text',value)
        formData.append('name',account.name)
        setNewImage(formData)
        setImageName(dateImg+val.name)
        
        
    }
    
    
  return (
    <>
        {!room ? 
        <div className='nothing'>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Internet-group-chat.svg/768px-Internet-group-chat.svg.png"/>
            <p>Select to start chat</p>
        </div>
        
        : <div className='chat'>
        <div className="chat_header">
            <Avatar src={room.imageUrl}/>
            <div className="info">
                <h3>{room ? room.grpName : ''}</h3>
                <p>{activeUsers ?.find(user => user.googleId === room.googleId) ? 'online' :'offline'}</p>
            </div>
        
        
            <div className="side_hright">
                <IconButton>
                    <SearchIcon />
                </IconButton>
                <IconButton>
                    <MoreVertIcon />
                </IconButton>
                
                
            </div>
        </div> 
        <div className="chatBody">
            {conversations && conversations.map((mssg) =>(
                
                <p className={mssg.sender!=account.googleId ? 'mssg' : 'mssg mssg_sender'}>
                    {!mssg.photo ?<>
                    {mssg.sender==account.googleId ?  <span className='name_tag'></span> : <span className="name_tag">  {/*mssg.name*/} </span>}
                    <p>{mssg.text}</p> </>
                    : <div className='imageandtext' ><a href={`http://localhost:8000//${mssg.photo}`} onClick='return false' className='downloadImg' target='blank' download><GetAppIcon /></a><img src={`http://localhost:8000//${mssg.photo}`} className="imagesend"/>
                    <span>{mssg.text}</span>
                    </ div>
                    }
                    <span className="time_tag">
                        {new Date().toDateString()}
                    </span>
                    
                </p>
                
            ))
            
            }
            
            

        </div>
        <div>
            <div className='footer'>
                <div style={{display:'flex',gap:'0.8rem',padding:'10px'}}>
                    <MoodIcon onClick={() => setSmile(!smile)} />
                    
                    <form  encType='multipart/form-data'>
                    <label for="im"><AttachFileIcon /></label>
                        
                        <input 
                            type="file" 
                            id='im'
                            name='myFile' 
                            onChange={handlePhoto}
                            style={{display:'none'}}
                        />
                        </form>
                    
                </div>
                <div className='form'>
                    <input
                        type="text" 
                        onKeyPress={(e) => sendText(e)}
                        placeholder='Type A message...' 
                        onChange={(e) => setValue(e.target.value)}
                        value={value}
                        spellCheck="false"
                    />
                </div>              
                <IconButton>
                    <SendIcon onClick={(e)=>sendText(e)}/>
                </IconButton>
            </div>
            <div className="emoji-section" style={{display:smile ? 'block':'none'}}>
                <div className="emojibar">
                    <span onClick={()=>setEmoji(smily)}>😊</span>
                    <span onClick={()=>setEmoji(hand)}>🖐</span>
                    <span onClick={()=>setEmoji(animal)}>🐵</span>
                    <span onClick={()=>setEmoji(family)}>👨‍👨‍👦‍👦</span>
                    <span onClick={()=>setEmoji(sports)}>⚽️</span>
                    <span onClick={()=>setEmoji(places)}>🚗</span>
                </div>
                <div className="emoji">
                    {
                        emoji.map(e=><span onClick={()=>setValue(value+e)}>{e}</span>)
                    }
                </div>
            </div>
        </div>
    </div>
    }
    </>
  )
}

export default Chat