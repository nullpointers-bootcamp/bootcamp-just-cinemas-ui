import React from "react";
import renderer from "react-test-renderer";
import BookingSummary from "./BookingSummary";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });
it("should show the movie ticket pop ", () => {
  const tree = renderer
    .create(
      <BookingSummary
        seats={["A1", "A2"]}
        movieName={"test movie"}
        theatreName={"test"}
        screenName={"screenName"}
        time={"9:00"}
        createTicket={() => {}}
        showId={1}
        ticketInformation={{}}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("should validate email", () => {
  const wrapper = shallow(
    <BookingSummary
      seats={["A1", "A2"]}
      movieName={"test movie"}
      theatreName={"test"}
      screenName={"screenName"}
      time={"9:00"}
      createTicket={() => {}}
      showId={1}
      ticketInformation={{}}
    />
  );

  expect(wrapper.instance().isValidEmail("test@gmail.com")).toEqual(true);
  expect(wrapper.instance().isValidEmail("testgmail.com")).toEqual(false);
});
