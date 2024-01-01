const express = require('express')
const router = express.Router()
const User = require('../models/user')
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const jwtSecret = "MynameisLaghviAggarwal$#"

router.post('/users', [
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    body('name').isLength({ min: 3 })
], async (req, res) => {
    let success = false
    console.log(req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array())
        return res.status(400).json({ success, errors: errors.array() })
    }
    try {
        const { name, password, email, location } = req.body;
        await User.create({ 
            name, password, email, location 
        });
        res.status(201).json({ message: "User created successfully" });
    }    
    catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error"});
    }
})


router.post('/loginuser', [ 
    body('email').isEmail(),
    body('password').isLength({ min: 5 })
], async (req, res) => {
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array())
        return res.status(400).json({ success, errors: errors.array() })
    }
    let email = req.body.email;
    try {
        let userData = await User.findOne({ email });
        if(!userData){
            return res.status(400).json({ errors: "Try logging in with correct credentials"})
        }
        if(req.body.password !== userData.password){
            return res.status(400).json({ errors: "Try logging in with correct credentials"})
        }
        
        const data = {
            user:{
                id: userData.id
            }
        }

        const authToken = jwt.sign(data, jwtSecret);

        // Now, include the authToken in the response
        return res.json({ success: true, authToken: authToken, message: "User logged in successfully" });
    }    
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error"});
    }
})

module.exports = router;