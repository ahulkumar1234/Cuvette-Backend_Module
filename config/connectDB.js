const mongoose = require('mongoose');
const envVariable = require('./envVariable');

const connectDB = async () => {
    try {
        await mongoose.connect(envVariable.MONGO_URI, {
            dbName: "cuvette_module",
        });
        console.log('Connected to MongoDB')
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}


Object.freeze(connectDB);

module.exports = connectDB;