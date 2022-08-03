const userModel = require('../models/userModel')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
const getAllUsers = async () => {
    try {
        let data = await userModel.find({})
        return data;
    }
    catch (err) {
        console.log(err);
    }
}
// const getUserByNameAndPassword = async (name, password) => {
//     try {
//         let user = await userModel.findOne({ uaerName: name}, {password: password })
//         return user;

//     }
//     catch (err) {
//         console.log(err);
//     }
// }
const addUser = (user) => {
    return new Promise((resolve, reject) => {
        let userToDb = new userModel(user)
         userToDb.save( (err)=> {
            if (err) {
                reject(err)
            }
            else {
                resolve(`User created with id ${userToDb.id}`)
            }
        })
    })

}
const updateUser=(id,obj)=>{
    return new Promise((resolve, reject) => {
        userModel.findByIdAndUpdate({_id:ObjectId(id)},obj,(err,data)=>{
            if (err) {
                reject(err)
            } else {
                resolve(`${data.Name} updated!!😃`)
            }
        })
    })
};

const deleteUserById = async (id)=>{
    try{
        await userModel.findByIdAndDelete(id)
        console.log("userDeleted");
    }
    catch (err) {
        console.log(err);
    }
}
module.exports = { getAllUsers, addUser, updateUser,deleteUserById }
