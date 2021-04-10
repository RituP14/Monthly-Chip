import React from "react";
import { shallow } from "enzyme";
import ItemsList from "./components/ItemList";
import MonthlyItemsList from "./components/monthlyItemsList";

describe("MonthlyItemList", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<MonthlyItemsList />);
  });
  it("should have a `button` element", () => {
    expect(wrapper.containsMatchingElement(<button>Submit</button>)).toBe(true);
  });
  it("`button` should be disabled", () => {
    const button = wrapper.find("button").first();
    expect(button.props().disabled).toBe(true);
  });
});
describe("ItemList", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ItemsList />);
  });
  it("should have an `input` element", () => {
    expect(wrapper.containsMatchingElement(<input />)).toBe(true);
  });
});

describe("the user populates the input", () => {
  let wrapper = shallow(<MonthlyItemsList />);
  const item_amount = "10";
  const description = "Lidl";

  beforeEach(() => {
    const input = wrapper.find("input").first();
    const input_description = wrapper.find("#description").hostNodes();
    input.simulate("change", {
      target: { value: item_amount },
    });
    input_description.simulate("change", {
      target: { value: description },
    });
  });
  it("should update the state property `item_amount`", () => {
    let expected = item_amount;
    let input = wrapper.find("input").first();
    let actual = input.props()["value"];
    expect(expected).toEqual(actual);
  });
  it("should update the state property `description`", () => {
    let expected = description;
    let input = wrapper.find("#description").hostNodes();
    let actual = input.props()["value"];
    expect(expected).toEqual(actual);
  });
  it("should enable `button`", () => {
    const button = wrapper.find("button").first();
    expect(button.props().disabled).toBe(true);
  });
});
