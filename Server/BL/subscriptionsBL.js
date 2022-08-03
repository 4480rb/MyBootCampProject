const subscriptionsModel = require('../models/subscriptionsModel')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
const getAllsubscriptions = async () => {
    try {
        let subscriptionses = await subscriptionsModel.find({})
        return subscriptionses;
    }
    catch (err) {
        return err
    }
}
const getSubscriptionsByMovieId = (movieID) => {
    return new Promise((resolve, reject) => {
       subscriptionsModel.find({ movieID:ObjectId(movieID)}, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
};
const addsubscriptions = (subscriptions) => {
    return new Promise((resolve, reject) => {
        let subscriptionsModelToDb = new subscriptionsModel(subscriptions)
        subscriptionsModelToDb.save((err) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(`subscriptions created with id ${subscriptionsModelToDb.id}`)
            }
        })
    })

}
const updateSubscriptions = (id, obj) => {
    return new Promise((resolve, reject) => {
        movieModel.findByIdAndUpdate({ _id: ObjectId(id) }, obj, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(`${data.Name} updated!!😃`)
            }
        })
    })
};

const deleteSubscriptions = (movieID) => {
    return new Promise((resolve, reject) => {

        subscriptionsModel.deleteMany({ "movieID": movieID}, (err) => {
              if (err) {
                reject(err)
            } else {
                resolve("Subscription deleted👌")

            }

        })


    })
}

   
module.exports = { getAllsubscriptions, getSubscriptionsByMovieId, addsubscriptions, updateSubscriptions, deleteSubscriptions }
