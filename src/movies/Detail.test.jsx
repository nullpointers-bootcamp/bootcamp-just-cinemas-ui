import React from "react";
import renderer from "react-test-renderer";
import Detail from "./Detail";

it("show movie detail information", () => {
  const movie = {
    id: 1,
    name: "Kabali",
    experiences: "RDX, Dolby Atmos, SUB",
    slug: "Kabali",
    synopsis: "Thalaiva's Crime thriller.",
    image: "kabali",
    stills: ["kabali", "kabali", "kabali"]
  };
  const tree = renderer
    .create(<Detail movie={movie} fetchMovieDetail={() => {}} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
