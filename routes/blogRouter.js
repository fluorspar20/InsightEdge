const blogRouter = require("express").Router();
const blogCtrl = require("../controllers/blog");

blogRouter.post("/new_blog", blogCtrl.newBlog);
blogRouter.get("/get_blogs", blogCtrl.getBlogs);
blogRouter.get("/get_blog_byId/:id", blogCtrl.getBlogById);

module.exports = blogRouter;
