import React from "react";
import { render } from "@testing-library/react";
import App from "App";

import { StoreProvider } from "../store";

test("App smoke test", () => {
  const { getByTestId } = render(
    <StoreProvider>
      <App />
    </StoreProvider>
  );

  getByTestId("App");
  getByTestId("App.main");
});
