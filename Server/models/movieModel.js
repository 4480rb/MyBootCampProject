const mongoose=require('mongoose')

let MovieSchema=new mongoose.Schema({
    name:{
        type: String,
        required:true,
    },
    yearPremiered:{
        type: String,
        
    },
    genres:[String],
    
    imageUrl:{
        type:String,
       
    }
});
const model=mongoose.model('movie',MovieSchema)
module.exports=model;


