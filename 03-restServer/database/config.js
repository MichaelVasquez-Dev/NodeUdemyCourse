const mongoose = require("mongoose");

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Database connected successfully");
    } catch (error) {
        console.error(error);
        throw new Error('Error connecting to the database');
    }
}

module.exports = {
    dbConnection
}