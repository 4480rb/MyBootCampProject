const express = require('express')
const router = express.Router()
const movieBl=require('../BL/movieBL')

const getMovies = async (req, res, next) => {
    const movies = await movieBl.getAllMovies()
    if (movies.length > 0) {
        console.log('Already have movies');
        next()
    }
    else {
    try{
     const movies= await movieBl.getAllMoviesFromJson()
     const status=await movieBl.addMovies(movies)
     return res.status(200).json(status)
     next()
    }
    catch (err) {
        return  res.status(500).json({ msg: err })
      }
     
        
    }
}
router.get("/",async function (req, res) {
    try {
      const users = await movieBl.getAllMovies()
       return res.status(200).json(users)
    }
    catch (err) {
      return  res.status(500).json({ msg: err })
    }
})
router.get("/:id", async function (req, res) {
    const id=req.params.id
    
    try {
      const movie = await movieBl.getMovieById(id)
       return res.status(200).json(movie)
    }
    catch (err) {
      return  res.status(500).json({ msg: err })
    }
})




router.post("/", async function (req, res) {
   const movie = req.body
    try {
        const status = await movieBl.addMovie(movie)
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
    let status=await movieBl.updateMovie(id,obj)
    res.status(200).json({ msg: status })}
    catch (err) {
        res.status(500).json({ msg: err })
    }
 })

router.delete("/:id",async function(req,res){
    const id=req.params.id
    try{
        const status = await movieBl.deleteMovieById(id)
        console.log(status)
    }
    catch (err) {
        res.status(500).json({ msg: err })
    }
})
module.exports = router