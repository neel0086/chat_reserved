import React, { useEffect, useRef, useState } from 'react'
import { createContext } from 'react'
import { io } from 'socket.io-client'
export const GroupContext = createContext(null);
function GroupProvider({children}) {
    const [room,setRoom] = useState({})
    const [grpE,setGrpE] = useState(true)
    const [activegrps,setActivegrps] = useState([])
    const socket = useRef()
    useEffect(() =>{
      socket.current = io('ws://localhost:9000')
    },[])
    
  return (
      <GroupContext.Provider value={{
        room,
        setRoom,
        grpE,
        setGrpE,
        socket,
        setActivegrps,
      }} >
      {children}
      </GroupContext.Provider>
  )
}

export default GroupProvider