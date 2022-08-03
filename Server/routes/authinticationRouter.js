
const express = require('express')
const router = express.Router()
const authinticationBL=require('../BL/authinticationBL')

router.post("/", async function (req, res) {
    const user = req.body
    const status = await authinticationBL.logIn(user)
     res.json(status)
    
 
 })
 module.exports = router