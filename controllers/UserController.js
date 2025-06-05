const bcrypt = require('bcrypt');
const UserModel = require('../models/UserModel');
const jwt = require('jsonwebtoken');

// Function to handle user sign up
const signUp = async (req, res) => {
     // getting data from request body
    const {username, email, password} = req.body;
    try {  
        // check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "Email already exists"})
    }
    const existingUsername = await UserModel.findOne({ username});
    if (existingUsername){
         // check if username already exists
        return res.status(400).json({message: "Username already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
    });
    // save the new user to the database
    await newUser.save();
    res.status(201).json({ message: "User created successfully", user})
    } catch (error) {
        res.status(500).json({message: "Error creating user", error: error.message});
    }
};

module.exports = { signUp}