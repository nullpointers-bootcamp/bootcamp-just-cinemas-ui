import React from "react";
import PropTypes from "prop-types";
import "./bookingSummary.css";
import cx from "classnames";

class BookingSummary extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      error: ""
    };
  }

  handleChange = e => {
    this.setState({
      email: e.target.value,
      error: ""
    });
  };
  onConfirm = () => {
    if (this.isValidEmail(this.state.email)) {
      const { seats, createTicket, showId } = this.props;
      createTicket(showId, seats, this.state.email);
    } else {
      this.setState({
        error: "enter a valid email"
      });
    }
  };
  isValidEmail(email) {
    return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
  }
  renderTicketInformation = () => {
    const {
      ticketInformation: { bookingRefNumber }
    } = this.props;
    return (
      <div className="ticket-wrapper">
        <div className="ticket-id-label">TICKET ID</div>
        <div className="ticket-id-value">{bookingRefNumber}</div>
      </div>
    );
  };

  render() {
    const {
      movieName,
      theatreName,
      screenName,
      seats,
      time,
      ticketInformation
    } = this.props;

    return (
      <div className="booking-summary-wrapper">
        <div className="booking-title" />
        <div className="booking-summary">
          <div
            className={cx("item item-header", {
              confirmed: ticketInformation
            })}
          >
            Booking <br /> {ticketInformation ? "Confirmed" : "Summary"}
          </div>
          <div className="item">
            <div className="label-item">
              Movie
              <div className="value"> {movieName} </div>
            </div>
          </div>
          <div className="item">
            <span className="label-item">
              Cinema
              <div className="value"> {theatreName} </div>
            </span>
          </div>
          <div className="item">
            <span className="label-item">
              Screen
              <div className="value"> {screenName} </div>
            </span>
          </div>
          <div className="item">
            <span className="label-item">
              Time
              <div className="value"> {time} </div>
            </span>
          </div>
          <div className="item">
            <span className="label-item">
              Seats
              <div className="value"> {seats.join(", ")} </div>
            </span>
          </div>
        </div>
        {ticketInformation ? (
          this.renderTicketInformation()
        ) : (
          <div>
            <div
              className={cx("form-group", {
                "has-error": this.state.error
              })}
            >
              <label>Email address:</label>
              <input
                type="email"
                className="form-control"
                value={this.state.email}
                onChange={this.handleChange}
              />
              <span className="help-block">{this.state.error}</span>
            </div>
            {this.state.email ? (
              <button
                type="button"
                className="btn btn-success pull-right confirm-button"
                onClick={this.onConfirm}
              >
                Confirm Booking
              </button>
            ) : null}
          </div>
        )}
      </div>
    );
  }
}

BookingSummary.defaultProps = {
  movieName: "",
  theatreName: "",
  screenName: "",
  seats: [],
  time: ""
};

BookingSummary.propTypes = {
  movieName: PropTypes.string.isRequired,
  theatreName: PropTypes.string.isRequired,
  screenName: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  seats: PropTypes.array.isRequired,
  createTicket: PropTypes.func.isRequired,
  showId: PropTypes.number.isRequired,
  ticketInformation: PropTypes.object.isRequired
};

export default BookingSummary;
