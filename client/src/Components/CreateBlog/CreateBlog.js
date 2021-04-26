import React, { Component } from "react";
import ReactQuill from "react-quill";
import {
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
} from "reactstrap";
import axios from "axios";

import PreviewBlog from "./PreviewBlog";
import AuthContext from "../../context/auth-context";

import "react-quill/dist/quill.snow.css";
import "./CreateBlog.css";

class TextEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      content: "",
      header_img: "",
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.headerImageOnChange = this.headerImageOnChange.bind(this);
  }

  static contextType = AuthContext;

  modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
        { align: [] },
      ],
      ["link", "image", "video"],
    ],
  };

  componentDidMount() {
    const input = document.querySelector("input[data-link]");
    input.dataset.link = "https://google.co.in";
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleSubmit() {
    const email = this.context.email;
    const user = {};
    let author = {};
    user["email"] = email;
    console.log(user);
    axios
      .post("http://localhost:5000/users/getUser", user)
      .then((res) => {
        author = res.data.user;
        const data = {};
        data["title"] = this.state.title;
        data["content"] = this.state.content;
        data["header_img"] = this.state.header_img;

        // temporary workaround for description
        let span = document.createElement("span");
        span.innerHTML = this.state.content;
        data["description"] = span.textContent.substr(0, 100) + " ...";

        const read_time =
          Math.ceil(span.textContent.split(" ").length / 200) + 1;
        data["read_time"] = read_time;
        data["author"] = author;
        console.log(data);

        return axios.post("http://localhost:5000/blogs/new_blog", data);
      })
      .then((res) => {
        alert(res.data.message);
      })
      .catch((err) => {
        alert(err);
      });
  }

  headerImageOnChange(e) {
    console.log("file to upload", e.target.files[0]);
    let file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        let binaryString = e.target.result;
        this.setState({
          header_img: btoa(binaryString),
        });
      };
      reader.readAsBinaryString(file);
    }
    console.log(this.state.header_img);
  }

  render() {
    return (
      <div className="editor-window">
        <div className="container">
          <header>
            <h4>Tell your story, today!</h4>
          </header>
          <div className="row">
            <div className="col-12 col-md-8">
              <div className="blog-title">
                <Input
                  required
                  type="text"
                  placeholder="Enter title..."
                  name="title"
                  id="title"
                  defaultValue={this.state.title}
                  onChange={(e) => {
                    this.setState({ title: e.target.value });
                  }}
                />
                <FormGroup>
                  <Label className="header_img_label" for="header_img">
                    Upload Header Image
                  </Label>
                  <Input
                    type="file"
                    name="header_img"
                    className="header_img"
                    id="header_img"
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={(e) => this.headerImageOnChange(e)}
                  />
                </FormGroup>
              </div>
              <ReactQuill
                required
                className="blog-content"
                name="content"
                theme="snow"
                placeholder="Start writing your blog..."
                modules={this.modules}
                defaultValue={this.state.content}
                onChange={(value) => {
                  this.setState({ content: value });
                }}
              />
            </div>
            <div className="d-none d-sm-none d-md-block col-md-4">
              <Input
                type="textarea"
                className="notes"
                placeholder="Jot down your points here!"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12 create-blog-btns">
              <Button
                onClick={this.toggleModal}
                className="create-blog-btn"
                color="primary"
              >
                Preview
              </Button>
              <Button
                onClick={this.handleSubmit}
                className="create-blog-btn"
                color="success"
              >
                Publish
              </Button>
            </div>
          </div>
          <Modal
            size="xl"
            isOpen={this.state.isModalOpen}
            toggle={this.toggleModal}
            className="preview-modal"
          >
            <ModalHeader
              toggle={this.toggleModal}
              style={{ borderBottom: "none" }}
            >
              Preview:{" "}
            </ModalHeader>
            <ModalBody>
              <PreviewBlog
                title={this.state.title}
                content={this.state.content}
              />
            </ModalBody>
          </Modal>
        </div>
      </div>
    );
  }
}

export default TextEditor;
