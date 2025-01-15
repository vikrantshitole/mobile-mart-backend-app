const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const requireAuth = require('../middlewares/requireAuth');
const User = mongoose.model('User');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { username, password,firstName,lastName } = req.body;
  console.log(username,"username");
  
  try {
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).send({message: 'User already exists. Please try to Login!'});

    }
    user = new User({ username, password,firstName, lastName });
    user = await user.save();

    const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
    res.send({ token, user });
  } catch (err) {
    console.log(err);
    
    return res.status(422).send(err.message);
  }
});

router.post('/signin', async (req, res) => {
  const { username, password } = req.body;
console.log(username,password);

  if (!username || !password) {
    return res.status(422).send({ error: 'Must provide username and password' });
  }

  const user = await User.findOne({ username });
  console.log(user);
  
  if (!user) {
    return res.status(422).send({ error: 'Invalid password or username' });
  }

  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY');
    res.send({ token,user });
  } catch (err) {
    return res.status(422).send({ error: 'Invalid password or username' });
  }
});
router.get('/me',requireAuth,(req,res)=>{
  res.send({user:req.user}).status(200

    
  )
})
module.exports = router;
