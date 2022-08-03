const express = require('express')
const router = express.Router()
const memberBL = require('../BL/memberBL')
const getMembers = async (req, res, next) => {
    const members = await memberBL.getAllMembers()
    if (members.length > 0) {
        console.log('Already have Users');
        next()
    }
    else {
        await memberBL.getDataToDB()
        next()
    }
}
router.get("/", getMembers ,async function (req, res) {
    try {
        const members = await memberBL.getAllMembers()
       return res.status(200).json(members)
    }
    catch (err) {
      return  res.status(500).json({ msg: err })
    }
})
router.get("/:id", async function (req, res) {
    const id=req.params.id
    try {
      const member = await memberBL.getMemberById(id)
       return res.status(200).json(member)
    }
    catch (err) {
      return  res.status(500).json({ msg: err })
    }
})

router.post("/", async function (req, res) {
    const member = req.body
     try {
         const status = await memberBL.addMember(member)
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
    let status=await memberBL.updateMember(id,obj)
    res.status(200).json({ msg: status })}
    catch (err) {
        res.status(500).json({ msg: err })
    }
 })

 
 router.delete("/:id",async function(req,res){
     const id=req.params.id
     try{
         const status = await memberBL.deleteMemberById(id)
         console.log(status)
     }
     catch (err) {
         res.status(500).json({ msg: err })
     }
 })

module.exports = router