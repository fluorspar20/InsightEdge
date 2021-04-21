const userRouter = require("express").Router();
const authCtrl = require("../controllers/auth");

userRouter.post("/signup", authCtrl.signup);
userRouter.post("/login", authCtrl.login);
userRouter.post("/getUser", authCtrl.getUser);
userRouter.post("/getUserById", authCtrl.getUserById);

module.exports = userRouter;
