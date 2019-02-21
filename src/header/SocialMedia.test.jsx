import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import SocialMedia from "./SocialMedia";

it("show Social media", () => {
  const tree = renderer
    .create(
      <Router>
        <SocialMedia href="https://www.facebook.com/ThoughtWorks/" src="https://s3.ap-south-1.amazonaws.com/twspicinemas/assets/fb_icon.gif" />
      </Router>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
