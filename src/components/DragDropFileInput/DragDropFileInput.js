import React, { useState } from "react";

import { useStoreActions } from "../../store";

import Dropzone, { useDropzone } from "components/Dropzone";
import statusFileParser from "utils/statusFileParser";
import classes from "utils/classes";

import styles from "./DragDropFileInput.module.scss";

export default function DragDropFileInput({ className }) {
  const { setPackages } = useStoreActions();
  const [error, setError] = useState("");

  const [zoneProps, inputProps, { isDragActive }] = useDropzone({
    onDrop: (files) =>
      statusFileParser(files[0])
        .then(setPackages)
        .catch((error) =>
          setError(
            error.name === "BadFileError"
              ? "Check input file! Cannot find any package data!"
              : "Something went wrong."
          )
        ),
    zoneProps: { className: classes(styles.root, className) },
  });

  return (
    <Dropzone zoneProps={zoneProps} inputProps={inputProps}>
      {error && <div className={styles.error}>{error}</div>}
      {isDragActive ? "DROP IT!" : "Drag and Drop or select the file"}
    </Dropzone>
  );
}
