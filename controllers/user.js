const Users = require("../models/User");
const Blogs = require("../models/Blog");

const userCtrl = {
  getUser: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await Users.findOne({ email });
      if (!user) {
        return res.status(400).json({
          message: "Publish Unsuccessful :/",
        });
      }

      res.json({ user: user });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  getUserById: async (req, res) => {
    try {
      const { id } = req.body;
      const user = await Users.findById(id);
      res.status(200).json({ author: user });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  getUserAndBlogs: async (req, res) => {
    try {
      const { id } = req.body;
      const user = await Users.findById(id);
      const blogs = await Blogs.find({ author: user._id });
      return res.status(200).json({
        user,
        blogs,
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  updateProfile: async (req, res) => {
    try {
      const { profileImg, bio, contact, id } = req.body;
      const user = await Users.findByIdAndUpdate(id, {
        $set: { profileImg: profileImg, bio: bio, contact: contact },
      });
      return res.status(200).json({ user });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
};

module.exports = userCtrl;
