require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const userRouter = require("./routes/userRouter");
const blogRouter = require("./routes/blogRouter");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/users", userRouter);
app.use("/blogs", blogRouter);

//connect to mongodb
const URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.tk5zd.mongodb.net/InsightEdge?retryWrites=true&w=majority`;
mongoose.connect(
  URI,
  {
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to database");
  }
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
