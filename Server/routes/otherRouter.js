const express = require('express')
const router = express.Router()
const movieBl=require('../BL/movieBL')

router.get("/:name", async function (req, res) {
    const name=req.params.name
    
    try {
      const movie = await movieBl.getMovieByName(name)
       return res.status(200).json(movie)
    }
    catch (err) {
      return  res.status(500).json({ msg: err })
    }
})

module.exports = router