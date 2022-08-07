const express = require('express')
const router = express.Router()
const subscriptionsBL = require('../BL/subscriptionsBL')
const moviesBL = require('../BL/movieBL')

router.get("/", async function (req, res) {
  try {
    const users = await subscriptionsBL.getAllsubscriptions()
    return res.status(200).json(users)
  }
  catch (err) {
    return res.status(500).json({ msg: err })
  }
})
router.get("/:type/:id", async function (req, res) {
  const type = req.params.type
  if (type == "x") {
    try {
      const memberID = req.params.id
      const subscription = await subscriptionsBL.getSubscriptionsByMemberId(memberID)
      try {
        const Movies = []
        const allMovies = await moviesBL.getAllMovies()
        let isWatched = false
        for (let i = 0; i < allMovies.length; i++) {
          isWatched = false
          for (let j = 0; j < subscription.length; j++) {
            if (allMovies[i]._id == subscription[j].movieID) {
              isWatched = true
            }
          }
          if (isWatched == false) {
            Movies.push(allMovies[i])
          }
        }
        res.status(200).json(Movies)
      }
      catch (err) {
        console.log(err)
        res.status(500).json({ msj: err })
      }
    }
    catch (err) {
      res.status(500).json({ msj: err })
    }
  }
  else {
    const id = req.params.id

    try {
      const subscriptions = await subscriptionsBL.getSubscriptionsByMovieId(id)
      return res.status(200).json(subscriptions)
    }
    catch (err) {
      return res.status(500).json({ msg: err })
    }
  }
})


router.post("/", async function (req, res) {
  const subscriptions = req.body
  try {
    const status = await subscriptionsBL.addsubscriptions(subscriptions)
    res.status(200).json({ msg: status })
  } catch (err) {
    res.status(500).json({ msg: err })
  }

})
router.put('/:id', async function (req, res) {
  let id = req.params.id
  let obj = req.body
  try {
    let status = await subscriptionsBL.updateSubscriptions(id, obj)
    res.status(200).json({ msg: status })
  }
  catch (err) {
    res.status(500).json({ msg: err })
  }
})

module.exports = router