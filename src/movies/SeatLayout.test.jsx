import React from "react";
import renderer from "react-test-renderer";
import SeatLayout from "./SeatLayout";

import { seatInformation } from "./mock-data";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });
it("show seat layout", () => {
  const tree = renderer
    .create(<SeatLayout seatInformation={seatInformation} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("get total seats based on the row and column", () => {
  const wrapper = shallow(<SeatLayout seatInformation={seatInformation} />);
  expect(wrapper.instance().getAllSeats()).toEqual([
    ["A1", "A2", "A3"],
    ["B1", "B2", "B3"]
  ]);
});
