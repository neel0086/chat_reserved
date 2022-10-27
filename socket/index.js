import { Server } from 'socket.io';
import { socketData, socketDataGet } from './api.js';


const io = new Server(9000, {
    cors: {
        origin: 'http://localhost:3000',
    }, 
})


let users = []
const func = async () => {
    users = await socketDataGet()
    console.log(users)
}
// func()

let grps = [];

const addUser = (userId, socketId) => {
    
    !users.some(user => user.userId === userId) && users.push({ userId, socketId }) ;
    
}

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId);
}

const getUser = (userId) => {

    return users.find(user => user.userId === userId);
}

const addGrp = (userId, socketId) => {
    
    !grps.some(user => user.userId === userId) && grps.push({ userId, socketId }) ;
}

const removeGrp = (socketId) => {
    grps = users.filter(user => user.socketId !== socketId);
}

const getGrp = (userId) => {

    return grps.find(user => user.userId === userId);
}

io.on('connection',  (socket) => {
    console.log('user connected',socket.id)
    
    //connect
    socket.on("addUser", userId => {
        addUser(userId, socket.id);
        console.log(users)
        io.emit("getUsers", users);
    })
    socket.on("addGrp", userId => {
        
        addGrp(userId, socket.id);
        // console.log(userId,grps)
        io.emit("getGrp", grps);
    })
    //send message
    socket.on('sendMessage', ({flag, senderId, receiverId, text, name, photo}) => {
        
        const user = getUser(receiverId);
        console.log(user)
        io.to(user.socketId).emit('getMessage', {
            senderId, text, photo, name
        })
        
            
        
    })

    socket.on('sendgrpMessage', ({flag, senderId, receiverId, text, name, photo}) => {
        
        console.log(receiverId,grps)
            const grp = getGrp(receiverId);
            
            io.to(grp.socketId).emit('getgrpMessage', {
                senderId, text, photo, name
            })
        
    })

    // disconnect
    // socket.on('disconnect', () => {
    //     console.log('user disconnected');
    //     removeUser(socket.id);
    //     io.emit('getUsers', users);
    // })
})