import React, { useMemo, useEffect, Fragment } from "react";
import { useStoreState, useStoreActions } from "../../store";

import styles from "./PackageInfo.module.scss";
import ListItem from "components/ListItem";
import Link from "components/Link";
import List from "components/List";
import classes from "utils/classes";

function PackageInfo({ className }) {
  const { packages, selected, hasPackageData } = useStoreState();
  const { makeDependentsByName } = useStoreActions();

  useEffect(() => {
    if (packages[selected]?.dependents === null) {
      // kida lazyload dependents (reverse depends) value.
      // null === value not uses/asked before.
      makeDependentsByName(selected);
    }
  }, [selected, packages, makeDependentsByName]);

  const data = useMemo(() => packages?.[selected], [packages, selected]);

  return (
    <div
      data-testid="PackageInfo"
      className={classes(styles.root, { [styles.center]: !data }, className)}
    >
      {data ? (
        <Fragment>
          <h3>Name: {data.name}</h3>
          <h3>Description</h3>
          <p>{data.description}</p>
          <div className={styles.cols}>
            <div className={styles.col}>
              <h3>Depends</h3>
              <List>
                {data.depends.map((d, idx) => (
                  <ListItem key={`data.name.depends[${idx}]`}>
                    <span>
                      {d.map((i) =>
                        hasPackageData(i) ? (
                          <Link
                            data-testid={`PackageInfoDependsItem_${i}`}
                            key={i}
                            href={`#${i}`}
                          >
                            {i}
                          </Link>
                        ) : (
                          i
                        )
                      )}
                    </span>
                  </ListItem>
                ))}
              </List>
            </div>
            <div className={styles.col}>
              <span>
                <h3>Dependents (Reverse dependencies)</h3>
              </span>

              {data?.dependents === null ? (
                "Loading..."
              ) : (
                <List>
                  {data?.dependents?.map((i) => (
                    <ListItem
                      data-testid={`PackageInfoDependentsItem_${i}`}
                      key={i}
                    >
                      <Link href={`#${i}`}>{i}</Link>
                    </ListItem>
                  ))}
                </List>
              )}
            </div>
          </div>{" "}
        </Fragment>
      ) : (
        <div>Select package</div>
      )}
    </div>
  );
}

export default PackageInfo;
