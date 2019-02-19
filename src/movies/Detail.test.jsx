import React from "react";
import renderer from "react-test-renderer";
import Detail from "./Detail";
import { movieDetail } from "./mock-data";
it("show movie detail information", () => {
  const tree = renderer
    .create(<Detail movie={movieDetail} id={1} fetchMovieDetail={() => {}} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
