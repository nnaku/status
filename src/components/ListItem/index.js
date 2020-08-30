import React, { useMemo } from "react";
import classes from "utils/classes";
import styles from "./ListItem.module.scss";

const ListItem = React.memo(({ subHeader, active, className, ...rest }) => {
  const classNames = useMemo(
    () =>
      classes(
        className,
        styles.root,
        { [styles.active]: active },
        { [styles.subHeader]: subHeader }
      ),
    [className, active, subHeader]
  );

  return <li className={classNames} {...rest} />;
});

export default ListItem;
