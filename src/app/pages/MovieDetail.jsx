import React from "react";
import Detail from "../../movies/Detail";
import { connect } from "react-redux";
import {
  fetchMovieDetail,
  fetchShowInformation,
  fetchSeatInformation
} from "../../movies/actions";

class MovieDetail extends React.Component {
  render() {
    const {
      movies: { detail, bookingDate, showInformation },
      fetchMovieDetail,
      fetchShowInformation,
      fetchSeatInformation,
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
          showInformation={showInformation}
          fetchSeatInformation={fetchSeatInformation}
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
      dispatch(fetchShowInformation(date, movieId)),
    fetchSeatInformation: show => dispatch(fetchSeatInformation(show))
  })
)(MovieDetail);
