const bookModel = require("../model/book.model");
const userModel = require("../model/user.model");



const getAllBooks = async (req, res) => {
    try {
        const books = await bookModel.find()

        return res.status(200).json({
            success: true,
            message: "All books fetched successfully",
            books,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Something went wrong!",
        });
    }
};

const getOneBook = async (req, res) => {
    try {
        const { bookId } = req.params

        const findOneBook = await bookModel.findById(bookId)

        res.status(200).json({
            success: true,
            message: "Book fetched successfully!",
            findOneBook,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Something went wrong!",
        });
    }
}

const createBook = async (req, res) => {

    try {
        const { title, author, price, category, stock, description } = req.body

        //empty field check
        if (!title || !author || !price || !category || !stock || !description) {
            return res.status(400).json({
                success: false,
                message: "All fields required!"
            });
        }

        // duplicate book check
        const existingBook = await bookModel.findOne({ title, author, category })

        if (existingBook) {
            return res.status(409).json({
                success: false,
                message: "Book already exists",
            });
        }

        // book creation 
        const createdBook = await bookModel.create({
            title,
            author,
            price,
            category,
            stock,
            description,
            userId: req.user.id,
        });


        res.status(201).json({
            success: true,
            message: "Book created successfully!",
            BookData: createdBook,
        });


    } catch (error) {
        res.status(509).json({
            success: false,
            message: error.message || "Something went wrong!"
        })
    }

};

const updateBook = async (req, res) => {
    try {
        const { id, role } = req.user;
        const { bookId } = req.params;
        const bookData = req.body;

        // empty body check
        if (!bookData || Object.keys(bookData).length === 0) {
            return res.status(400).json({
                success: false,
                message: "No data provided to update",
            });
        }

        // book exists check
        const findBook = await bookModel.findById(bookId);
        if (!findBook) {
            return res.status(404).json({
                success: false,
                message: "Book not found",
            });
        }

        //If user is NOT admin, then check ownership
        if (role !== "admin") {
            if (findBook.userId.toString() !== id) {
                return res.status(403).json({
                    success: false,
                    message: "You are not allowed to update this book",
                });
            }
        }

        // Updated book
        const updatedBook = await bookModel.findByIdAndUpdate(bookId, bookData, {
            new: true,
            runValidators: true,
        });

        return res.status(200).json({
            success: true,
            message: "Book updated successfully",
            book: updatedBook,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Something went wrong!",
        });
    }
};

const deleteBook = async (req, res) => {
    try {
        const { id, role } = req.user;
        const { bookId } = req.params;

        let deletedBook;

        // admin can delete any book
        if (role === "admin") {
            deletedBook = await bookModel.findByIdAndDelete(bookId);
        } else {
            deletedBook = await bookModel.findOneAndDelete({
                _id: bookId,
                userId: id,
            });
        }

        if (!deletedBook) {
            return res.status(400).json({
                success: false,
                message: "Book not found or you are not allowed to delete",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Book deleted successfully!",
            deletedBook,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Something went wrong!",
        });
    }
};






module.exports = { createBook, updateBook, deleteBook, getAllBooks, getOneBook }