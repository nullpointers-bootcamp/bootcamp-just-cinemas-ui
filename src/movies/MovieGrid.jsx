import React, { Component } from "react";
import PropTypes from "prop-types";
import MovieItem from "./MovieItem";
import "./movie.css";

class MovieGrid extends Component {
  componentDidMount() {
    this.props.fetchMovies();
  }

  render() {
    if (this.props.fetching) {
      return this.showProgress();
    }

    return this.props.error || false ? this.showError() : this.showMovies();
  }

  showMovies() {
    return (
      <div className="movie-list-container">
        {this.props.movies.map(({ name, imageName, id, experiences }) => (
          <MovieItem
            key={name}
            name={name}
            imageName={imageName}
            experiences={experiences}
            id={id}
          />
        ))}
      </div>
    );
  }

  showProgress() {
    return <div>Loading...</div>;
  }

  showError() {
    return <div>Error...</div>;
  }
}

MovieGrid.defaultProps = {
  movies: {
    items: []
  },
  fetching: false,
  error: ""
};

MovieGrid.propTypes = {
  fetchMovies: PropTypes.func.isRequired,
  movies: PropTypes.array,
  fetching: PropTypes.bool.isRequired,
  error: PropTypes.string
};

export default MovieGrid;
