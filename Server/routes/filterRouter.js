
const express = require('express')
const router = express.Router()
const moviesBL = require('../BL/movieBL')
const subscriptionBL = require('../BL/subscriptionsBL')


router.get('/:memberID', async function (req, res) {
    try {
        const memberID = req.params.memberID
        const subscription = await subscriptionBL.getSubscriptionsByMemberId(memberID)
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
})
module.exports = router