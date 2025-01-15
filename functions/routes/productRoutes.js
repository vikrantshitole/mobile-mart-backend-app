const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');

const Products = mongoose.model('Product');

const router = express.Router();

// router.use(requireAuth);

router.get('/products', async (req, res) => {
    console.log("products");
    
  const product = await Products.aggregate([
    {
      $lookup: {
        from: "favorite_products",
        let: { productId: "$_id" },
        pipeline: [
          { $match: { $expr: { $and: [{ $eq: ["$product_id", "$$productId"] }, { $eq: ["$user_id", mongoose.Types.ObjectId('677648bd9a8742b0d63aae91')] }] } } }
        ],
        as: "fav_product"
      }
    },
    {
      $unwind: {
        path: "$fav_product",
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $addFields: {
        is_favorite: "$fav_product.is_favorite"
      }
    },
    {
      $project: {
        fav_product: 0 // Optionally remove the fav_product field if it's no longer needed
      }
    }
  ]);
  
  res.send(product);
});

module.exports = router;
