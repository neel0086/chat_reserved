import { Avatar } from '@material-ui/core'
import React, { useContext } from 'react'
import { GroupContext } from '../context/GroupProvider'
import './Group.css'
function Group({grpInfo}) {

  //CONTEXT AUTH AND PERSON SELECT
  // const {setPerson} =useContext(UserContext)
  const {setRoom} =useContext(GroupContext)

  //PROFILE URL
  // const url=userInfo.imageUrl
  

  const setGroup = async () =>{
    setRoom(grpInfo)
    console.log(grpInfo)
  }

  return (
    <div className='people' onClick={()=>setGroup()}>
        <Avatar/>
        <div className='people_info'>
            <h3 style={{fontWeight:0,marginBottom:0}}>{grpInfo.grpName}</h3>
            <p>Hello buddy </p>
        </div>
    </div>
  )
}

export default Group