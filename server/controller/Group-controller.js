import group from "../model/GrpSchema.js";
import grptalk from "../model/GrpTalkSchema.js";


export const grpDetail = async (req,res)=>{
    new group(req.body).save()
    
}

export const getgroups = async (req,res) =>{
    try{
    let grps = await group.find({})
    res.status(200).json(grps)
    }
    catch(error){
        console.log('error in fetching group in api')
    }
}

export const getGrpMessage = async (req,res) =>{
    try{    
        let mssg = await grptalk.find({conversationId:req.params.id})
        res.status(200).json(mssg)
    }catch(error){
        res.status(500).json(error)
    }
}

export const newGrpMessage = async (req,res) =>{
    try{    
        console.log(req.body,9)
        const newMssg = new grptalk(req.body)
        await newMssg.save()
        res.status(200).json('Mssg saved success')
    }catch(error){
        res.status(500).json(error)
    }
}