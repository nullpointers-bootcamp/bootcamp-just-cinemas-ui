import fetchMovies, {
  FETCH_MOVIES_PROGRESS,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILURE,
  FETCH_MOVIE_DETAIL_SUCCESS,
  fetchMovieDetail,
  FETCH_SHOW_INFORMATION_SUCCESS,
  SET_BOOKING_DATE,
  fetchShowInformation
} from "../movies/actions";
import MockAdapter from "axios-mock-adapter";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import axios from "axios";
import { movieDetail, movieItems, showInformation } from "./mock-data";

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
});
