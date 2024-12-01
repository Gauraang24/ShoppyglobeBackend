const jwt = require("jsonwebtoken")

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization")

    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log("decoded:", decoded)
        req.user = decoded
        next()
    } catch (error) {
        console.log("error :", error.message)
        res.json(500).json({ message: "Token isnt valid." })
    }
}