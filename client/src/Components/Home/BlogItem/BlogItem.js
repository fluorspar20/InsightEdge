import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

import "./BlogItem.css";

function BlogItem(props) {
  const [author, setAuthor] = useState({});
  useEffect(() => {
    async function fetchData() {
      const data = {};
      data["id"] = props.author;
      // console.log(data);
      const res = await axios.post(
        `http://localhost:5000/users/getUserById`,
        data
      );

      setAuthor(res.data.author);
    }
    fetchData();
  }, []);

  return (
    <div className="blog-item row">
      <div className="col-12">
        <img
          className="header-img img-fluid"
          src={props.header_img}
          alt="Image"
        />
      </div>
      <div className="blog-info col-12">
        <NavLink to={`/blogs/${props.id}`}>
          <h5>{props.title}</h5>
        </NavLink>
        <p>{props.description}</p>
        <span className="author">
          {author.firstName} {author.lastName}
        </span>
        <span className="date-time">
          {props.publishedAt} • {props.read_time} min read
        </span>
      </div>
    </div>
  );
}

export default BlogItem;
