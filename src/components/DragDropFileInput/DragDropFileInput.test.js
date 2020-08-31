import React from "react";
import { render } from "@testing-library/react";
import DragDropFileInput from "./DragDropFileInput";

test("DragDropFileInput smoke test", () => {
  const { getByTestId } = render(<DragDropFileInput />);

  getByTestId("DragDropFileInput");
});
