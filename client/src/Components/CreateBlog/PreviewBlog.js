import React, { Component } from "react";

import parse from "react-html-parser";

// import "../css/preview.css";

export default class PreviewBlog extends Component {
  render() {
    return (
      <>
        <div className="container">
          <h2 className="preview-title"> {parse(this.props.title)} </h2>
          <div className="preview-content"> {parse(this.props.content)} </div>
        </div>
      </>
    );
  }
}
