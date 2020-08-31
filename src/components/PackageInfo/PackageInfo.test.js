import React from "react";
import { render } from "@testing-library/react";
import PackageInfo from "./PackageInfo";

import { StoreProvider } from "../../store";

const state = {
  packages: {
    test: {
      name: "test",
      description: "test pkg",
      depends: [],
      dependents: null,
    },
    dependsToTest: {
      name: "dependsToTest",
      description: "dependsToTest pkg",
      depends: [["test"]],
      dependents: null,
    },
  },
  selected: "test",
};

test("PackageInfo smoke test", () => {
  const { getByTestId } = render(
    <StoreProvider initialState={state}>
      <PackageInfo />
    </StoreProvider>
  );

  getByTestId("PackageInfo");
  getByTestId("PackageInfoDependentsItem_dependsToTest");

  // TODO: test new ctx state...  atm no idea HOW!
});
