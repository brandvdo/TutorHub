/*

Author: Brandon

To be added later

*/

const express = require('express');
const {check, validationResult, body} = require('express-validator');
const jwtDecode = require('jwt-decode');
const verifyToken = require('./verifyToken');

require('dotenv').config();


const router = express.Router();
const UserChat = require('../models/UserPost');

const postValidate = [
    check('message')
        .isLength({min: 1})
        .withMessage('A post requires at least 1 characters'), ``
]

router.post('/newChat',postValidate,verifyToken, async (req, res) => {
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()});
    }

    const decodedToken = jwtDecode(req.header('auth-token'));

})


module.exports = router;