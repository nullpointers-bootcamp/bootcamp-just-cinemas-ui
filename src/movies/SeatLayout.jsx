import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

import "./seatlayout.css";

class SeatLayout extends React.Component {
  getAllSeats() {
    const {
      seatInformation: { noOfRows, noOfColumns }
    } = this.props;
    let seats = [];
    for (let i = 0; i < noOfRows; i++) {
      const char = String.fromCharCode("a".charCodeAt(0) + i);
      let tempSeats = [];
      for (let j = 1; j <= noOfColumns; j++) {
        tempSeats.push(`${char}${j}`.toUpperCase());
      }
      seats.push(tempSeats);
    }
    return seats;
  }

  render() {
    const {
      seatInformation: { bookedSeats }
    } = this.props;
    return (
      <div>
        <div>Seats</div>
        <div className="seats-wrapper">
          {this.getAllSeats().map((seatRow, index) => (
            <div key={index} className="seats-row">
              {seatRow.map((seat, key) => (
                <div
                  key={key}
                  className={cx("seat", {
                    "seat-blocked": bookedSeats.includes(seat)
                  })}
                >
                  {seat}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

SeatLayout.defaultProps = {
  seatInformation: null
};

SeatLayout.propTypes = {
  seatInformation: PropTypes.object.isRequired
};

export default SeatLayout;
