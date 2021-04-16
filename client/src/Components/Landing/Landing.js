import React from "react";
import "./Landing.css";

function Home() {
  return (
    <div className="home">
      <div className="home__main-content">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12  m-auto">
              <h1>Publish your passions, your way!</h1>
              <h3>Dive deeper on topics that matter to you.</h3>
              <p>
                Tell us what you're into. We'll help you find great things to
                read.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="home__second-content">
        <div className="container">
          <div className="row row-content align-items-center">
            <div className="col-auto col-md-6 m-auto">
              <img
                className="img-fluid"
                src="/assets/ideas.svg"
                height="400"
                alt="idea"
              />
            </div>
            <div className="ideas-content col-12 col-md-6 ml-auto">
              <h1>A Platform for your Ideas!</h1>
              <p>
                Have some content to write about? Then you are at the right
                place. We give you an opportunity to express your ideas and
                views in a unique way!
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="home__third-content">
        <div className="container">
          <div className="row row-content align-items-center">
            <div className="audience-content col-12 col-md-6 mr-auto">
              <h1>Know Your Audience. Choose them Wisely!</h1>
              <p>
                Use trending, relevant hashtags to make sure that your blog gets
                a wider reach! You’ll see where your audience is coming from and
                what they’re interested in.
              </p>
            </div>
            <div className="col-auto m-auto">
              <img
                className="img-fluid"
                src="/assets/audience.png"
                height="400"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div className="home__fourth-content">
        <div className="container">
          <div className="row row-content align-items-center">
            <div className="col-auto m-auto">
              <img
                className="img-fluid"
                src="/assets/network.png"
                height="400"
                alt=""
              />
            </div>
            <div className="connection-content col-12 col-sm-6 ml-auto">
              <h1>Enhance your network and connect to a wider audience</h1>
              <p>
                Interact with people via blogs by upvoting, commenting and
                sharing blogs and follow those who you feel are worth giving a
                read!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
