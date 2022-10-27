import axios from 'axios'
const URL = `http://localhost:8000`
export const addUser = async (data) =>{
    try{
        return await axios.post(`${URL}/add`,data)
    }catch(error){
        console.log("error while calling")
    }
}

export const getUsers = async () =>{
    try{
        let res = await axios.get(`${URL}/users`)
        return res.data
    }catch(error){
        console.log("error while calling get user api")
    }
}

export const setTalks = async (data) =>{
    try{
        return await axios.post(`${URL}/talk`,data)
    }catch(error){
        console.log("error while calling get user api",error)
    }
}

export const getCoversation = async (data) =>{
    try{
        let res = await axios.post(`${URL}/conversation/get`,data)
        return res.data
    }catch(error){
        console.log("error while calling get converstion API")
    }
}

export const newMessage = async (data) =>{
    try{
        let res = await axios.post(`${URL}/message/add`,data)
        return res.data
    }catch(error){
        console.log("error while calling get converstion API")
    }
}

export const getMessage = async (id) =>{
    try{
        let res = await axios.get(`${URL}/message/get/${id}`)
        return res.data
    }catch(error){
        console.log("error while calling get mssg API")
    }
}
export const imagefile = async (formData) =>{
    try{
        let res =await axios.post(`${URL}/uploadfile`,formData)
        console.log(res)
    }
    catch(error){
        console.log("error while uplaoding the image")
    }
}

export const grpDetail = async (data) =>{
    try{
       let res= await axios.post(`${URL}/makegrp`,data)
    }catch(error){
        console.log("error in making group in api");
    }
}
export const getgroups = async () =>{
    try{
       let res= await axios.get(`${URL}/getgrp`)
       return res.data
    }catch(error){
        console.log("error in fetching group in api");
    }
}


export const getGrpMessage = async (id) =>{
    try{
        let res = await axios.get(`${URL}/grpmessage/get/${id}`)
        return res.data
    }catch(error){
        console.log("error while calling get grp mssg API")
    }
}

export const newGrpMessage = async (data) =>{
    try{
        let res = await axios.post(`${URL}/grpmessage/add`,data)
        return res.data
    }catch(error){
        console.log("error while calling get converstion API")
    }
}