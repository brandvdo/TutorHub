/*

Author: Brandon

user post route

*/

const express = require('express');
const {check, validationResult, body} = require('express-validator');
const jwtDecode = require('jwt-decode');
const verifyToken = require('./verifyToken');

require('dotenv').config();


const router = express.Router();
const UserPost = require('../models/UserPost');

const postValidate = [
    check('message')
        .isLength({min: 15})
        .withMessage('A post requires at least 30 characters'),
    check('tags')
        .isArray({min: 1})
        .withMessage('At least one tag is required for a post'),
]

//Allows user's to create a new post
//      /api/userpost/newPost
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
        userName: decodedToken.fullName,
        message: req.body.message,
        tags: req.body.tags
    })

    try{
        const savedPost = await newPost.save();
        res.send({postID: savedPost._id, userID: savedPost.userID, message: savedPost.message, tags: savedPost.tags, price: savedPost.price});
    }catch (error){
        res.status(400).send(error);
    }

})


//Get a message by its message ID
// /api/userpost/getMessage/:id
router.get('/getMessage/:id', verifyToken, (req, res) =>{
    if(req.params.id.length < 24) return res.status(400).send('Invalid ID');
    UserPost.findById(req.params.id)
    .then(post => {
        res.send(post);
    })
    .catch(err => res.status(400).send('ID not found'));
})

router.get('/getMessages/:id', verifyToken, (req, res) =>{
    if(req.params.id.length < 24) return res.status(400).send('Invalid ID');
    UserPost.find({userID: req.params.id})
    .then(post => {
        res.send(post);
    })
    .catch(err => res.status(400).send('ID not found'));
})

module.exports = router;