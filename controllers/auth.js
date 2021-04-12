const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Users = require('../models/User')
const { createJWT } = require('../utils/auth')

const userCtrl = {
    signup: async (req, res) => {
        try {
            const { firstName, lastName, email, password } = req.body
            const user = await Users.findOne({ email })
            if (user) {
                return res.status(400).json({
                    message: "The email already exists!"
                })
            }
            if (password.length < 6)
                return res.status(400).json({
                    message: "Password must be atleast 6 characters long."
                })

            // password encryption
            const passwordHash = await bcrypt.hash(password, 10)
            const newUser = new Users({
                firstName, lastName, email, password: passwordHash
            })
            await newUser.save()
            return res.status(200).json({
                message: 'SignUp Successful!',
                user: newUser
            })
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body
            const user = await Users.findOne({ email })
            if (!user) {
                return res.status(400).json({
                    message: "User not found."
                })
            }

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch)
                return res.status(400).json({
                    message: "Incorrect password."
                })

            // if login successful, create access token
            const access_token = createJWT(user.email, user._id, 3600)
            jwt.verify(access_token, process.env.SECRET_TOKEN, (err, decoded) => {
                if (err) {
                    return res.status(500).json({ message: err.message })
                }
                else if (decoded) {
                    return res.status(200).json({
                        message: 'Login Successful!',
                        access_token
                    })
                }
            })

        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    }
}

module.exports = userCtrl