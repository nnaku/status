import React from "react";
import { render } from "@testing-library/react";
import Link from "./Link";

test("Link smoke test", () => {
  const { getByText } = render(<Link>this is anchor</Link>);

  getByText("this is anchor");
});
