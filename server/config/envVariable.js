const dotenv = require('dotenv')
dotenv.config();


const envVariable = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    ACCESS_TOKEN: process.env.ACCESS_TOKEN,
    ADMIN_SECRET_KEY:process.env.ADMIN_SECRET_KEY
}




module.exports = envVariable