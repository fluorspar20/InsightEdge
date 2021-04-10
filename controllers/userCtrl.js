const bcrypt = require('bcrypt')

const Users = require('../models/userModel')

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
            return res.json({
                message: 'SignUp Successful!'
            })
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    }
}

module.exports = userCtrl