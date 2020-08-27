import { useCallback, useMemo, useContext } from "react";
import { StoreContext } from "./contex";

export const initialState = { packages: {}, selected: null };

export function init(initialState) {
  return initialState;
}

export function reducer(state, action) {
  switch (action.type) {
    case "init":
      return { ...initialState };
    case "setPackages":
      return { packages: action.payload };
    default:
      throw new Error();
  }
}

export function useStoreActions() {
  const { dispatch } = useContext(StoreContext);

  // actions
  const setPackages = useCallback(
    (packages) => dispatch({ type: "setPackages", payload: packages }),
    [dispatch]
  );

  return { setPackages };
}

export function useStoreState() {
  const { state } = useContext(StoreContext);
  // computed
  const packageList = useMemo(
    () => Object.keys(state.packages).sort((a, b) => a.localeCompare(b)),
    [state.packages]
  );

  return { ...state, packageList };
}
