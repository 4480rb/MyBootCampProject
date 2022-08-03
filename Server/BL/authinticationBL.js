const userModel = require('../models/userModel')


const logIn =  (user) => {
    return new Promise((resolve, reject) => {
       
    userModel.findOne({ "userName": user.userName }, { "password": user.password},(err,data)=>{
        console.log(data);
            if (err) {
                reject(err)
            } 
             else if (data==null) {
                resolve(`No such this user`)
               
            }
            else{
                resolve("User exsist")
            }
        })
    })
}
module.exports = { logIn}