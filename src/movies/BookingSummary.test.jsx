import React from "react";
import renderer from "react-test-renderer";
import BookingSummary from "./BookingSummary";

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
