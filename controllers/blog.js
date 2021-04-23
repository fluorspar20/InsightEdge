const Blogs = require("../models/Blog");
const Users = require("../models/User");

const blogCtrl = {
  newBlog: async (req, res) => {
    try {
      const {
        title,
        content,
        description,
        read_time,
        author,
        header_img,
      } = req.body;
      const new_blog = new Blogs({
        title,
        content,
        description,
        read_time,
        author,
        header_img,
      });
      await new_blog.save();
      return res.status(200).json({
        message: "Blog Published!",
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  getBlogs: async (req, res) => {
    try {
      const blogs = await Blogs.find({});
      return res.status(200).json({
        blogs,
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  getBlogInfo: async (req, res) => {
    try {
      const { id } = req.body;
      const blog = await Blogs.findById(id);
      const author = await Users.findById(blog.author);
      return res.status(200).json({
        blog,
        author,
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
};

module.exports = blogCtrl;
