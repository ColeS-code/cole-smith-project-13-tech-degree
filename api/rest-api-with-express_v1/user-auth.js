
'use strict';

const useAuth = require('basic-auth');
const bcrypt = require('bcrypt');
const models = require('./models');
const { Users } = models;

exports.authenticateUser = async (req, res, next) => {
    let message;

    // parse the user's credentials
    const credentials = useAuth(req);

    if (credentials) {
        // checks to see if a username matches and retrieves it
        const user = await Users.findOne({ where: {emailAddress: credentials.name }});
        
        if (user) {
            // compares the given password with the known password
            const authenticated = bcrypt
                .compareSync(credentials.pass, user.password);
                if(authenticated) {
                    console.log('Login Successful!');

                    // stores the user
                    req.currentUser = user;
                } else {
                    message = "Incorrect password";
                }
        } else {
            message = "Account not found";
        }
    } else {
        message = "No method of authentication found"
    }

    if(message) {
        console.warn(message);
        res.status(401).json({ message: 'Access Denied' });
    } else {
        next();
    }
}