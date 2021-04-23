import React, { Component } from "react";

import parse from "react-html-parser";

import "./PreviewBlog.css";

export default class PreviewBlog extends Component {
  render() {
    return (
      <>
        <div className="preview container">
          <h2 className="preview-title"> {parse(this.props.title)} </h2>
          <div className="preview-content"> {parse(this.props.content)} </div>
        </div>
      </>
    );
  }
}
