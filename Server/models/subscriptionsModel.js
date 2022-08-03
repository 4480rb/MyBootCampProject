const mongoose = require('mongoose')

const SubscriptionsSchema = new mongoose.Schema({

    movieID:  {
      type:String
      //ref: 'movie'
    },
      
      
    memberID: {
      type:String
      // type: mongoose.Schema.Types.ObjectId,
      // ref: 'member'
    },
    date:String
});

const model = mongoose.model('subscriptions', SubscriptionsSchema)
module.exports = model;
