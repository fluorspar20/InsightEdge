import React, { useEffect, useState } from "react";
import axios from "axios";

import BlogItem from "./BlogItem/BlogItem";
import Loader from "../Loader/Loader";
import "./Home.css";

function Home() {
  const [BLOGS, setBLOGS] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/blogs/get_blogs");
      // console.log(res.data.blogs);
      setBLOGS(res.data.blogs);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (BLOGS.length > 0)
    return (
      <div className="container home">
        <div className="row">
          {BLOGS.map((blog) => {
            return (
              <div key={blog._id} className="col-md-4">
                <BlogItem
                  id={blog._id}
                  header_img={
                    blog.header_img
                      ? `data:image/png;base64,${blog.header_img}`
                      : "https://images.medicinenet.com/images/slideshow/sunlight-and-your-health-s1-its-not-all-bad.jpg"
                  }
                  author={blog.author}
                  title={blog.title}
                  description={blog.description}
                  publishedAt={new Date(blog.createdAt).toDateString()}
                  read_time={blog.read_time}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  return loading && <Loader />;
}

export default Home;
