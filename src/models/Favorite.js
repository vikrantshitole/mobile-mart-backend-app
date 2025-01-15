const mongoose = require('mongoose');

const favoriteProducts = new mongoose.Schema({
  user_id:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  product_id:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Product'
  },
  is_favorite: {
    type: Boolean,
    required: true,
  }
});

mongoose.model('Favorite_Product', favoriteProducts);
