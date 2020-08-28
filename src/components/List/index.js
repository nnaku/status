import React, { useMemo } from "react";
import classes from "utils/classes";
import styles from "./List.module.scss";

const List = React.memo(({ className, ...rest }) => {
  const classNames = useMemo(() => classes(className, styles.root), [
    className,
  ]);

  return <ul className={classNames} {...rest} />;
});

export default List;
