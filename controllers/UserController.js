require('dotenv').config();
const bcrypt = require("bcryptjs");
const UserModel = require('../models/UserModel');
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");


// Function to handle user sign up
const signUp = async (req, res) => {
    // validating request data
    const error = validationResult(req)
    if (!error.isEmpty()) {
        console.log(error);
        return res.json({message:error.array()[0].msg})
    }
     // getting data from request body
    const {username, email, password} = req.body;
    try {  
        // check if user email already exists 
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "Email already exists"})
    }
    const existingUsername = await UserModel.findOne({ username});
    if (existingUsername){
         // check if username already exists
        return res.status(400).json({message: "Username already exists" })
    }
    // hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // creating new user
    const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
    });
    // save the new user to the database
    await newUser
    .save()
    .then((savedUser) =>{
        res.status(201).json({ 
            message: "User created successfully", 
            user:savedUser
        });
    });
    
    } catch (error) {
        res.status(500).json({message: "Error creating user", error: error.message});
    }
};

const signIn = async (req, res) => {
    // validate request data
    const error = validationResult(req);
    if (!error.isEmpty()) {
        console.log(error);
        return res.json({message:error.array()[0].msg})
    }
    // getting data from request body
    const { email, password } = req.body;

    try {
        // check if user email exists
        const existingUser = await UserModel.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: "Invalid crredentials" });
        }

        // compare password with hashed password
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(400).json9({ message: "Invalid credentials" });
        }

        // create jwt token
        const token = jwt.sign({ id: existingUser._id}, process.env.JWT_SECRET_KEY, {
            expiresIn: "1h",
        });

        // return success response with token
        res.status(200).json({
            message: "User signed in successfully",
            token,
            user: {
                id: existingUser._id,
                username: existingUser.username,
                email: existingUser.email,
            },
        });
        
    } catch (error) {
        res.status(500).json({ message: "Error signing in user", error: error.message });
        
    }
}

module.exports = { signUp, signIn }