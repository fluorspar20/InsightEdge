const blogRouter = require("express").Router();
const blogCtrl = require("../controllers/blog");

blogRouter.post("/new_blog", blogCtrl.newBlog);
blogRouter.get("/get_blogs", blogCtrl.getBlogs);
blogRouter.post("/get_blog_info", blogCtrl.getBlogInfo);

module.exports = blogRouter;
