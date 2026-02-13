const express = require("express")
const router = express.Router()
const { createBook, updateBook, deleteBook, getAllBooks, getOneBook } = require("../controller/book.controller")
const auth = require("../middleware/auth.middleware")



router.get('/', getAllBooks)

router.get('/:bookId', getOneBook)

router.post('/create', auth, createBook)

router.put('/update/:bookId', auth, updateBook)

router.delete("/delete/:bookId", auth, deleteBook)


module.exports = router