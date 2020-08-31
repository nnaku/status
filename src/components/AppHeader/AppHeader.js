import React from "react";

import styles from "./AppHeader.module.scss";
import { useStoreState, useStoreActions } from "../../store";
function AppHeader() {
  const { hasPackages } = useStoreState();
  const { resetState } = useStoreActions();

  return (
    <header className={styles.root}>
      <h3>status</h3>
      <div className={styles.spacer} />
      {hasPackages && <button onClick={resetState}>remove file</button>}
    </header>
  );
}

export default AppHeader;
