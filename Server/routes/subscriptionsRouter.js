const express = require('express')
const router = express.Router()
const subscriptionsBL=require('../BL/subscriptionsBL')

router.get("/",async function (req, res) {
    try {
      const users = await subscriptionsBL.getAllsubscriptions()
       return res.status(200).json(users)
    }
    catch (err) {
      return  res.status(500).json({ msg: err })
    }
})
router.get("/:id", async function (req, res) {
    const id=req.params.id
    
    try {
      const subscriptions = await subscriptionsBL.getSubscriptionsByMovieId(id)
       return res.status(200).json(subscriptions)
    }
    catch (err) {
      return  res.status(500).json({ msg: err })
    }
})



router.post("/", async function (req, res) {
   const subscriptions = req.body
    try {
        const status = await subscriptionsBL.addsubscriptions(subscriptions)
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
    let status=await subscriptionsBL.updateSubscriptions(id,obj)
    res.status(200).json({ msg: status })}
    catch (err) {
        res.status(500).json({ msg: err })
    }
 })
router.delete("/:id",async function(req,res){
    const id=req.params.id
    try{
        const status = await subscriptionsBL.deleteSubscriptionsByMovieId(id)
        console.log(status)
    }
    catch (err) {
        res.status(500).json({ msg: err })
    }
})
module.exports = router