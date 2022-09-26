/*

Author: Brandon

*/

const jwt = require("jsonwebtoken");

/*

Check if user token exist and is valid before going to any route.
Import this file and use it before any protected route

TODO: Add time verification

*/
module.exports = function(req, res, next){
    const token = req.header('auth-token')
    if(!token) return res.status(401).send('Access Denied');

    //Verify the token
    try{
        const secret = process.env.SECRET;
        const verified = jwt.verify(token, secret)
        req.user = verified;
        next();
    }catch(error){
        res.status(400).send('Invalid token');
    }

}