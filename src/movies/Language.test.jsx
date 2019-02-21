import React from "react";
import renderer from "react-test-renderer";
import LanguageFilter from "./LanguageFilter";
import { languages } from "./mock-data";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

it("show language filter dropdown", () => {
  const tree = renderer
    .create(
      <LanguageFilter
        languages={languages}
        selectLanguage={() => {}}
        fetchLanguages={() => {}}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("should trigger fetch languages on componentdidmount", () => {
  const mockFetchLanguages = jest.fn();
  renderer
    .create(
      <LanguageFilter
        languages={languages}
        selectLanguage={() => {}}
        fetchLanguages={mockFetchLanguages}
      />
    )
    .toJSON();
  expect(mockFetchLanguages.mock.calls.length).toBe(1);
});

it("show pass the selected language id when select language changed", () => {
  const mockSelectLanguage = jest.fn();
  const wrapper = shallow(
    <LanguageFilter
      languages={languages}
      selectLanguage={mockSelectLanguage}
      fetchLanguages={() => {}}
    />
  );

  wrapper.find("select").simulate("change", { target: { value: 1 } });
  expect(mockSelectLanguage.mock.calls.length).toBe(1);
  expect(mockSelectLanguage.mock.calls[0][0]).toBe(1);
});
