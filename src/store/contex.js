import React, { createContext, useReducer } from "react";

import { reducer, initialState, init } from "./state";

export const StoreContext = createContext({});

export default function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState, init);

  return <StoreContext.Provider value={{ state, dispatch }} {...props} />;
}
