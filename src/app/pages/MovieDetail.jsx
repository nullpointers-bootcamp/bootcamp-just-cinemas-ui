import React from "react";
import Detail from "../../movies/Detail";
import { connect } from "react-redux";
import { fetchMovieDetail } from "../../movies/actions";

class MovieDetail extends React.Component {
  render() {
    const {
      movies: { detail },
      fetchMovieDetail
    } = this.props;

    return (
      <div>
        <Detail movie={detail} fetchMovieDetail={fetchMovieDetail} />
      </div>
    );
  }
}

export default connect(
  state => ({
    movies: state.movies
  }),
  dispatch => ({
    fetchMovieDetail: movieId => dispatch(fetchMovieDetail(movieId))
  })
)(MovieDetail);
