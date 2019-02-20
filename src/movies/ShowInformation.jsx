import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import "./showinformation.css";

class ShowInformation extends React.Component {
  groupShowInformation() {
    const { shows } = this.props;
    return _.groupBy(
      shows,
      item => item.theatreId.toString() + item.screenId.toString()
    );
  }

  render() {
    return _.map(this.groupShowInformation(), (shows, index) => (
      <div key={index} className="show-row">
        <div className="show-theatre-screen">
          <div>{shows[0].theatreName}</div>
          <div>{shows[0].screenName}</div>
        </div>
        <div className="show-timings-wrapper">
          {shows.map((show, index) => (
            <div key={index} className="show-timing">
              {show.time}
            </div>
          ))}
        </div>
      </div>
    ));
  }
}

ShowInformation.defaultProps = {
  shows: []
};

ShowInformation.propTypes = {
  shows: PropTypes.array.isRequired
};

export default ShowInformation;
