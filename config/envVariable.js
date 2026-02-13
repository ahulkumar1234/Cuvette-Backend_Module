const dotenv = require('dotenv')
dotenv.config();


const envVariable = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    ACCESS_TOKEN: process.env.ACCESS_TOKEN
}




module.exports = envVariable