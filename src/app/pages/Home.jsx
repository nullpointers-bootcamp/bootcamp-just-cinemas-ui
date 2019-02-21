import React from "react";
import MovieGrid from "../../movies/MovieGrid";
import { connect } from "react-redux";
import {
  fetchMovies,
  fetchUpComingMovies,
  fetchLanguages,
  setSelectedLanguage
} from "../../movies/actions";
import PropTypes from "prop-types";
import cx from "classnames";
import "./home.css";
import LanguageFilter from "../../movies/LanguageFilter";

class Home extends React.Component {
  constructor() {
    super();
    this.state = { showUpComingMovies: false, showNowShowingMovies: true };
  }

  showUpComingMovies = () => {
    this.setState({ showUpComingMovies: true, showNowShowingMovies: false });
  };

  showNowShowingMovies = () => {
    this.setState({ showUpComingMovies: false, showNowShowingMovies: true });
  };
  renderToggleButton() {
    return (
      <div className="toggle-wrapper">
        <div
          className={cx("toggle-button", {
            selected: this.state.showNowShowingMovies
          })}
          onClick={this.showNowShowingMovies}
        >
          NOW SHOWING
        </div>
        <div
          className={cx("toggle-button", {
            selected: this.state.showUpComingMovies
          })}
          onClick={() => this.showUpComingMovies()}
        >
          UPCOMING MOVIES
        </div>
      </div>
    );
  }
  render() {
    const {
      movies: {
        items: nowShowingMovies,
        upComingMovies,
        fetching: nowShowingMoviesFetching,
        upComingMoviesFetching,
        languages
      },
      fetchMovies,
      fetchUpComingMovies,
      fetchLanguages,
      setSelectedLanguage
    } = this.props;

    return (
      <div>
        <div className="filter-wrapper pull-right">
          <LanguageFilter
            languages={languages}
            selectLanguage={languageId => {
              setSelectedLanguage(languageId, () => {
                this.state.showNowShowingMovies && fetchMovies();
                this.state.showUpComingMovies && fetchUpComingMovies();
              });
            }}
            fetchLanguages={fetchLanguages}
          />
        </div>
        {this.renderToggleButton()}

        {this.state.showNowShowingMovies ? (
          <MovieGrid
            key="nowShowingMovies"
            movies={nowShowingMovies}
            fetching={nowShowingMoviesFetching}
            fetchMovies={fetchMovies}
          />
        ) : null}
        {this.state.showUpComingMovies ? (
          <MovieGrid
            key="upComingMovies"
            movies={upComingMovies}
            fetching={upComingMoviesFetching}
            fetchMovies={fetchUpComingMovies}
          />
        ) : null}
      </div>
    );
  }
}

Home.defaultProps = {};

Home.propTypes = {
  movies: PropTypes.object.isRequired,
  fetchMovies: PropTypes.func.isRequired,
  fetchUpComingMovies: PropTypes.func.isRequired,
  fetchLanguages: PropTypes.func.isRequired,
  setSelectedLanguage: PropTypes.func.isRequired
};

export default connect(
  state => ({
    movies: state.movies
  }),
  dispatch => ({
    fetchMovies: () => dispatch(fetchMovies()),
    fetchUpComingMovies: () => dispatch(fetchUpComingMovies()),
    fetchLanguages: () => dispatch(fetchLanguages()),
    setSelectedLanguage: (languageId, callback) =>
      dispatch(setSelectedLanguage(languageId, callback))
  })
)(Home);
