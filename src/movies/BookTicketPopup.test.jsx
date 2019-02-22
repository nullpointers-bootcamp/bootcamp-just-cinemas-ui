import React from "react";
import renderer from "react-test-renderer";
import BookTicketPopup from "./BookTicketPopup";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import moment from "moment";

configure({ adapter: new Adapter() });

it("should show the movie ticket pop ", () => {
  const tree = renderer
    .create(
      <BookTicketPopup
        show={true}
        onClose={() => {}}
        fetchShowInformation={() => {}}
        movieId={"1"}
        bookingDate={""}
        fetchSeatInformation={() => {}}
        selectedShow={{}}
        seatInformation={{}}
        selectSeat={() => {}}
        selectedSeats={[]}
        createTicket={() => {}}
        ticketInformation={{}}
        currentDate={"2019-02-21"}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("should hide the movie ticket pop ", () => {
  const tree = renderer
    .create(
      <BookTicketPopup
        show={false}
        onClose={() => {}}
        fetchShowInformation={() => {}}
        movieId={"1"}
        bookingDate={""}
        fetchSeatInformation={() => {}}
        selectedShow={{}}
        seatInformation={{}}
        selectSeat={() => {}}
        selectedSeats={[]}
        createTicket={() => {}}
        ticketInformation={{}}
        currentDate={"2019-02-21"}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("should get next 5 days from current date ", () => {
  const wrapper = shallow(
    <BookTicketPopup
      show={false}
      onClose={() => {}}
      fetchShowInformation={() => {}}
      movieId={"1"}
      bookingDate={""}
      fetchSeatInformation={() => {}}
      selectedShow={{}}
      seatInformation={{}}
      selectSeat={() => {}}
      selectedSeats={[]}
      createTicket={() => {}}
      ticketInformation={{}}
      currentDate={"2019-02-21"}
    />
  );
  expect(wrapper.instance().getNextNDaysFromGivenDate("2019-02-20", 5)).toEqual(
    ["2019-02-20", "2019-02-21", "2019-02-22", "2019-02-23", "2019-02-24"]
  );
});

it("should highlight date when it is selected ", () => {
  const tree = renderer
    .create(
      <BookTicketPopup
        show={true}
        onClose={() => {}}
        fetchShowInformation={() => {}}
        movieId={"1"}
        bookingDate={moment().format("YYYY-MM-DD")}
        fetchSeatInformation={() => {}}
        selectedShow={{}}
        seatInformation={{}}
        selectSeat={() => {}}
        selectedSeats={[]}
        createTicket={() => {}}
        ticketInformation={{}}
        currentDate={"2019-02-21"}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("should trigger fetchShowInformation on component did mount", () => {
  const mockFetchShowInformation = jest.fn();
  shallow(
    <BookTicketPopup
      show={false}
      onClose={() => {}}
      fetchShowInformation={mockFetchShowInformation}
      movieId={"1"}
      bookingDate={""}
      fetchSeatInformation={() => {}}
      selectedShow={{}}
      seatInformation={{}}
      selectSeat={() => {}}
      selectedSeats={[]}
      createTicket={() => {}}
      ticketInformation={{}}
      currentDate={moment().format("YYYY-MM-DD")}
    />
  );
  expect(mockFetchShowInformation.mock.calls.length).toBe(1);
  expect(mockFetchShowInformation.mock.calls[0][0]).toBe(
    moment().format("YYYY-MM-DD")
  );
  expect(mockFetchShowInformation.mock.calls[0][1]).toBe("1");
});
