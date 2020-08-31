import React, { useMemo, useEffect } from "react";
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

  const data = useMemo(() => packages[selected], [packages, selected]);

  return data ? (
    <div className={classes(styles.root, className)}>
      <h3>Name</h3>
      <pre>{data.name}</pre>
      <h3>Description</h3>
      <p>{data.description}</p>
      <div>
        <div>
          <h3>depends</h3>
          <List>
            {data.depends.map((d, idx) => (
              <ListItem key={`data.name.depends[${idx}]`}>
                <span>
                  {d.map((i) =>
                    hasPackageData(i) ? (
                      <Link key={i} href={`#${i}`}>
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
        <div>
          <h3>dependents</h3>
          {data?.dependents === null ? (
            "Loading..."
          ) : (
            <List>
              {data?.dependents?.map((i) => (
                <ListItem key={i}>
                  <Link href={`#${i}`}>{i}</Link>
                </ListItem>
              ))}
            </List>
          )}
        </div>
      </div>
    </div>
  ) : null;
}

export default PackageInfo;
