import React from "react";
import Detail from "../../movies/Detail";
import { connect } from "react-redux";
import {
  fetchMovieDetail,
  fetchShowInformation,
  fetchSeatInformation,
  selectSeat,
  createTicket,
  clearData
} from "../../movies/actions";

class MovieDetail extends React.Component {
  render() {
    const {
      movies: {
        detail,
        bookingDate,
        showInformation,
        selectedShow,
        seatInformation,
        selectedSeats,
        ticketInformation
      },
      fetchMovieDetail,
      fetchShowInformation,
      fetchSeatInformation,
      selectSeat,
      createTicket,
      clearData,
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
          selectedShow={selectedShow}
          seatInformation={seatInformation}
          selectSeat={selectSeat}
          selectedSeats={selectedSeats}
          createTicket={createTicket}
          ticketInformation={ticketInformation}
          clearData={clearData}
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
    fetchSeatInformation: show => dispatch(fetchSeatInformation(show)),
    selectSeat: seat => dispatch(selectSeat(seat)),
    createTicket: (showId, seatNumbers, emailId) =>
      dispatch(createTicket(showId, seatNumbers, emailId)),
    clearData: () => dispatch(clearData())
  })
)(MovieDetail);
