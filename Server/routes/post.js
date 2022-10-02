const express = require('express');
const {check, validationResult, body} = require('express-validator');
const jwtDecode = require('jwt-decode');
const verifyToken = require('./verifyToken');

require('dotenv').config();

/*

Email verification system

NOTE: Not working as google prevents users from signing in on 3rd party software, find new email SMTP Server or create one

*/


const router = express.Router();
const UserPost = require('../models/UserPost');

const postValidate = [
    check('message')
        .isLength({min: 30})
        .withMessage('A post requires at least 30 characters'),
    check('tags')
        .isArray({min: 1})
        .withMessage('At least one tag is required for a post'),
]

router.post('/newPost',postValidate,verifyToken, async (req, res) => {
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()});
    }

    const decodedToken = jwtDecode(req.header('auth-token'));

    let price = 0;
    if(!req.body.price == null)
        price = req.body.price;
    

    const newPost = new UserPost({
        userID: decodedToken._id,
        message: req.body.message,
        tags: req.body.tags,
        price: price,
    })

    try{
        const savedPost = await newPost.save();
        res.send({postID: savedPost._id, userID: savedPost.userID, message: savedPost.message, tags: savedPost.tags, price: savedPost.price});
    }catch (error){
        res.status(400).send(error);
    }

})

module.exports = router;