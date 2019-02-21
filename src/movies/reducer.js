import {
  FETCH_MOVIES_PROGRESS,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILURE,
  FETCH_MOVIE_DETAIL_SUCCESS,
  SET_BOOKING_DATE,
  FETCH_SHOW_INFORMATION_SUCCESS,
  FETCH_SEAT_INFORMATION_SUCCESS,
  SET_SELECTED_SHOW,
  SELECT_SEAT,
  FETCH_TICKET_INFORMATION_SUCCESS,
  CLEAR_DATA,
  FETCH_UPCOMING_MOVIES_SUCCESS,
  FETCH_UPCOMING_MOVIES_PROGRESS
} from "./actions";

const reducer = (
  state = {
    fetching: false,
    items: [],
    detail: null,
    bookingDate: null,
    showInformation: [],
    selectedShow: null,
    seatInformation: null,
    selectedSeats: [],
    ticketInformation: null,
    upComingMovies: [],
    upComingMoviesFetching: false
  },
  action
) => {
  switch (action.type) {
    case FETCH_MOVIES_PROGRESS:
      return { ...state, fetching: true };
    case FETCH_MOVIES_SUCCESS:
      return { ...state, fetching: false, items: action.payload };
    case FETCH_MOVIES_FAILURE:
      return { ...state, fetching: false, error: true };
    case FETCH_MOVIE_DETAIL_SUCCESS:
      return { ...state, detail: action.payload };
    case SET_BOOKING_DATE:
      return {
        ...state,
        bookingDate: action.payload,
        selectedShow: null,
        seatInformation: null,
        selectedSeats: []
      };
    case FETCH_SHOW_INFORMATION_SUCCESS:
      return { ...state, showInformation: action.payload };
    case SET_SELECTED_SHOW:
      return {
        ...state,
        selectedShow: action.payload,
        seatInformation: null,
        selectedSeats: []
      };
    case FETCH_SEAT_INFORMATION_SUCCESS:
      return { ...state, seatInformation: action.payload };
    case SELECT_SEAT:
      if (state.selectedSeats.includes(action.payload)) {
        return {
          ...state,
          selectedSeats: [
            ...state.selectedSeats.filter(seat => seat !== action.payload)
          ]
        };
      } else {
        return {
          ...state,
          selectedSeats: [...state.selectedSeats, action.payload]
        };
      }
    case FETCH_TICKET_INFORMATION_SUCCESS:
      return { ...state, ticketInformation: action.payload };
    case CLEAR_DATA:
      return {
        ...state,
        bookingDate: null,
        showInformation: [],
        selectedShow: null,
        seatInformation: null,
        selectedSeats: [],
        ticketInformation: null
      };
    case FETCH_UPCOMING_MOVIES_SUCCESS:
      return {
        ...state,
        upComingMovies: action.payload,
        upComingMoviesFetching: false
      };
    case FETCH_UPCOMING_MOVIES_PROGRESS:
      return {
        ...state,
        upComingMoviesFetching: true
      };
    default:
      return { ...state };
  }
};

export default reducer;
