import React from "react";
import Detail from "../../movies/Detail";
import { connect } from "react-redux";
import { fetchMovieDetail } from "../../movies/actions";

class MovieDetail extends React.Component {
  render() {
    const {
      movies: { detail },
      fetchMovieDetail,
      match: {
        params: { id }
      }
    } = this.props;

    return (
      <div>
        <Detail movie={detail} id={id} fetchMovieDetail={fetchMovieDetail} />
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
