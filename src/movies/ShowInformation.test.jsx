import React from "react";
import renderer from "react-test-renderer";
import ShowInformation from "./ShowInformation";
import { showInformation } from "./mock-data";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

it("show show information", () => {
  const tree = renderer
    .create(
      <ShowInformation
        shows={showInformation}
        fetchSeatInformation={() => {}}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("should group show information by theatre-id and screen-id", () => {
  const wrapper = shallow(
    <ShowInformation shows={showInformation} fetchSeatInformation={() => {}} />
  );
  expect(wrapper.instance().groupShowInformation()).toEqual({
    "11": showInformation
  });
});
