import React from "react";
import "./header.css";
import { Link } from "react-router-dom";
import SocialMedia from "./SocialMedia";

class Header extends React.Component {
  renderLogo() {
    return (
      <Link to="/">
        <img
          className="logo"
          src="https://s3.ap-south-1.amazonaws.com/twspicinemas/assets/logo.png"
          alt="just cinemas"
        />
      </Link>
    );
  }

  renderSocialMediaLinks() {
    return (
      <div className="row social-media-container">
        <div className="follow-us">Follow Us</div>
        <SocialMedia
          href="https://www.facebook.com/ThoughtWorks/"
          src="https://s3.ap-south-1.amazonaws.com/twspicinemas/assets/fb_icon.gif"
        />
        <SocialMedia
          href="https://twitter.com/thoughtworks"
          src="https://s3.ap-south-1.amazonaws.com/twspicinemas/assets/twitter_icon.png"
        />
      </div>
    );
  }

  render() {
    return (
      <div className="app-header">
        <div className="container">
          <div className="col col-xs-10">{this.renderLogo()}</div>
          <div className="col col-xs-2">{this.renderSocialMediaLinks()}</div>
        </div>
      </div>
    );
  }
}

Header.defaultProps = {};

export default Header;
