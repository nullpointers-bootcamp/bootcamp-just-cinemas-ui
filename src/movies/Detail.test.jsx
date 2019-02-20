import React from "react";
import renderer from "react-test-renderer";
import Detail from "./Detail";
import { movieDetail } from "./mock-data";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

it("show movie detail information", () => {
  const tree = renderer
    .create(
      <Detail
        movie={movieDetail}
        id={"1"}
        fetchMovieDetail={() => {}}
        fetchShowInformation={() => {}}
        bookingDate={""}
        showInformation={[]}
        fetchSeatInformation={() => {}}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("should set show equal to true when openBookTickets called", () => {
  const wrapper = shallow(
    <Detail
      movie={movieDetail}
      id={"1"}
      fetchMovieDetail={() => {}}
      fetchShowInformation={() => {}}
      bookingDate={""}
      showInformation={[]}
      fetchSeatInformation={() => {}}
    />
  );
  wrapper.instance().openBookTickets();
  expect(wrapper.state().show).toEqual(true);
});

it("should set show equal to false when closeBookTickets called", () => {
  const wrapper = shallow(
    <Detail
      movie={movieDetail}
      id={"1"}
      fetchMovieDetail={() => {}}
      fetchShowInformation={() => {}}
      bookingDate={""}
      showInformation={[]}
      fetchSeatInformation={() => {}}
    />
  );
  wrapper.instance().openBookTickets();
  wrapper.instance().closeBookTickets();
  expect(wrapper.state().show).toEqual(false);
});
