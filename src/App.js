import React, { useEffect, Fragment } from "react";

import { useStoreState, useStoreActions } from "./store";

import DragDropFileInput from "components/DragDropFileInput";
import PackageList from "components/PackageList";
import PackageInfo from "components/PackageInfo";
import AppHeader from "components/AppHeader";

import styles from "./App.module.scss";

function App() {
  const { hasPackages } = useStoreState();
  const { setSelected } = useStoreActions();

  useEffect(() => {
    if (!hasPackages) {
      window.location.hash = "#";
    }
  }, [hasPackages]);

  useEffect(() => {
    window.onhashchange = () =>
      setSelected(window.location.hash.replace("#", ""));

    return () => (window.onhashchange = null);
  }, [setSelected]);

  return (
    <div id="App" className={styles.root}>
      <AppHeader />
      <main className={styles.main}>
        {hasPackages ? (
          <Fragment>
            <PackageList />
            <PackageInfo />
          </Fragment>
        ) : (
          <DragDropFileInput />
        )}
      </main>
    </div>
  );
}

export default App;
