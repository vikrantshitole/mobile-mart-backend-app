const mongoose = require('mongoose');

const address = new mongoose.Schema({
  user_id:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  address_line_1: {
    type: String,
    required: true
  },
  address_line_2: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  pincode: {
    type: Number,
    required: true,
  },
  state: {
    type: String,
    required: true
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  contact_number: {
    type: Number,
    required: true
  }
});

mongoose.model('Address', address);
