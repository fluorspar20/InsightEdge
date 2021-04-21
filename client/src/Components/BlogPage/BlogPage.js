import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import parse from "react-html-parser";

import "./BlogPage.css";

function BlogPage() {
  const { id } = useParams();

  const [blogInfo, setBlogInfo] = useState({ blog: null, author: null });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/blogs/get_blog_byId/${id}`)
      .then((res) => {
        setBlogInfo({ ...blogInfo, blog: res.data.blog });
        const data = {};
        data["id"] = blogInfo.blog.author;
        return axios.post(`http://localhost:5000/users/getUserById`, data);
      })
      .then((res) => {
        setBlogInfo({ ...blogInfo, author: res.data.author });
      })
      .catch((err) => console.log(err));

    // fetchData();
  }, []);

  return (
    <div className="blog__page">
      <div className="container">
        <div className="row">
          <div className="col-12 offset-md-2 col-md-8">
            <header>
              <h1>{blogInfo.blog.title}</h1>
            </header>
            <div className="blog__info">
              <h5>
                {blogInfo.author.firstName} {blogInfo.author.lastName}
              </h5>
              <p> {new Date(blogInfo.blog.createdAt).toDateString()} </p>
            </div>
            <div className="blog-content">{parse(blogInfo.blog.content)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogPage;
