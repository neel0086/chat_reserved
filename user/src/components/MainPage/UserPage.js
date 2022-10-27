import React, { useContext } from 'react'

import SideBar from './SideBar';
import Chat from './Chat';
import './UserPage.css'
import GroupChat from './GroupChat';
import { GroupContext } from '../context/GroupProvider';
function UserPage() {
  const {grpE,setGrpE} = useContext(GroupContext)
  return (
    <div className='user_page'>
    <div className='main_body'>
      <SideBar />
      {grpE ?
       <Chat />
       :
       <GroupChat />
      } 
    </div>
    </div>
  )
}

export default UserPage