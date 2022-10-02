/*

Author: Brandon

This is the main script for the backend of Tutor Hub

*/
require('dotenv').config();
const express = require('express');
const { default: mongoose } = require('mongoose');

const jwt = require("jsonwebtoken");

const authRoutes = require('./routes/users');
const postRoutes = require('./routes/post');
const verifyToken = require('./routes/verifyToken');

const app = express()

app.use(express.json());

//This will simply display a message when connecting to the api via a web broswer
app.get('/', (req,res) =>{
    let token = req.header('auth-token');
    return (jwt.decode(token, process.env.SECRET));
})

//Test case for verification system
//TODO: DELETED/EDIT
app.get('/api/users/profile', verifyToken, (req,res) =>{
    res.send("User Profile");
})

//Create a use case for the users database, allowing request and post to the user database
app.use('/api/users', authRoutes);
app.use('/api/userpost', postRoutes);


//Setting the port of the server
const port = process.env.PORT || 3000;
const dbPWD = process.env.dbPWD;

//Mongodb server connection
mongoose.connect(`mongodb+srv://brandvdo:${dbPWD}@cluster0.mxfqwac.mongodb.net/TutorHub?retryWrites=true&w=majority`)
    .then(result =>{
        app.listen(port, () => {
            console.log(`Server is running on ${port}`)
          })
    }).catch(err => console.log(err + dbPWD))

