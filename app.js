const express = require("express")
require('dotenv').config();
const bodyParser = require("body-parser")
const connectWithDatabase = require('./config/db');
//Routes
const authRoutes = require('./routes/authRoutes')
const productRoutes = require('./routes/productRoutes')
const cartRoutes = require("./routes/cartRoutes")

const app = express()

//Middleware
app.use(bodyParser.json())

//Routes
app.use("/api/auth", authRoutes)
app.use('/api/products', productRoutes);
app.use("/api/cart", cartRoutes)

connectWithDatabase()

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})