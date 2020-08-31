import React, { Fragment } from "react";
import { useStoreState } from "../../store";
import List from "components/List";
import ListItem from "components/ListItem";
import Link from "components/Link";

import styles from "./PackageList.module.scss";
import classes from "utils/classes";

export default function PackageList({ className }) {
  const { packageList } = useStoreState();

  return (
    <List className={classes(styles.root, className)}>
      {packageList.map((e, index, array) => (
        <Fragment key={e}>
          {/* when starting letter changes, render sub header*/}
          {e[0] !== array[index - 1]?.[0] && (
            <ListItem subHeader id={e[0]}>
              {e[0]}
            </ListItem>
          )}
          <ListItem id={e}>
            <Link href={`#${e}`}>{e}</Link>
          </ListItem>
        </Fragment>
      ))}
    </List>
  );
}
