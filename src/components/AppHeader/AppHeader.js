import React from "react";

import styles from "./AppHeader.module.scss";
import { useStoreState, useStoreActions } from "../../store";
import Link from "components/Link";
function AppHeader() {
  const { hasPackages } = useStoreState();
  const { resetState } = useStoreActions();

  return (
    <header className={styles.root}>
      <div className={styles.title}>
        <span>/var/lib/dpkg/</span>
        <span className={styles.status}>
          <Link href="#">status</Link>
        </span>
        <span>explorer</span>
      </div>
      <div className={styles.spacer} />
      {hasPackages && <button onClick={resetState}>remove file</button>}
    </header>
  );
}

export default AppHeader;
