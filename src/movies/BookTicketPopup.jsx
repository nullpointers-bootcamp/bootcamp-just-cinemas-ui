import React from "react";
import Popup from "reactjs-popup";
import PropTypes from "prop-types";
import moment from "moment";
import "./bookingTicketPopup.css";
import cx from "classnames";
import ShowInformation from "./ShowInformation";
import SeatLayout from "./SeatLayout";
import BookingSummary from "./BookingSummary";

class BookTicketPopup extends React.Component {
  constructor() {
    super();
    this.state = {
      showBookingSummary: false
    };
  }

  componentDidMount() {
    this.props.fetchShowInformation(this.props.currentDate, this.props.movieId);
  }

  fetchShowInformation = day => {
    this.props.fetchShowInformation(day, this.props.movieId);
  };

  toggleBookingSummary = () => {
    this.setState({
      showBookingSummary: !this.state.showBookingSummary
    });
  };

  renderDate(day, index) {
    return (
      <div
        key={index}
        className={cx("booking-date-item", {
          "date-selected": this.props.bookingDate === day
        })}
        onClick={() => this.fetchShowInformation(day)}
      >
        <div>{moment(day).format("ddd")}</div>
        <div>{moment(day).format("DD")}</div>
      </div>
    );
  }

  renderDates() {
    const days = this.getNextNDaysFromGivenDate(Date.now(), 8);
    return (
      <div className="booking-dates-wrapper">
        {days.map((day, index) => this.renderDate(day, index))}
      </div>
    );
  }

  getNextNDaysFromGivenDate(date, nDays) {
    let days = [];
    for (let i = 0; i < nDays; i++) {
      const today = moment(date);
      days.push(
        moment(today)
          .add(i, "days")
          .format("YYYY-MM-DD")
      );
    }
    return days;
  }

  renderSelectedShowInformation() {
    const {
      selectedShow: { theatreName, screenName, time }
    } = this.props;
    return (
      <div className="selected-show">
        <p className="selected-show-information">
          {theatreName}({screenName}) {time}
        </p>
      </div>
    );
  }

  renderCloseButton = () => {
    return (
      <div className="pull-right button-close" onClick={this.props.onClose}>
        (X)
      </div>
    );
  };

  render() {
    const {
      show,
      onClose,
      bookingDate,
      showInformation,
      fetchSeatInformation,
      selectedShow,
      seatInformation,
      selectSeat,
      selectedSeats,
      movieName,
      createTicket,
      ticketInformation
    } = this.props;
    const { theatreName, screenName, time, showId } = selectedShow || {};
    return (
      <Popup open={show} onClose={onClose}>
        <div className="popup-wrapper">
          {this.renderCloseButton()}
          {this.state.showBookingSummary && selectedSeats.length ? (
            <BookingSummary
              theatreName={theatreName}
              screenName={screenName}
              time={time}
              seats={selectedSeats}
              movieName={movieName}
              createTicket={createTicket}
              showId={showId}
              ticketInformation={ticketInformation}
            />
          ) : (
            <div>
              <div className="book-ticket-wrapper">{this.renderDates()}</div>
              {bookingDate && showInformation.length && !selectedShow ? (
                <ShowInformation
                  shows={showInformation}
                  fetchSeatInformation={fetchSeatInformation}
                />
              ) : bookingDate && !selectedShow ? (
                <p className="no-shows">No Shows available</p>
              ) : null}
              {selectedShow ? this.renderSelectedShowInformation() : null}
              {seatInformation ? (
                <SeatLayout
                  seatInformation={seatInformation}
                  selectSeat={selectSeat}
                  selectedSeats={selectedSeats}
                />
              ) : null}
              {selectedSeats && selectedSeats.length ? (
                <div className="popup-footer row">
                  <div className="col col-xs-11">
                    <div className="selected-seats">
                      Selected Seats: {selectedSeats.join(", ")}
                    </div>
                  </div>
                  <div className="col col-xs-1">
                    <button
                      type="button"
                      className="proceed-btn btn btn-primary pull-right"
                      onClick={this.toggleBookingSummary}
                    >
                      Proceed
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </Popup>
    );
  }
}

BookTicketPopup.defaultProps = {
  show: false,
  movieId: null,
  bookingDate: null,
  showInformation: [],
  movieName: ""
};

BookTicketPopup.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  fetchShowInformation: PropTypes.func.isRequired,
  movieId: PropTypes.string.isRequired,
  bookingDate: PropTypes.string.isRequired,
  showInformation: PropTypes.array.isRequired,
  fetchSeatInformation: PropTypes.func.isRequired,
  selectedShow: PropTypes.object.isRequired,
  seatInformation: PropTypes.object.isRequired,
  selectSeat: PropTypes.func.isRequired,
  selectedSeats: PropTypes.array.isRequired,
  movieName: PropTypes.string.isRequired,
  createTicket: PropTypes.func.isRequired,
  ticketInformation: PropTypes.object.isRequired,
  currentDate: PropTypes.string.isRequired
};
export default BookTicketPopup;
