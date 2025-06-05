require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const {default: mongoose} = require('mongoose');
const BooksRoute = require('./routes/BooksRoute')
const AuthorRoute = require('./routes/AuthorRoute')
const UserRoute = require('./routes/UserRoute');


// defining server
const server = express();

// middleware
server.use(bodyParser.json());
const PORT = 5002;


// routes
server.use(BooksRoute);
server.use(AuthorRoute);
server.use(UserRoute);


// connecting server to mongoose
mongoose.connect(
    "mongodb+srv://adjoaakoranteng:MI0q7K2c6txag4X1@cluster0.vkp9e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    ).then((result) =>{
    server.listen(PORT, () => console.log(`Server is running on ${PORT}`))
})