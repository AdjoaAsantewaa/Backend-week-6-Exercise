const AuthorModel = require("../models/AuthorModel");

const createAuthorDetails = (req, res) => {
    const {name, email, country, bookId} = req.body;

    const author = new AuthorModel({
        name,
        email,
        country,
        bookId
    });
    author.save().then((author) =>{
        if(author){
            res.json({message: "Author created successfully", author});
        } else{
            res.json({message: "Failed to create author"});
        }
    })
    .catch((err) => console.log(err))
};

const retrieveAuthorDetails = (req, res) => {
    AuthorModel.find().populate("bookId")
    .then((authors) =>{
        if (authors) {
            res.json(authors);
        } else{
            res.json("Failed to retrieve authors")
        }
    }).catch((err) => console.log(err))
}
module.exports = {
    createAuthorDetails,
    retrieveAuthorDetails  
}