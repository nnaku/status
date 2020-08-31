import React from "react";
import { render } from "@testing-library/react";
import List from "./List";

test("List smoke test", () => {
  const { getByTestId } = render(<List>this is anchor</List>);

  getByTestId("List");
});
