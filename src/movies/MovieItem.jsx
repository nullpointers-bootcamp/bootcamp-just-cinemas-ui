import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const MovieItem = ({ name, slug, experiences }) => {
  const imageUrl = `https://s3.ap-south-1.amazonaws.com/twspicinemas/poster/${slug}.jpg`;
  return (
    <Link className="movie-item" to={`movies/${slug}`}>
      <img alt={name} className="movie-thumbnail" src={imageUrl} />
      <h5 className="name">{name}</h5>
      <p className="experiences">{experiences}</p>
    </Link>
  );
};

MovieItem.defaultProps = {};

MovieItem.propTypes = {
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  experiences: PropTypes.string.isRequired
};

export default MovieItem;
