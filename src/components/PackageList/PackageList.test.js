import React from "react";
import { render } from "@testing-library/react";
import PackageList from "./PackageList";

import { StoreProvider } from "../../store";

test("PackageList smoke test", () => {
  const { getByTestId } = render(
    <StoreProvider>
      <PackageList />
    </StoreProvider>
  );

  getByTestId("PackageList");
});
