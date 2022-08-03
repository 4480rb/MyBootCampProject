const mongoose=require('mongoose')

let MemberSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        
    },
    email:{
        type:String,
        required:true,
        
    },
    city:{
        type:String,
      
    }
});

const model=mongoose.model('member',MemberSchema)
module.exports=model;


