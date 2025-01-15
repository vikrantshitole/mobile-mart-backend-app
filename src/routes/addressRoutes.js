const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');

const address = mongoose.model('Address');

const router = express.Router();

router.use(requireAuth);

router.post('/create', async (req, res) => {  
    const {address_line_1,address_line_2,city,pincode,state,first_name,last_name,contact_number} = req.body
    const {_id: user_id} = req.user
    if (!user_id) {
        res.status(400).send({message: "User Id is not present"})
    }  
    if (!address_line_1) {
        res.status(400).send({message: "Address Line 1 is not present"})
    }  
    if (!address_line_2) {
        res.status(400).send({message: "Address Line 2 is not present"})
    }  
    if (!city) {
        res.status(400).send({message: "City is not present"})
    }  
    if (!pincode) {
        res.status(400).send({message: "Pincode is not present"})
    }  
    if (!state) {
        res.status(400).send({message: "State is not present"})
    }  
    if (!first_name) {
        res.status(400).send({message: "First Name is not present"})
    }  
    if (!last_name) {
        res.status(400).send({message: "Last Name is not present"})
    } 
    if (!contact_number) {
        res.status(400).send({message: "Contact Number is not present"})
    }  
    
    try {
        const addressCreated = await new address({user_id,address_line_1,address_line_2,city,pincode,state,first_name,last_name,contact_number}).save()
        res.send({address: addressCreated}).status(200)
    } catch (error) {
        console.log(error);
        res.send({message: 'Something went wrong. Please try again later!'}).status(400)
        
    }

    
});

router.patch('/update/:id', async (req, res) => {  
    const {address_line_1,address_line_2,city,pincode,state,first_name,last_name,contact_number} = req.body
    const {id} = req.params;
    
    if (!user_id) {
        res.status(400).send({message: "User Id is not present"})
    } 
    if (!address_line_1) {
        res.status(400).send({message: "Address Line 1 is not present"})
    }  
    if (!address_line_2) {
        res.status(400).send({message: "Address Line 2 is not present"})
    }  
    if (!city) {
        res.status(400).send({message: "City is not present"})
    }  
    if (!pincode) {
        res.status(400).send({message: "Pincode is not present"})
    }  
    if (!state) {
        res.status(400).send({message: "State is not present"})
    }  
    if (!first_name) {
        res.status(400).send({message: "First Name is not present"})
    }  
    if (!last_name) {
        res.status(400).send({message: "Last Name is not present"})
    } 
    if (!contact_number) {
        res.status(400).send({message: "Contact Number is not present"})
    }  
    
    try {
        const addressCreated = await address.updateOne({user_id,_id:id},{address_line_1,address_line_2,city,pincode,state,first_name,last_name,contact_number})
        res.send({address: addressCreated}).status(200)
    } catch (error) {
        console.log(error);
        res.send({message: 'Something went wrong. Please try again later!'}).status(400)
        
    }

    
});

router.get('/', async(req,res,next) => {
    try {
        const {_id} = req.user;
        const addresses = await address.find({user_id: _id});
        res.send({list: addresses}).status(200)
    } catch (error) {
        console.log(error);
        res.send({message: "Something went wrong. Please try again!"}).status(400)
        
    }
})
module.exports = router;
