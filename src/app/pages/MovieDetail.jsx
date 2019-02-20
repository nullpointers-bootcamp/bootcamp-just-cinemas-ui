import React from "react";
import Detail from "../../movies/Detail";
import { connect } from "react-redux";
import { fetchMovieDetail, fetchShowInformation } from "../../movies/actions";

class MovieDetail extends React.Component {
  render() {
    const {
      movies: { detail, bookingDate },
      fetchMovieDetail,
      fetchShowInformation,
      match: {
        params: { id }
      }
    } = this.props;

    return (
      <div>
        <Detail
          movie={detail}
          id={id}
          fetchMovieDetail={fetchMovieDetail}
          fetchShowInformation={fetchShowInformation}
          bookingDate={bookingDate}
        />
      </div>
    );
  }
}

export default connect(
  state => ({
    movies: state.movies
  }),
  dispatch => ({
    fetchMovieDetail: movieId => dispatch(fetchMovieDetail(movieId)),
    fetchShowInformation: (date, movieId) =>
      dispatch(fetchShowInformation(date, movieId))
  })
)(MovieDetail);
