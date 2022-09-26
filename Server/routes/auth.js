/*

Author: Brandon

*/

const express = require('express');
const {check, validationResult, body} = require('express-validator');
const bcrpyt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();
const User = require('../models/User');

// Validation checks for registration and login
const registerValidate = [
    check('fullName')
        .isLength({min: 2})
        .withMessage('Your full name is required'),
    check('email')
        .isEmail()
        .withMessage('Please provide a valid email'),
    check('password')
        .isLength({min: 8})
        .withMessage('Password must be at least eight characters')
]
const loginValidate = [
    check('email')
        .isEmail()
        .withMessage('Please provide a valid email'),
    check('password')
        .isLength({min: 8})
        .withMessage('Password must be at least eight characters')
]

//Register route to create a new user
router.post('/register',registerValidate, async (req, res) => {

    //Check validation results
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()});
    }

    //Check if user exist
    const userExist = await User.findOne({email: req.body.email})
    if(userExist) return res.status(400).send('An account is already registered with this email: ' + req.body.email);

    //Hash password
    const salt = await bcrpyt.genSalt();
    const hashPassword = await bcrpyt.hash(req.body.password, salt);

    //Using the schema from server/models/User.js create new user data and attempt to save it to the database
    const user = new User({
        fullName: req.body.fullName,
        password: hashPassword,
        email: req.body.email,
        balance: 1,
        validated: false,
        profileURL: "",
        profileType: req.body.profileType
    })

    try{
        const savedUser = await user.save();
        res.send({id: savedUser._id, fullName: savedUser.fullName, email: savedUser.email});
    }catch (error){
        res.status(400).send(error);
    }

})

//Login route
router.post('/login',loginValidate, async (req, res) => {
    
    //Check login validation
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()});
    }

    //See if user exist
    const user = await User.findOne({email: req.body.email});
    const validPassword = await bcrpyt.compare(req.body.password, user.password)

    if(!user) return res.status(404).send('Invalid email or password1');
    if(!validPassword) return res.status(404).send('Invalid email or password2');

    //Create a login token for user and add it to to the header
    //TODO create date in token for time validation, I.E 1 hour, token will be invalid in 1 hour.
    const secret = process.env.secret;
    const token = jwt.sign({_id: user.id, email: user.email}, secret)
    res.header('auth-token', token).send({message: 'Logged in successfully', token});

})

module.exports = router;