const mongoose = require('mongoose');

// connect to DB
const connectDB = async () => {
    try {
        const con = await mongoose.connect(process.env.MONGO_URI);
        console.log("connection was successful");
    } catch (e) {
        console.log(e);
        process.exit();
    }
}

module.exports = connectDB;
