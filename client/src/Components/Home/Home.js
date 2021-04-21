import React, { useEffect, useState } from "react";
import axios from "axios";

import BlogItem from "./BlogItem/BlogItem";
import "./Home.css";

function Home() {
  const [BLOGS, setBLOGS] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get("http://localhost:5000/blogs/get_blogs");
      console.log(res.data.blogs);
      setBLOGS(res.data.blogs);
    }
    fetchData();
  }, []);

  return (
    <div className="container home">
      <div className="row">
        {BLOGS.map((blog) => {
          return (
            <div key={blog._id} className="col-md-6">
              <BlogItem
                id={blog._id}
                header_img="https://images.pexels.com/photos/556666/pexels-photo-556666.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
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
}

export default Home;
