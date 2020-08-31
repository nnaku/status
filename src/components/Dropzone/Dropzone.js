import React from "react";

function Dropzone({ zoneProps, inputProps, children, ...rest }) {
  return (
    <div data-testid="Dropzone" {...zoneProps} {...rest}>
      <input {...inputProps} />
      {children}
    </div>
  );
}

export default Dropzone;
