const mongoose=require('mongoose')

mongoose.connect('mongodb://localhost:27017/moviesManagementDB',()=>{
    console.log("conect to db")
})