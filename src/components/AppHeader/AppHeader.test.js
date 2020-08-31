import React from "react";
import { render } from "@testing-library/react";
import AppHeader from "./AppHeader";

import { StoreProvider } from "../../store";

test("AppHeader smoke test", () => {
  const { getByTestId } = render(
    <StoreProvider>
      <AppHeader />
    </StoreProvider>
  );

  getByTestId("AppHeader");
});
