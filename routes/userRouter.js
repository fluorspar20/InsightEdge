const userRouter = require('express').Router()
const authCtrl = require('../controllers/auth')

userRouter.post('/signup', authCtrl.signup)
userRouter.post('/login', authCtrl.login)
userRouter.get('/logout')

module.exports = userRouter