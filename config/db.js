const mongoose = require("mongoose")

const connectWithDatabase = async () => {
    try {
        await mongoose
            .connect(process.env.MONGOURL)
            .then(() => console.log('Connected to MongoDB'))
            .catch(err => console.error('Error connecting to MongoDB:', err));
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}

module.exports = connectWithDatabase