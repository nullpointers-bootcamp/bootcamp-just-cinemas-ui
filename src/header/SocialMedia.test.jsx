import React from "react";
import renderer from "react-test-renderer";
import SocialMedia from "./SocialMedia";

it("show Social media", () => {
  const tree = renderer
    .create(
      <SocialMedia
        href="https://www.facebook.com/ThoughtWorks/"
        src="https://s3.ap-south-1.amazonaws.com/twspicinemas/assets/fb_icon.gif"
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
