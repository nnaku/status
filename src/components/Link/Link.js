import React, { useMemo } from "react";
import classes from "utils/classes";
import styles from "./Link.module.scss";

const Link = React.memo(({ className, children, ...rest }) => {
  const classNames = useMemo(() => classes(className, styles.root), [
    className,
  ]);
  return (
    <a className={classNames} {...rest}>
      {children}
    </a>
  );
});

export default Link;
