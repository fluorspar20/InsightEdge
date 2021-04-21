const Blogs = require("../models/Blog");

const blogCtrl = {
  newBlog: async (req, res) => {
    try {
      const { title, content, description, read_time, author } = req.body;
      const new_blog = new Blogs({
        title,
        content,
        description,
        read_time,
        author,
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
  getBlogById: async (req, res) => {
    try {
      const id = req.params.id;
      const blog = await Blogs.findById(id);
      return res.status(200).json({
        blog,
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
};

module.exports = blogCtrl;
