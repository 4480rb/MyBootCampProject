const express = require('express')
const router = express.Router()
const userBL=require('../BL/userBL')

router.get("/", async function (req, res) {
    try {
      const users = await userBL.getAllUsers()
       return res.status(200).json(users)
    }
    catch (err) {
      return  res.status(500).json({ msg: err })
    }
})
// router.get("/:userName/:password", async function (req, res) {
//     const userName=req.params.userName
//     const password=req.params.password
//     try {
//       const user = await userBL.getUserNameAndPassword(userName,password)
//        return res.status(200).json(user)
//     }
//     catch (err) {
//       return  res.status(500).json({ msg: err })
//     }
// })


router.post("/", async function (req, res) {
   const user = req.body
    try {
        const status = await userBL.addUser(user)
        console.log(status)
        res.status(200).json({ msg: status })
    } catch (err) {
        res.status(500).json({ msg: err })
    }

})
router.put('/:id',async function(req,res){
    let id=req.params.id
    let obj=req.body
    try{
    let status=await userBL.updateUser(id,obj)
    res.status(200).json({ msg: status })}
    catch (err) {
        res.status(500).json({ msg: err })
    }
 })

router.delete("/:id",async function(req,res){
    const id=req.params.id
    try{
        const status = await userBL.deleteUserById(id)
        console.log(status)
    }
    catch (err) {
        res.status(500).json({ msg: err })
    }
})
module.exports = router