import React from "react";
import Popup from "reactjs-popup";
import PropTypes from "prop-types";
import moment from "moment";
import "./bookingTicketPopup.css";

class BookTicketPopup extends React.Component {
  renderDates() {
    const days = this.getNextNDaysFromGivenDate(Date.now(), 5);
    return (
      <div className="booking-dates-wrapper">
        <div className="booking-date-item booking-date-label">Date :</div>
        {days.map((day, index) => (
          <div key={index} className="booking-date-item">
            <div>{moment(day).format("ddd")}</div>
            <div>{moment(day).format("DD")}</div>
          </div>
        ))}
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
    const { show, onClose } = this.props;
    return (
      <Popup open={show} onClose={onClose}>
        <div className="book-ticket-wrapper">{this.renderDates()}</div>
      </Popup>
    );
  }
}

BookTicketPopup.defaultProps = {
  show: false
};

BookTicketPopup.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};
export default BookTicketPopup;
