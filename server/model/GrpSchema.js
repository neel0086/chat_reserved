import mongoose from "mongoose";


const grpSchema = mongoose.Schema({
    admin:{
        type:String,
        required:true
    },
    grpName:{
        type:String,
        required:true
    }
},
    {
        timestamps:true
    }

)

const group =  mongoose.model('group',grpSchema)
export default group