/*

Author: Brandon

This is the main script for the backend of Tutor Hub

*/

const express = require('express');
const { default: mongoose } = require('mongoose');

const users = require('./routes/users');

const app = express()

app.use(express.json());

//This will simply display a message when connecting to the api via a web broswer
app.get('/', (req,res) =>{
    res.send('Welcome to the User API');
})

//Create a use case for the users database, allowing request and post to the user database
app.use('/api/users', users);

require('dotenv').config();

//Setting the port of the server
const port = process.env.PORT || 3000;

//Mongodb server connection
mongoose.connect('mongodb+srv://brandvdo:testpassword@cluster0.mxfqwac.mongodb.net/TutorHub?retryWrites=true&w=majority')
    .then(result =>{
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
          })
    }).catch(err => console.log(err))

