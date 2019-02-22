import React from "react";
import PropTypes from "prop-types";
import BookTicketPopup from "./BookTicketPopup";
import moment from "moment";

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
      <div className="pull-right" onClick={this.openBookTickets}>
        <button className="btn btn-primary book-button">Book Ticket</button>
      </div>
    );
  }

  openBookTickets = () => {
    this.setState({
      show: true
    });
  };

  closeBookTickets = () => {
    this.setState(
      {
        show: false
      },
      () => {
        this.props.clearData();
      }
    );
  };

  render() {
    if (!this.props.movie) {
      return <div>loading...</div>;
    }
    const {
      movie: { name, imageName },
      bookingDate,
      showInformation,
      fetchSeatInformation,
      fetchShowInformation,
      id,
      selectedShow,
      seatInformation,
      selectSeat,
      selectedSeats,
      createTicket,
      ticketInformation
    } = this.props;
    const imageUrl = `https://s3.ap-south-1.amazonaws.com/twspicinemas/banner/${imageName.toLowerCase()}.jpg`;
    return (
      <div>
        <div className="movie-name-wrapper">
          <div className="container">
            <div className="col col-xs-10">
              <h1 className="name">{name}</h1>
            </div>
            <div className="col col-xs-2">{this.renderBookButton()}</div>
          </div>
        </div>
        <img className="banner" alt={name} src={imageUrl} />
        <div className="container">
          <div className="col col-xs-10"> {this.renderSynopsis()} </div>
          <div className="col col-xs-2">{this.renderStills()} </div>

          {this.state.show ? (
            <BookTicketPopup
              show={this.state.show}
              onClose={this.closeBookTickets}
              fetchShowInformation={fetchShowInformation}
              movieId={id}
              bookingDate={bookingDate}
              showInformation={showInformation}
              fetchSeatInformation={fetchSeatInformation}
              selectedShow={selectedShow}
              seatInformation={seatInformation}
              selectSeat={selectSeat}
              selectedSeats={selectedSeats}
              movieName={name}
              createTicket={createTicket}
              ticketInformation={ticketInformation}
              currentDate={moment().format("YYYY-MM-DD")}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

Detail.defaultProps = {
  movie: null,
  id: null,
  ticketInformation: null
};

Detail.propTypes = {
  movie: PropTypes.shape({
    stills: PropTypes.array,
    name: PropTypes.string.isRequired,
    imageName: PropTypes.string.isRequired,
    synopsis: PropTypes.string.isRequired
  }),
  fetchMovieDetail: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  fetchShowInformation: PropTypes.func.isRequired,
  bookingDate: PropTypes.string.isRequired,
  showInformation: PropTypes.array.isRequired,
  fetchSeatInformation: PropTypes.func.isRequired,
  selectedShow: PropTypes.object.isRequired,
  seatInformation: PropTypes.object.isRequired,
  selectSeat: PropTypes.func.isRequired,
  selectedSeats: PropTypes.array.isRequired,
  createTicket: PropTypes.func.isRequired,
  ticketInformation: PropTypes.object.isRequired,
  clearData: PropTypes.func.isRequired
};

export default Detail;
