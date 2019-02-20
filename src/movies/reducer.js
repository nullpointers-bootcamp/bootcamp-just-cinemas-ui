import {
  FETCH_MOVIES_PROGRESS,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILURE,
  FETCH_MOVIE_DETAIL_SUCCESS,
  SET_BOOKING_DATE,
  FETCH_SHOW_INFORMATION_SUCCESS
} from "./actions";

const reducer = (
  state = {
    fetching: false,
    items: [],
    detail: null,
    bookingDate: null,
    showInformation: []
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
      return { ...state, bookingDate: action.payload };
    case FETCH_SHOW_INFORMATION_SUCCESS:
      return { ...state, showInformation: action.payload };
    default:
      return { ...state };
  }
};

export default reducer;
