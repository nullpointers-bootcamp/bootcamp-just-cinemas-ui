import React from "react";
import PropTypes from "prop-types";
import BookTicketPopup from "./BookTicketPopup";

import "./detail.css";
class Detail extends React.Component {
  constructor() {
    super();
    this.state = {
      show: false
    };
  }
  componentDidMount() {
    this.props.fetchMovieDetail(this.props.id);
  }

  renderSynopsis() {
    const { synopsis } = this.props.movie;
    return (
      <div>
        <h4 className="synopsis-label">SYNOPSIS</h4>
        <p className="synopsis-content">{synopsis}</p>
      </div>
    );
  }

  renderStills() {
    const { stills } = this.props.movie;
    return (
      <div>
        <h4 className="stills-label">IMAGES</h4>
        <div className="stills-wrapper">
          {stills.map((still, index) => (
            <img
              className="still-item"
              alt={still}
              key={index}
              src={`https://s3.ap-south-1.amazonaws.com/twspicinemas/stills/${still.toLowerCase()}.jpg`}
            />
          ))}
        </div>
      </div>
    );
  }
  renderBookButton() {
    return (
      <div onClick={this.openBookTickets}>
        <button className="btn btn-primary pull-right book-button">
          Book Ticket
        </button>
      </div>
    );
  }

  openBookTickets = () => {
    this.setState({
      show: true
    });
  };

  closeBookTickets = () => {
    this.setState({
      show: false
    });
  };

  render() {
    if (!this.props.movie) {
      return <div>loading...</div>;
    }
    const { name, imageName } = this.props.movie;
    const imageUrl = `https://s3.ap-south-1.amazonaws.com/twspicinemas/banner/${imageName.toLowerCase()}.jpg`;
    return (
      <div>
        <h1 className="name">{name}</h1>
        <img className="banner" alt={name} src={imageUrl} />
        {this.renderBookButton()}
        {this.renderSynopsis()}
        {this.renderStills()}
        <BookTicketPopup
          show={this.state.show}
          onClose={this.closeBookTickets}
        />
      </div>
    );
  }
}

Detail.defaultProps = {
  movie: null,
  id: null
};

Detail.propTypes = {
  movie: PropTypes.shape({
    stills: PropTypes.array,
    name: PropTypes.string.isRequired,
    imageName: PropTypes.string.isRequired,
    synopsis: PropTypes.string.isRequired
  }),
  fetchMovieDetail: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired
};

export default Detail;
