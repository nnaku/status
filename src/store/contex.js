import React, { createContext, useReducer } from "react";

import { reducer, initialState as initState, init } from "./state";

export const StoreContext = createContext({});

export default function StoreProvider({ initialState, ...rest }) {
  const [state, dispatch] = useReducer(
    reducer,
    { ...initState, ...initialState },
    init
  );

  return <StoreContext.Provider value={{ state, dispatch }} {...rest} />;
}
