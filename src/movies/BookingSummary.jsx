import React from "react";
import PropTypes from "prop-types";
import "./bookingSummary.css";

class BookingSummary extends React.Component {
  constructor() {
    super();
    this.state = {
      email: ""
    };
  }

  handleChange = e => {
    this.setState({
      email: e.target.value
    });
  };
  onConfirm = () => {
    const { seats, createTicket, showId } = this.props;
    createTicket(showId, seats, this.state.email);
  };
  renderTicketInformation = () => {
    const {
      ticketInformation: { bookingRefNumber }
    } = this.props;
    return (
      <div className="ticket-wrapper">
        <div className="booking-success">Booking successful</div>
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
        <h1>Booking {ticketInformation ? "Confirmed" : "Summary"}</h1>
        <div className="booking-summary">
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
        </div>
        <div className="booking-seats">
          Seats: <span className="seats-value">{seats.join(", ")}</span>
        </div>
        {ticketInformation ? (
          this.renderTicketInformation()
        ) : (
          <div>
            <div className="form-group">
              <label>Email address:</label>
              <input
                type="email"
                className="form-control"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </div>
            {this.state.email ? (
              <button
                type="button"
                className="btn btn-success pull-right"
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
