const { useCallback, useRef, useState } = require("react");

export function useDropzone({ onDrop, zoneProps, inputProps }) {
  const [isDragActive, setDragActive] = useState(false);

  const zoneRef = useRef(null);
  const inputRef = useRef(null);

  const onChange = useCallback(
    (e) => {
      e.persist();
      onDrop(e.target.files);
    },
    [onDrop]
  );

  const onDragEnter = useCallback((e) => setDragActive(true), [setDragActive]);
  const onDragLeave = useCallback((e) => setDragActive(false), [setDragActive]);

  // transfer dropzone click to actual input (eg. open file browser dialog)
  const onClick = useCallback(() => {
    inputRef.current.value = null;
    inputRef.current.click();
  }, [inputRef]);

  const onDragOver = useCallback((e) => {
    e.preventDefault();
    e.persist();
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.persist();
      onDrop(e.dataTransfer.files);
      setDragActive(false);
    },
    [onDrop, setDragActive]
  );

  return [
    {
      ref: zoneRef,
      onClick,
      onDragOver,
      onDrop: handleDrop,
      onDragEnter,
      onDragLeave,
      ...zoneProps,
    },
    { ref: inputRef, type: "file", hidden: true, onChange, ...inputProps },
    { isDragActive },
  ];
}
