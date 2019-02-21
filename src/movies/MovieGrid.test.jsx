import React from "react";
import renderer from "react-test-renderer";
import MovieGrid from "./MovieGrid";
import { movieItems } from "./mock-data";
import { BrowserRouter as Router } from "react-router-dom";

it("show display in progres when movie is been fetching", () => {
  const tree = renderer
    .create(
      <Router>
        <MovieGrid movies={[]} fetching={true} fetchMovies={() => {}} />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("show error when movie fetch has failed", () => {
  const tree = renderer
    .create(
      <Router>
        <MovieGrid
          movies={[]}
          error={"error"}
          fetching={false}
          fetchMovies={() => {}}
        />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("show movie list when movies fetched", () => {
  const tree = renderer
    .create(
      <Router>
        <MovieGrid movies={movieItems} fetching={true} fetchMovies={() => {}} />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
