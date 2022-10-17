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
router.get('/newsFeed/messages',verifyToken, async (req,res) =>{
    let decodedToken = jwtDecode(req.header('auth-token'));
    let friendsPost = [];
    let friendsList = [];
    let user;

    user = await User.findById(decodedToken._id);
    friendsList = user.friendsList;
    for(let i =0; i<friendsList.length;i++){
        friendsPost.push(await UserPost.find({userID: friendsList[i]}));
    }
    res.send(friendsPost);
})

module.exports = router;