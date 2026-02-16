const express = require("express")
const router = express.Router()
const { createBook, updateBook, deleteBook, getAllBooks, getOneBook } = require("../controller/book.controller")
const auth = require("../middleware/auth.middleware")
const adminMiddleware = require("../middleware/isAdmin.middleware");



router.get('/', getAllBooks)

router.get('/:bookId', getOneBook)

router.post('/create', auth, adminMiddleware, createBook)

router.put('/update/:bookId', auth, adminMiddleware, updateBook)

router.delete("/delete/:bookId", auth, adminMiddleware, deleteBook)


module.exports = router