import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

import AuthContext from "../../context/auth-context";
import BlogItem from "../Home/BlogItem/BlogItem";
import Loader from "../Loader/Loader";
import "./Dashboard.css";

function Dashboard() {
  const { id } = useParams();
  const myContext = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const [profileImg, setProfileImg] = useState(null);
  const [bio, setBio] = useState(null);
  const [contact, setContact] = useState(null);

  useEffect(() => {
    async function fetchUserInfo() {
      setLoading(true);
      const data = {};
      data["id"] = id;
      const res = await axios.post("/users/getUserAndBlogs", data);
      // console.log(res.data);
      setUser(res.data.user);
      setBlogs(res.data.blogs);
      setLoading(false);
    }
    fetchUserInfo();
  }, []);

  function toggleModal() {
    setModalOpen(!isModalOpen);
  }

  function ProfileImageOnChange(e) {
    // console.log("file to upload", e.target.files[0]);
    let file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        let binaryString = e.target.result;
        setProfileImg(btoa(binaryString));
      };
      reader.readAsBinaryString(file);
    }
  }

  async function handleUpdate() {
    const data = {};
    data["id"] = user._id;
    data["profileImg"] = profileImg;
    data["bio"] = bio;
    data["contact"] = contact;
    console.log(data);

    setLoading(true);
    const res = await axios.put("/users/updateProfile", data);
    console.log(res.data);
    setModalOpen(!isModalOpen);
    window.location.reload(false);
  }

  if (user && blogs)
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="user-content col-12 col-md-4">
              <div className="profile-pic">
                <img
                  src={
                    user.profileImg
                      ? `data:image/png;base64,${user.profileImg}`
                      : "/assets/user.png"
                  }
                  alt=""
                />
              </div>
              <div className="user-info">
                <h5>
                  {user.firstName} {user.lastName}
                </h5>
                {user.bio && (
                  <div style={{ margin: "1rem 0" }}>
                    <img src="/assets/bio.png" height="15" alt="" />
                    <span>{user.bio}</span>
                  </div>
                )}
                {user.contact && (
                  <div style={{ margin: "1rem 0" }}>
                    <img src="/assets/contact.png" height="15" alt="" />
                    <a href={`mailto:${user.contact}`}>{user.contact}</a>
                  </div>
                )}
                {user.email === myContext.email && (
                  <Button
                    style={{ margin: "1rem 0" }}
                    color="primary"
                    onClick={toggleModal}
                  >
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>
            <div className="blogs col-12 offset-md-1 col-md-7">
              <header>
                <h4>
                  Blogs by {user.firstName} {user.lastName}
                </h4>
              </header>
              {blogs.length ? (
                blogs.map((blog) => {
                  return (
                    <div key={blog._id}>
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
                })
              ) : (
                <div style={{ textAlign: "center" }}>
                  <p>The user hasn't published any blogs yet.</p>
                </div>
              )}
            </div>
          </div>
          <Modal
            size="lg"
            isOpen={isModalOpen}
            toggle={toggleModal}
            className="preview-modal"
          >
            <ModalHeader toggle={toggleModal} style={{ borderBottom: "none" }}>
              Edit Profile:
            </ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label className="profile_img_label" for="profile_img">
                  Upload Profile Picture
                </Label>
                <Input
                  type="file"
                  name="profile_img"
                  className="profile_img"
                  defaultValue={bio}
                  id="profile_img"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={(e) => ProfileImageOnChange(e)}
                />
              </FormGroup>

              <FormGroup>
                <Label for="user_bio">Enter Bio</Label>
                <Input
                  type="textarea"
                  defaultValue={contact}
                  onChange={(e) => setBio(e.target.value)}
                  className="user_bio"
                />
              </FormGroup>
              <FormGroup>
                <Label for="contact">Enter Contact Email</Label>
                <Input
                  required
                  type="email"
                  name="contact"
                  id="contact"
                  placeholder="Eg. abc123@gmail.com"
                  className="contact"
                  onChange={(e) => setContact(e.target.value)}
                />
              </FormGroup>
              <Button onClick={handleUpdate} color="success">
                Update Profile
              </Button>
            </ModalBody>
          </Modal>
        </div>
      </div>
    );
  return loading && <Loader />;
}

export default Dashboard;
