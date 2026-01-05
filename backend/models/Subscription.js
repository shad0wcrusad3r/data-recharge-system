const mongoose = require('mongoose');


const subscriptionSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  planName: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  dataLimit: {
    type: String,
    required: true
  },
  validity: {
    type: Number, 
    required: true
  },
  subscriptionDate: {
    type: Date,
    default: Date.now
  },
  subscriptionStatus: {
    type: String,
    enum: ['Active', 'Expired'],
    default: 'Active'
  }
});


const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription;
