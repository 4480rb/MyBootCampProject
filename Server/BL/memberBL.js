const memberModel = require('../models/memberModel')
const axios = require('axios')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
async function getDataToDB() {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/users')
    console.log(data);
    data.forEach(member => {
        return new Promise((resolve, reject) => {
            let memberToDB = new memberModel({
                name: member.name,
                email: member.email,
                city: member.address.city

            });

            memberToDB.save(err => {
                if (err) {
                    reject(err)
                }
                else {
                    resolve('sucsess created')
                }
            });

        })
    });
}
const getAllMembers = async () => {
    try {
        let members = await memberModel.find({})
        return members;
    }
    catch (err) {
        return err
    }
}

const getMemberById = async (id) => {
    try {
        let member = await memberModel.findOne({ _id: id })
        return member;

    }
    catch (err) {
        console.log(err);
    }
}

const addMember = (member) => {
    return new Promise((resolve, reject) => {
        let memberToDb = new memberModel(member)
        memberToDb.save((err) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(`Member created with id ${memberToDb.id}`)
            }
        })
    })

}
const updateMember = (id, obj) => {
    return new Promise((resolve, reject) => {
        memberModel.findByIdAndUpdate({ _id: ObjectId(id) }, obj, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(`${data.Name} updated!!😃`)
            }
        })
    })
};
const deleteMemberById = async (id) => {
    try {
        await memberModel.findByIdAndDelete(id)
        console.log("memberDeleted");
    }
    catch (err) {
        console.log(err);
    }
}
module.exports = { getDataToDB, getAllMembers, getMemberById, addMember, updateMember, deleteMemberById }
