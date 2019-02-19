import axios from "axios";
import changeCase from "change-case";
import slug from "slug";

export const FETCH_MOVIES_PROGRESS = "FETCH_MOVIES_PROGRESS";
export const FETCH_MOVIES_SUCCESS = "FETCH_MOVIES_SUCCESS";
export const FETCH_MOVIES_FAILURE = "FETCH_MOVIES_FAILURE";
export const FETCH_MOVIE_DETAIL_SUCCESS = "FETCH_MOVIE_DETAIL_SUCCESS";

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
      const moviesData = movies.data.map(movie => {
        const sluggedData = slug(changeCase.sentenceCase(movie.name), {
          lower: true
        });
        return { ...movie, slug: sluggedData };
      });
      dispatch(movieDataFetched(moviesData));
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
    dispatch(movieDetailFetched(movie));
  };
};
export default fetchMovies;
