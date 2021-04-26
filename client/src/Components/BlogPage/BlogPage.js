import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import parse from "react-html-parser";
import { NavLink } from "react-router-dom";

import Loader from "../Loader/Loader";
import "./BlogPage.css";

function BlogPage() {
  const { id } = useParams();

  const [blog, setBlog] = useState(null);
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = {};
      data["id"] = id;
      const res = await axios.post("/blogs/get_blog_info", data);
      // console.log(res.data);
      setBlog(res.data.blog);
      setAuthor(res.data.author);
    }

    fetchData();
  }, []);

  if (blog && author)
    return (
      <div className="blog__page">
        <div className="container">
          <div className="row">
            <div className="col-12 offset-md-2 col-md-8">
              <header>
                <h1>{blog.title}</h1>
              </header>
              <div className="blog__info">
                <h5>
                  <NavLink to={`/dashboard/${author._id}`}>
                    {author.firstName} {author.lastName}
                  </NavLink>
                </h5>
                <p>{new Date(blog.createdAt).toDateString()}</p>
                <img
                  className="img-fluid"
                  style={{ display: "block", margin: "0 auto" }}
                  src={`data:image/png;base64,${blog.header_img}`}
                  alt=""
                />
              </div>
              <div className="blog-content">{parse(blog.content)}</div>
            </div>
          </div>
        </div>
      </div>
    );

  return <Loader />;
}

export default BlogPage;
