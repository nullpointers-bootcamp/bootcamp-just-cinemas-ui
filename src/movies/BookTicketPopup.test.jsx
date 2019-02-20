import React from "react";
import renderer from "react-test-renderer";
import BookTicketPopup from "./BookTicketPopup";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

it("should show the movie ticket pop ", () => {
  const tree = renderer
    .create(<BookTicketPopup show={true} onClose={() => {}} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("should hide the movie ticket pop ", () => {
  const tree = renderer
    .create(<BookTicketPopup show={false} onClose={() => {}} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("should get next 5 days from current date ", () => {
  const wrapper = shallow(<BookTicketPopup show={false} onClose={() => {}} />);
  expect(wrapper.instance().getNextNDaysFromGivenDate("2019-02-20", 5)).toEqual(
    ["2019-02-20", "2019-02-21", "2019-02-22", "2019-02-23", "2019-02-24"]
  );
});
