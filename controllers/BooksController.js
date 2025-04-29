const BookModel = require("../models/BooksModel");

const createBookDetails = async (req, res) => {
// getting information from request body
const { title, author, description } = req.body;
// creating a new book object
try {
    const book = new BookModel({
        title, 
        author,
        description,
    });
    await book.save();
    res.json(book)

} catch (error){
    res.json({message: error.message})
}
};

// retrieving all books
const retrieveBooks = (req, res) =>{
    let {id} = req.params;
    if(id){
        BookModel.findById(id).then((book) =>{
            res.json(book);
        }).catch((err) => console.log({message:err}));
    } else {
        BookModel.find() .then((book) =>{
            res.json(book);
            
        }).catch((err) => console.log({message:err}));
    }

};

// updating book details
const updateBookDetails = (req, res) => {
    const { id } = req.params; // 🔹 Extract ID from URL
    const { title, author, description } = req.body; // 🔹 Extract update fields

    BookModel.findById(id)
        .then((book) => {
            if (book) {
                book.title = title || book.title;
                book.author = author || book.author;
                book.description = description || book.description;

                book.save()
                    .then((updatedBook) => res.json(updatedBook))
                    .catch((err) => res.status(500).json({ message: err.message }));
            } else {
                res.status(404).json({ message: "Book not found" });
            }
        })
        .catch((err) => res.status(500).json({ message: err.message }));
};

const deleteBookDetails = async (req, res) => {
    try{
        const deleteBookId = await BookModel.findByIdAndDelete(req.params.id);

    if(deleteBookId){
        res.status(200).json({message: "Book removed"})
    } else {
        res.status(404).json({message: "Book not found"})
    }
} catch (error){
    res.status(500).json({message: error.message})
}
};

module.exports = {createBookDetails, retrieveBooks, updateBookDetails, deleteBookDetails};