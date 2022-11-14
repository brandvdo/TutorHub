/*

Author: Brandon

This will hold all routes needed for the home page

*/

const express = require('express');
const verifyToken = require('./verifyToken');

const router = express.Router();
const User = require('../models/User');
const jwtDecode = require('jwt-decode');
const UserPost = require('../models/UserPost');

//Gives array of user's friends messages
//TODO add other messages from tutors near by
router.get('/newsFeed/messages/:id', async (req,res) =>{
    if(req.params.id.length < 24) return res.status(400).send('Invalid ID');
    let friendsPost = [];
    let friendsList = [];
    let user;

    user = await User.findById(req.params.id);
    friendsList = user.friendsList;
    friendsList.push(req.params.id);
    for(let i =0; i<friendsList.length;i++){
        friendsPost.push(await UserPost.find({userID: friendsList[i]}));
    }
    res.send(friendsPost);
})

module.exports = router;