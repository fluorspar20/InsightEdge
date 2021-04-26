const userRouter = require("express").Router();
const authCtrl = require("../controllers/auth");
const userCtrl = require("../controllers/user");

userRouter.post("/signup", authCtrl.signup);
userRouter.post("/login", authCtrl.login);
userRouter.post("/getUser", userCtrl.getUser);
userRouter.post("/getUserById", userCtrl.getUserById);
userRouter.post("/getUserAndBlogs", userCtrl.getUserAndBlogs);
userRouter.put("/updateProfile", userCtrl.updateProfile);

module.exports = userRouter;
