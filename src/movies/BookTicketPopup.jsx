import React from "react";
import Popup from "reactjs-popup";
import PropTypes from "prop-types";
import moment from "moment";
import "./bookingTicketPopup.css";
import cx from "classnames";
import ShowInformation from "./ShowInformation";

class BookTicketPopup extends React.Component {
  componentDidMount() {
    this.props.fetchShowInformation(
      moment().format("YYYY-MM-DD"),
      this.props.movieId
    );
  }

  fetchShowInformation = day => {
    this.props.fetchShowInformation(day, this.props.movieId);
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
    const days = this.getNextNDaysFromGivenDate(Date.now(), 7);
    return (
      <div className="booking-dates-wrapper">
        <div className="booking-date-item booking-date-label">Date :</div>
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

  render() {
    const { show, onClose, bookingDate, showInformation } = this.props;
    return (
      <Popup open={show} onClose={onClose}>
        <div>
          <div className="book-ticket-wrapper">{this.renderDates()}</div>
          {bookingDate && showInformation.length ? (
            <ShowInformation shows={showInformation} />
          ) : null}
        </div>
      </Popup>
    );
  }
}

BookTicketPopup.defaultProps = {
  show: false,
  movieId: null,
  bookingDate: null,
  showInformation: []
};

BookTicketPopup.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  fetchShowInformation: PropTypes.func.isRequired,
  movieId: PropTypes.string.isRequired,
  bookingDate: PropTypes.string.isRequired,
  showInformation: PropTypes.array.isRequired
};
export default BookTicketPopup;
