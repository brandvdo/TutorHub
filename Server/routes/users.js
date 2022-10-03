/*

Author: Brandon

*/

const express = require('express');
const {check, validationResult, body} = require('express-validator');
const bcrpyt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verifyToken = require('./verifyToken');

//Email dependencies
var sesTransport = require('nodemailer-ses-transport');
const nodemailer = require('nodemailer');
const jwtDecode = require('jwt-decode');

require('dotenv').config();

/*
Email verification system
Using Amazon IAM server, only emails that are on the verified list will be sent
while in sandbox mode, must request production mode later
*/


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
        .withMessage('Password must be at least eight characters'),
    check('profileType')
        .exists()
        .withMessage('profileType required')
]
const loginValidate = [
    check('email')
        .isEmail()
        .withMessage('Please provide a valid email'),
    check('password')
        .isLength({min: 8})
        .withMessage('Password must be at least eight characters'),
]

//Register route to create a new user

// /api/users/register
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

    let tutorSubjects = [];
    if(req.body.tutorSubjects != null) tutorSubjects = req.body.tutorSubjects;
    let studySubjects = [];
    if(req.body.studySubjects != null) studySubjects = req.body.studySubjects;

    //Using the schema from server/models/User.js create new user data and attempt to save it to the database
    const user = new User({
        fullName: req.body.fullName,
        password: hashPassword,
        email: req.body.email,
        balance: 0,
        validated: false,
        profileURL: "",
        school: req.body.school,
        tutorSubjects: tutorSubjects,
        studySubjects: studySubjects,
        profileType: req.body.profileType
    })

    //Email verification
    //TODO add html msg
    //NOTE: Currently only works with verified IAM emails, to add email to list msg me

    var mailOptions = {
        from: "tutorhubverify@gmail.com",
        to: req.body.email,
        text: 'This is some text',
        subject: "Tutor Hub Verification Email",
        html: `<button type="button" href="http://70.177.34.147/verify/">Verify Here</button>`,
    };
    let transporter = nodemailer.createTransport(sesTransport({
        accessKeyId: process.env.smtpUser,
        secretAccessKey: process.env.smtpPWD,
        region: "us-east-1"
    }));
    var responseFromEmail;
    transporter.sendMail(mailOptions, (error, info) =>{
        if(error){
            console.log(error);
            responseFromEmail = error;
        }else{
            console.log('Message sent: ' + info.response);
            responseFromEmail = info.response;
        }
    })

    try{
        const savedUser = await user.save();
        res.send({id: savedUser._id, fullName: savedUser.fullName, email: savedUser.email, emailResponse: responseFromEmail});

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

    if(!user) return res.status(404).send('Invalid email or password');
    if(!validPassword) return res.status(404).send('Invalid email or password');

    //Create a login token for user and add it to to the header
    //This token is valid for 30 minutes
    const secret = process.env.SECRET;
    const token = jwt.sign({_id: user.id, email: user.email}, secret, {expiresIn: '30m'});
    res.header('auth-token', token).send({message: 'Logged in successfully', token});

})


router.get('/getUserInfo/:id', (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()});
    }
    if(req.params.id.length < 24) return res.status(400).send('Invalid ID');
    User.findById(req.params.id)
        .then(user => {
            res.send({fullName: user.fullName, profileType: user.profileType});
        })
        .catch(err => console.group(err))

})

router.put('/addFriend/:id',verifyToken, (req,res) => {
    if(req.params.id.length < 24) return res.status(400).send('Invalid ID');
    const decodedToken = jwtDecode(req.header('auth-token'));
    try{
        User.findById(decodedToken._id)
        .then(user => {
            if(user.friendsList.includes(req.params.id)){
                res.status(400).send("Users are already friends");
            }else{
                user.friendsList.push(req.params.id);
                res.send({friendID: req.params.id});
                return user.save();
            }
        })
    }catch(error){
        res.status(400).send(error);
    }

})

//TODO
/*

    Create resend email verification
    Create successful verification route

*/

module.exports = router;