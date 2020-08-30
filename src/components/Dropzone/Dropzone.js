import React from "react";

function Dropzone({ zoneProps, inputProps, children }) {
  return (
    <div {...zoneProps}>
      <input {...inputProps} />
      {children}
    </div>
  );
}

export default Dropzone;
