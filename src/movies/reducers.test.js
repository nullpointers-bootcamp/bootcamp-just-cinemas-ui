import reducer from "./reducer";
import {
  FETCH_MOVIES_PROGRESS,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILURE,
  FETCH_MOVIE_DETAIL_SUCCESS,
  SET_BOOKING_DATE,
  FETCH_SHOW_INFORMATION_SUCCESS,
  SET_SELECTED_SHOW,
  FETCH_SEAT_INFORMATION_SUCCESS,
  SELECT_SEAT,
  FETCH_TICKET_INFORMATION_SUCCESS,
  FETCH_UPCOMING_MOVIES_SUCCESS,
  FETCH_UPCOMING_MOVIES_PROGRESS,
  CLEAR_DATA,
  FETCH_LANGUAGES_SUCCESS,
  SET_SELECTED_LANGUAGE
} from "./actions";
import {
  movieItems,
  movieDetail,
  showInformation,
  seatInformation,
  ticketInformaton as ticketInformation,
  languages
} from "./mock-data";

describe("Movie Reducer", () => {
  it("should assgin fetching", () => {
    const expectedState = {
      fetching: true
    };
    const actual = reducer({}, { type: FETCH_MOVIES_PROGRESS });

    expect(actual).toEqual(expectedState);
  });
  it("should assgin fetched data in items on movis success", () => {
    const expectedState = {
      fetching: false,
      items: movieItems
    };
    const actual = reducer(
      {},
      { type: FETCH_MOVIES_SUCCESS, payload: movieItems }
    );

    expect(actual).toEqual(expectedState);
  });
});
it("should assgin error on movies list failure", () => {
  const expectedState = {
    fetching: false,
    error: true
  };
  const actual = reducer({}, { type: FETCH_MOVIES_FAILURE });

  expect(actual).toEqual(expectedState);
});
it("should assgin error on movies detail success", () => {
  const expectedState = {
    detail: movieDetail
  };
  const actual = reducer(
    {},
    { type: FETCH_MOVIE_DETAIL_SUCCESS, payload: movieDetail }
  );

  expect(actual).toEqual(expectedState);
});
it("should assgin booking date", () => {
  const expectedState = {
    bookingDate: "2012-12-12",
    selectedShow: null,
    seatInformation: null,
    selectedSeats: []
  };
  const actual = reducer({}, { type: SET_BOOKING_DATE, payload: "2012-12-12" });

  expect(actual).toEqual(expectedState);
});
it("should assgin show information", () => {
  const expectedState = {
    showInformation
  };
  const actual = reducer(
    {},
    { type: FETCH_SHOW_INFORMATION_SUCCESS, payload: showInformation }
  );

  expect(actual).toEqual(expectedState);
});
it("should assgin selected show", () => {
  const expectedState = {
    selectedShow: showInformation[0],
    seatInformation: null,
    selectedSeats: []
  };
  const actual = reducer(
    {},
    { type: SET_SELECTED_SHOW, payload: showInformation[0] }
  );

  expect(actual).toEqual(expectedState);
});
it("should assgin selected show", () => {
  const expectedState = {
    selectedShow: showInformation[0],
    seatInformation: null,
    selectedSeats: []
  };
  const actual = reducer(
    {},
    { type: SET_SELECTED_SHOW, payload: showInformation[0] }
  );

  expect(actual).toEqual(expectedState);
});
it("should assgin selected show", () => {
  const expectedState = {
    selectedShow: showInformation[0],
    seatInformation: null,
    selectedSeats: []
  };
  const actual = reducer(
    {},
    { type: SET_SELECTED_SHOW, payload: showInformation[0] }
  );

  expect(actual).toEqual(expectedState);
});
it("should assgin seat information", () => {
  const expectedState = {
    seatInformation
  };
  const actual = reducer(
    {},
    { type: FETCH_SEAT_INFORMATION_SUCCESS, payload: seatInformation }
  );

  expect(actual).toEqual(expectedState);
});
it("should add seats when seat is not blocked", () => {
  const expectedState = {
    selectedSeats: ["A1"]
  };
  const actual = reducer(
    { selectedSeats: [] },
    { type: SELECT_SEAT, payload: "A1" }
  );

  expect(actual).toEqual(expectedState);
});

it("should remove seats when seat is blocked", () => {
  const expectedState = {
    selectedSeats: []
  };
  const actual = reducer(
    { selectedSeats: ["A1"] },
    { type: SELECT_SEAT, payload: "A1" }
  );

  expect(actual).toEqual(expectedState);
});

it("should remove seats when seat is blocked", () => {
  const expectedState = {
    ticketInformation
  };
  const actual = reducer(
    {},
    { type: FETCH_TICKET_INFORMATION_SUCCESS, payload: ticketInformation }
  );

  expect(actual).toEqual(expectedState);
});

it("should remove seats when seat is blocked", () => {
  const expectedState = {
    bookingDate: null,
    showInformation: [],
    selectedShow: null,
    seatInformation: null,
    selectedSeats: [],
    ticketInformation: null
  };
  const actual = reducer({}, { type: CLEAR_DATA });

  expect(actual).toEqual(expectedState);
});
it("should assign upcoming movies", () => {
  const expectedState = {
    upComingMovies: movieItems,
    upComingMoviesFetching: false
  };

  const actual = reducer(
    {},
    { type: FETCH_UPCOMING_MOVIES_SUCCESS, payload: movieItems }
  );

  expect(actual).toEqual(expectedState);
});

it("should assign upcoming movies fetching", () => {
  const expectedState = {
    upComingMoviesFetching: true
  };

  const actual = reducer({}, { type: FETCH_UPCOMING_MOVIES_PROGRESS });

  expect(actual).toEqual(expectedState);
});

it("should assign languages", () => {
  const expectedState = {
    languages: languages
  };

  const actual = reducer(
    {},
    { type: FETCH_LANGUAGES_SUCCESS, payload: languages }
  );

  expect(actual).toEqual(expectedState);
});

it("should assign selected langugae ", () => {
  const expectedState = {
    selectedLanguage: 1
  };

  const actual = reducer({}, { type: SET_SELECTED_LANGUAGE, payload: 1 });

  expect(actual).toEqual(expectedState);
});
