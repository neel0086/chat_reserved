import mongoose from "mongoose";


const GrpTalkSchema = mongoose.Schema({
    conversationId:{
        type:String,
        required:true
    },
    sender:{
        type:String,
        required:true
    },
    text: {
        type:String,
        required:false
    },
    photo: {
        type:String,
        required:false
    },
    name: {
        type:String,
        required:true
    }
},
{
    timestamps:true
}

)

const grptalk =  mongoose.model('grptalk',GrpTalkSchema)
export default grptalk