import axios from "axios";

export const FETCH_MOVIES_PROGRESS = "FETCH_MOVIES_PROGRESS";
export const FETCH_MOVIES_SUCCESS = "FETCH_MOVIES_SUCCESS";
export const FETCH_MOVIES_FAILURE = "FETCH_MOVIES_FAILURE";
export const FETCH_MOVIE_DETAIL_SUCCESS = "FETCH_MOVIE_DETAIL_SUCCESS";
export const FETCH_SHOW_INFORMATION_SUCCESS = "FETCH_SHOW_INFORMATION_SUCCESS";
export const SET_BOOKING_DATE = "SET_BOOKING_DATE";
export const SET_SELECTED_SHOW = "SET_SELECTED_SHOW";
export const FETCH_SEAT_INFORMATION_SUCCESS = "FETCH_SEAT_INFORMATION_SUCCESS";
export const SELECT_SEAT = "SELECT_SEAT";
export const FETCH_TICKET_INFORMATION_SUCCESS =
  "FETCH_TICKET_INFORMATION_SUCCESS";
export const CLEAR_DATA = "CLEAR_DATA";
export const FETCH_UPCOMING_MOVIES_PROGRESS = "FETCH_UPCOMING_MOVIES_PROGRESS";
export const FETCH_UPCOMING_MOVIES_SUCCESS = "FETCH_UPCOMING_MOVIES_SUCCESS";
export const FETCH_UPCOMING_MOVIES_FAILURE = "FETCH_UPCOMING_MOVIES_FAILURE";
export const FETCH_LANGUAGES_SUCCESS = "FETCH_LANGUAGES_SUCCESS";
export const FETCH_LANGUAGES_FAILURE = "FETCH_LANGUAGES_FAILURE";
export const SET_SELECTED_LANGUAGE = "SET_SELECTED_LANGUAGE";

const fetchMoviesInProgress = {
  type: FETCH_MOVIES_PROGRESS
};
const fetchUpComingMoviesInProgress = {
  type: FETCH_UPCOMING_MOVIES_PROGRESS
};

const movieDataFetched = data => ({
  type: FETCH_MOVIES_SUCCESS,
  payload: data
});

const upComingMovieDataFetched = data => ({
  type: FETCH_UPCOMING_MOVIES_SUCCESS,
  payload: data
});

const ticketDataFetched = data => ({
  type: FETCH_TICKET_INFORMATION_SUCCESS,
  payload: data
});

const upcomingMovieDataFetchFailure = error => ({
  type: FETCH_UPCOMING_MOVIES_FAILURE,
  payload: error
});

const movieDetailFetched = data => ({
  type: FETCH_MOVIE_DETAIL_SUCCESS,
  payload: data
});
const movieDataFetchFailure = {
  type: FETCH_MOVIES_FAILURE
};

export const fetchMovies = () => {
  return async (dispatch, getState) => {
    dispatch(fetchMoviesInProgress);
    try {
      let params = "";

      if (getState().movies && getState().movies.selectedLanguage) {
        params = `?language=${getState().movies.selectedLanguage}`;
      }
      const movies = await axios.get(
        `http://localhost:9090/movies/now-showing${params}`
      );

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

export const selectSeat = seat => {
  return {
    type: SELECT_SEAT,
    payload: seat
  };
};

export const createTicket = (showId, seatNumbers, emailId) => {
  return async dispatch => {
    const ticketInformation = await axios.post(
      `http://localhost:9090/booking`,
      {
        emailId,
        showId,
        seatNumbers,
        paymentType: "COD"
      }
    );
    dispatch(ticketDataFetched(ticketInformation.data));
  };
};

export const clearData = () => {
  return { type: CLEAR_DATA };
};

export const fetchUpComingMovies = () => {
  return async (dispatch, getState) => {
    dispatch(fetchUpComingMoviesInProgress);
    try {
      let params = "";

      if (getState().movies && getState().movies.selectedLanguage) {
        params = `?language=${getState().movies.selectedLanguage}`;
      }

      const movies = await axios.get(
        `http://localhost:9090/movies/upcoming${params}`
      );
      dispatch(upComingMovieDataFetched(movies.data));
    } catch (error) {
      dispatch(upcomingMovieDataFetchFailure);
    }
  };
};

export const languagesDataFetched = data => {
  return {
    type: FETCH_LANGUAGES_SUCCESS,
    payload: data
  };
};

export const langugaeDataFetchFailure = error => {
  return {
    type: FETCH_LANGUAGES_FAILURE,
    payload: error
  };
};

export const fetchLanguages = () => {
  return async dispatch => {
    try {
      const languages = await axios.get("http://localhost:9090/languages");

      dispatch(languagesDataFetched(languages.data));
    } catch (error) {
      dispatch(langugaeDataFetchFailure);
    }
  };
};

export const setSelectedLanguage = (languageId, callback) => {
  return async dispatch => {
    dispatch({
      type: SET_SELECTED_LANGUAGE,
      payload: languageId
    });
    callback();
  };
};
