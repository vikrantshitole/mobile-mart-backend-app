const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');

const favorite = mongoose.model('Favorite_Product');

const router = express.Router();

router.use(requireAuth);

router.post('/favorite', async (req, res) => {  
    const {user_id,product_id} = req.body
    console.log(user_id,product_id);
    
    if (!user_id) {
        res.status(400).send({message: "User Id is not present"})
    }  
    
    if (!product_id) {
        res.status(400).send({message: "Product Id is not present"})
    }  
  const favoriteProduct = await favorite.findOne({user_id,product_id});
  // console.log(favoriteProduct,"favorite_products");
  
  if (favoriteProduct) {
   await favorite.updateOne({user_id,product_id},{is_favorite: !favoriteProduct.is_favorite})
  } else {
    await new favorite({user_id,product_id,is_favorite: true}).save()
  }
  res.send(favoriteProduct);
});

module.exports = router;
