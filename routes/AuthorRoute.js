const express = require('express');
const { createAuthorDetails, retrieveAuthorDetails } = require('../controllers/AuthorController');
const router = express.Router();

router.post("/author", createAuthorDetails);
router.get("/author", retrieveAuthorDetails)

module.exports = router;