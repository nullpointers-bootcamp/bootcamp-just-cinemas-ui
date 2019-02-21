import reducer from "./reducer";
import { FETCH_MOVIES_PROGRESS } from "./actions";

describe("Movie Reducer", () => {
  it("should assgin fetching", () => {
    const expectedState = {
      fetching: true
    };
    const actual = reducer({}, { type: FETCH_MOVIES_PROGRESS });

    expect(actual).toEqual(expectedState);
  });
});
