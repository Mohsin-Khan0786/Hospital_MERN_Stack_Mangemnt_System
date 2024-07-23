import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
    firstName:{
        type:String,
    require:true,
    minLength:[3,"first Name contain must atleast 3 character"]
},
    lastName:{
        type:String,
    require:true,
    minLength:[3,"Last Name contain must atleast 3 character"]
},
    email:{
        type:String,
        require:true,
        unique:true,
        validate:[validator.isEmail,"Please enter a valid email"]
    },
    phone:{
        type:String,
        require:true,
        minLength:[11,"Phone number must contain atleast 11 digits"],
        maxLength:[11,"Phone number must contain at most 11 digits"],
        
    },
    message:{
        type:String,
        require:true,
        minLength:[10,"Message must contain atleast 10 character"]
    }


})
export const Message=mongoose.model("Message",messageSchema)

