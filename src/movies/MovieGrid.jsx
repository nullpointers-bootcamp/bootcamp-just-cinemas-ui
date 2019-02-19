import React, { Component } from "react";
import PropTypes from "prop-types";
import MovieItem from "./MovieItem";
import "./movie.css";

class MovieGrid extends Component {
  componentDidMount() {
    this.props.fetchMovies();
  }

  render() {
    if (this.props.movies.fetching) {
      return this.showProgress();
    }

    return this.props.movies.error || false
      ? this.showError()
      : this.showMovies();
  }

  showMovies() {
    return (
      <div className="movie-list-container">
        {this.props.movies.items.map(({ name, slug, experiences }) => (
          <MovieItem
            key={name}
            name={name}
            slug={slug}
            experiences={experiences}
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
  movies: PropTypes.shape({
    items: PropTypes.array,
    fetching: PropTypes.bool.isRequired,
    error: PropTypes.string
  }),
  fetchMovies: PropTypes.func.isRequired
};

export default MovieGrid;
