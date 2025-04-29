const express = require('express');
const bodyParser = require('body-parser');
const {default: mongoose} = require('mongoose');
const BooksRoute = require('./routes/BooksRoute')


// defining server
const server = express();

// middleware
server.use(bodyParser.json());
const PORT = 5002;


// routes
server.use(BooksRoute)


// connecting server to mongoose
mongoose.connect(
    "mongodb+srv://adjoaakoranteng:sBxd8adGPhLV7PEH@cluster0.vkp9e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    ).then((result) =>{
    server.listen(PORT, () => console.log(`Server is running on ${PORT}`))
})