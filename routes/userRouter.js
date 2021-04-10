const userRouter = require('express').Router()
const userCtrl = require('../controllers/userCtrl')

userRouter.post('/signup', userCtrl.signup)
userRouter.post('/login')
userRouter.get('/logout')

module.exports = userRouter