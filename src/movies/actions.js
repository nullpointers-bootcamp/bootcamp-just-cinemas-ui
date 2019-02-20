import axios from "axios";

export const FETCH_MOVIES_PROGRESS = "FETCH_MOVIES_PROGRESS";
export const FETCH_MOVIES_SUCCESS = "FETCH_MOVIES_SUCCESS";
export const FETCH_MOVIES_FAILURE = "FETCH_MOVIES_FAILURE";
export const FETCH_MOVIE_DETAIL_SUCCESS = "FETCH_MOVIE_DETAIL_SUCCESS";
export const FETCH_SHOW_INFORMATION_SUCCESS = "FETCH_SHOW_INFORMATION_SUCCESS";
export const SET_BOOKING_DATE = "SET_BOOKING_DATE";
export const SET_SELECTED_SHOW = "SET_SELECTED_SHOW";
export const FETCH_SEAT_INFORMATION_SUCCESS = "FETCH_SEAT_INFORMATION_SUCCESS";

const fetchMoviesInProgress = {
  type: FETCH_MOVIES_PROGRESS
};

const movieDataFetched = data => ({
  type: FETCH_MOVIES_SUCCESS,
  payload: data
});

const movieDetailFetched = data => ({
  type: FETCH_MOVIE_DETAIL_SUCCESS,
  payload: data
});
const movieDataFetchFailure = {
  type: FETCH_MOVIES_FAILURE
};

const fetchMovies = () => {
  return async dispatch => {
    dispatch(fetchMoviesInProgress);
    try {
      const movies = await axios.get(
        "http://localhost:9090/movies/now-showing"
      );
      // const movies = {data: [{
      //   id: 'asfasdfas',
      //   name: 'Kabali',
      //   experience: 'asfasdfag',
      // }]}

      dispatch(movieDataFetched(movies.data));
    } catch (error) {
      dispatch(movieDataFetchFailure);
    }
  };
};

export const fetchMovieDetail = movieId => {
  return async dispatch => {
    const movie = await axios.get(`http://localhost:9090/movies/${movieId}`);
    // const movie = {
    //   data: {
    //     id: 1,
    //     name: "Kabali",
    //     experiences: "RDX, Dolby Atmos, SUB",
    //     slug: "Kabali",
    //     synopsis: "Thalaiva's Crime thriller.",
    //     image: "https://i.ytimg.com/vi/kYcl-NcY3Dg/maxresdefault.jpg",
    //     stills: ["kabali", "kabali", "kabali"]
    //   }
    // };
    dispatch(movieDetailFetched(movie.data));
  };
};

const setDate = date => {
  return {
    type: SET_BOOKING_DATE,
    payload: date
  };
};

const showInformationFetched = data => {
  return {
    type: FETCH_SHOW_INFORMATION_SUCCESS,
    payload: data
  };
};
const setSelectedShow = show => {
  return {
    type: SET_SELECTED_SHOW,
    payload: show
  };
};

const seatInformationFetched = data => {
  return {
    type: FETCH_SEAT_INFORMATION_SUCCESS,
    payload: data
  };
};
export const fetchShowInformation = (date, movieId) => {
  return async dispatch => {
    dispatch(setDate(date));
    const showInformation = await axios.get(
      `http://localhost:9090/shows/show-information/?date=${date}&movieId=${movieId}`
    );
    dispatch(showInformationFetched(showInformation.data));
  };
};

export const fetchSeatInformation = show => {
  return async dispatch => {
    dispatch(setSelectedShow(show));
    const seatInformation = await axios.get(
      `http://localhost:9090/shows/${show.showId}/seats`
    );
    dispatch(seatInformationFetched(seatInformation.data));
  };
};

export default fetchMovies;
