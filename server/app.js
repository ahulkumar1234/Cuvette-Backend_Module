const express = require('express')
const app = express();
const envVariable = require('./config/envVariable');
const connectDB = require('./config/connectDB');
const cookieParser = require('cookie-parser');
const UserRouter = require('./route/user.route');
const BookRouter = require('./route/book.route')
const cors = require("cors")


app.use(cors({
    origin: ["http://localhost:5173", "https://book-store-frontend-module.vercel.app"],
    credentials: true
}));

connectDB();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())



app.get('/', (req, res) => {
    res.send('Hii I am server');
})



// ✔ This is REST API Structure 
app.use('/api/v1/users', UserRouter)
app.use('/api/v1/books', BookRouter)






const port = envVariable.PORT || 3000

app.listen(port, () => {
    console.log(`Server is running on ${port}`)
});