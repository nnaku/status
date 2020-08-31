import { useCallback, useMemo, useContext } from "react";
import { StoreContext } from "./contex";

export const initialState = { packages: {}, selected: "" };

export function init(initialState) {
  return initialState;
}

export function reducer(state, action) {
  switch (action.type) {
    case "init":
      return { ...initialState };
    case "setPackages":
      return { packages: action.payload };
    case "setSelected":
      return { ...state, selected: action.payload };
    case "makeDependentsByName": {
      const dependents = Object.entries(state.packages).reduce(
        (acc, [key, { depends }]) =>
          depends.flat().includes(action.payload) ? [...acc, key] : acc,
        []
      );
      return {
        ...state,
        packages: {
          ...state.packages,
          [action.payload]: {
            ...state.packages[action.payload],
            dependents,
          },
        },
      };
    }

    default:
      throw new Error();
  }
}

export function useStoreActions() {
  const { dispatch } = useContext(StoreContext);

  // actions
  const resetState = useCallback(() => dispatch({ type: "init" }), [dispatch]);

  const setPackages = useCallback(
    (packages) => dispatch({ type: "setPackages", payload: packages }),
    [dispatch]
  );

  const setSelected = useCallback(
    (selected) => dispatch({ type: "setSelected", payload: selected }),
    [dispatch]
  );

  const makeDependentsByName = useCallback(
    (name) => dispatch({ type: "makeDependentsByName", payload: name }),
    [dispatch]
  );

  return { resetState, setPackages, setSelected, makeDependentsByName };
}

export function useStoreState() {
  const { state } = useContext(StoreContext);
  // computed
  const packageList = useMemo(
    () => Object.keys(state.packages).sort((a, b) => a.localeCompare(b)),
    [state.packages]
  );

  // check if pkg data exists (eq. alternatives)
  const hasPackageData = useCallback(
    (name) => Boolean(state.packages?.[name]),
    [state.packages]
  );

  const hasPackages = useMemo(() => Boolean(packageList.length), [packageList]);

  return { ...state, packageList, hasPackages, hasPackageData };
}
