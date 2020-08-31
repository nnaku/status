import React from "react";
import { render } from "@testing-library/react";
import ListItem from "./ListItem";

test("ListItem smoke test", () => {
  const { getByText, getByTestId } = render(<ListItem>this is li</ListItem>);

  getByTestId("ListItem");
  getByText("this is li");
});
