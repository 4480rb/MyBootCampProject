const mongoose=require('mongoose')

let UserSchema=new mongoose.Schema({
    fullName:{
        type: String,
        required:true,
    },
    userName:{
        type: String,
        required:true,
    },
    password:{
        type: String,
        required:true,
    }
});
const model=mongoose.model('user',UserSchema)
module.exports=model;


