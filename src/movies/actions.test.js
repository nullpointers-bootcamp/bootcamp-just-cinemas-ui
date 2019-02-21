import {
  FETCH_MOVIES_PROGRESS,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILURE,
  FETCH_MOVIE_DETAIL_SUCCESS,
  fetchMovieDetail,
  FETCH_SHOW_INFORMATION_SUCCESS,
  SET_SELECTED_SHOW,
  SET_BOOKING_DATE,
  fetchShowInformation,
  fetchSeatInformation,
  FETCH_SEAT_INFORMATION_SUCCESS,
  FETCH_TICKET_INFORMATION_SUCCESS,
  FETCH_UPCOMING_MOVIES_SUCCESS,
  FETCH_UPCOMING_MOVIES_PROGRESS,
  createTicket,
  fetchUpComingMovies,
  fetchMovies,
  fetchLanguages,
  FETCH_LANGUAGES_SUCCESS
} from "../movies/actions";
import MockAdapter from "axios-mock-adapter";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import axios from "axios";
import {
  movieDetail,
  movieItems,
  showInformation,
  seatInformation,
  ticketInformaton,
  languages
} from "./mock-data";

const mockStore = configureMockStore([thunk]);
const mock = new MockAdapter(axios);
let store;

describe("movies/actions", () => {
  beforeEach(() => {
    store = mockStore({});
  });

  it("should fetch movies from server which are now-showing and return FETCH_MOVIES_SUCCESS", async () => {
    mock
      .onGet("http://localhost:9090/movies/now-showing")
      .reply(200, movieItems);

    store.dispatch(fetchMovies()).then(() => {
      expect(store.getActions()[0]).toEqual({ type: FETCH_MOVIES_PROGRESS });
      expect(store.getActions()[1]).toEqual({
        type: FETCH_MOVIES_SUCCESS,
        payload: movieItems
      });
    });
  });

  it("should fetch movies from server which are upcoming and return FETCH_UPCOMING_MOVIES_SUCCESS", async () => {
    mock.onGet("http://localhost:9090/movies/upcoming").reply(200, movieItems);

    store.dispatch(fetchUpComingMovies()).then(() => {
      expect(store.getActions()[0]).toEqual({
        type: FETCH_UPCOMING_MOVIES_PROGRESS
      });
      expect(store.getActions()[1]).toEqual({
        type: FETCH_UPCOMING_MOVIES_SUCCESS,
        payload: movieItems
      });
    });
  });

  it("should return FETCH_MOVIES_FAILURE if http 500", async () => {
    mock.onGet("http://localhost:9090/movies/now-showing").reply(500, {});
    store.dispatch(fetchMovies("now-showing")).then(() => {
      expect(store.getActions()[0]).toEqual({ type: FETCH_MOVIES_PROGRESS });
      expect(store.getActions()[1]).toEqual({ type: FETCH_MOVIES_FAILURE });
    });
  });

  it("should fetch movies details from movie server and return FETCH_MOVIE_DETAIL_SUCCESS", async () => {
    mock.onGet("http://localhost:9090/movies/1").reply(200, movieDetail);

    store.dispatch(fetchMovieDetail(1)).then(() => {
      expect(store.getActions()[0]).toEqual({
        type: FETCH_MOVIE_DETAIL_SUCCESS,
        payload: movieDetail
      });
    });
  });

  it("should fetch show information by date and movie id and return FETCH_SHOW_INFORMATION_SUCCESS", async () => {
    mock
      .onGet(
        "http://localhost:9090/shows/show-information/?date=2019-02-14&movieId=1"
      )
      .reply(200, showInformation);

    store.dispatch(fetchShowInformation("2019-02-14", 1)).then(() => {
      expect(store.getActions()[0]).toEqual({
        type: SET_BOOKING_DATE,
        payload: "2019-02-14"
      });
      expect(store.getActions()[1]).toEqual({
        type: FETCH_SHOW_INFORMATION_SUCCESS,
        payload: showInformation
      });
    });
  });

  it("should fetch the seat information for the given shown and return FETCH_SEAT_INFORMATION_SUCCESS", async () => {
    mock
      .onGet("http://localhost:9090/shows/1/seats")
      .reply(200, seatInformation);

    store.dispatch(fetchSeatInformation(showInformation[0])).then(() => {
      expect(store.getActions()[0]).toEqual({
        type: SET_SELECTED_SHOW,
        payload: showInformation[0]
      });
      expect(store.getActions()[1]).toEqual({
        type: FETCH_SEAT_INFORMATION_SUCCESS,
        payload: seatInformation
      });
    });
  });
  it("should post booking information to create ticket and return FETCH_TICKET_INFORMATION_SUCCESS", async () => {
    mock.onPost("http://localhost:9090/booking").reply(200, ticketInformaton);

    store.dispatch(createTicket(1, ["A1", "A2"])).then(() => {
      expect(store.getActions()[0]).toEqual({
        type: FETCH_TICKET_INFORMATION_SUCCESS,
        payload: ticketInformaton
      });
    });
  });
  it("should fetch languages from server and return FETCH_LANGUAGE_SUCCESS", async () => {
    mock.onGet("http://localhost:9090/languages").reply(200, languages);

    store.dispatch(fetchLanguages()).then(() => {
      expect(store.getActions()[0]).toEqual({
        type: FETCH_LANGUAGES_SUCCESS,
        payload: languages
      });
    });
  });
});
