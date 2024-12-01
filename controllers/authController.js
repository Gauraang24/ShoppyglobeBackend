const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

//register a new user
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body

        //Check if the user already exists
        const userExist = await User.findOne({ name })
        if (userExist) {
            return res.status(400).json({ message: "User already exists." })
        }

        //Create and save new user
        const newUser = new User({ name, email, password })

        await newUser.save()
        res.status(201).json({ message: "User registered successfully" })

    } catch (error) {
        console.log("error :", error.message)
        res.status(500).json({ message: "Error registering user." })
    }
}

//Login user and return JWT token
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body

        //Check if user exists
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials." })
        }

        //Check if password matches
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials." })
        }

        const token = jwt.sign(
            {
                userId: user._id,
                name: user.name,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        )

        res.status(200).json({ token })

    } catch (error) {
        console.log("Error :", error.message)
        res.status(500).json({ message: error.message })
    }
}