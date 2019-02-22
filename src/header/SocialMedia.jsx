import React from "react";
import "./socialMedia.css";
import PropTypes from "prop-types";

const SocialMedia = props => (
  <div>
    <a href={props.href}>
      <img className="social-media" src={props.src} />
    </a>
  </div>
);

SocialMedia.defaultProps = {
  href: null,
  src: null
};

SocialMedia.propTypes = {
  href: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired
};

export default SocialMedia;
