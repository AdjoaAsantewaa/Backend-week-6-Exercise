const express = require('express');
const { signUp, signIn } = require('../controllers/UserController');
const router = express.Router();
const { body } = require('express-validator');

router.post("/signUp",
    [
        body('username')
            .trim()
            .notEmpty()
            .withMessage('Username is required'),

        body('email')
        .trim()
        .isEmail()
        .withMessage('Must be a valid email address'),

        body('password')
        .trim()
        .isLength({ min: 6})
        .withMessage('Password must be at least 6 characters long')

    ], 
    signUp
);

router.post("/signIn",
    [
        body('email')
            .trim()
            .isEmail()
            .withMessage('Must be a valid email address'),

        body('password')
            .trim()
            .notEmpty()
            .withMessage('Password is required')
    ],
    signIn
);

module.exports = router;