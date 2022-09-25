/*

Author: Brandon

This is the router for the user database
It handels all request and post

*/
const express = require('express');
const {check, validationResult} = require('express-validator');

//Inport the user schema
const User = require('../models/User');

const router = express.Router();


/*
    /api/users/createUser

    This will be used to create a new user in the database
    TODO: Add validation system to ensure nobody can just create a random user
*/
router.post('/createUser',[
    check('email').isEmail()
], (req, res) =>{

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).send({errors: errors.array()})
    }
    
    const user = new User({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        ID: req.body.ID,
        balance: 1,
        validated: false,
        profileURL: "",
        profileType: req.body.profileType
    });

    user.save()
        .then(result => {
            res.send({
                message: 'User date created successfully',
                data: result
            })
        })
        .catch(err => console.log(err))
})

/*

    /api/users/id

    This is the get request for user information by ID

*/
router.get('/:id', (req, res) => {
    const userID = req.params.id;

    User.findById(userID)
        .then(user => {
            res.send(user)
        })
        .catch(err => console.log(err))
});

/*

    /api/users/id

    This is the put request to change user information
    TODO: Add validation for user information to remove invalid entries

*/
router.put('/:id', (req, res) => {
    const userID = req.params.id;

    User.findById(userID)
        .then(user => {
            //Add edit function and validation
        })
        .then(result => {
            res.send(result)
        })
        .catch(err => console.log(err))
});

module.exports = router;
