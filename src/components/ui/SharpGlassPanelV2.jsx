/* eslint-disable react/prop-types */
import { forwardRef } from "react";

import "./SharpGlassPanelV2.css";

const SharpGlassPanelV2 = forwardRef(function SharpGlassPanelV2(
  {
    as: Element = "div",
    children,
    className = "",
    ...rest
  },
  ref,
) {
  return (
    <Element
      ref={ref}
      className={`sharp-glass-panel-v2 ${className}`.trim()}
      {...rest}
    >
      {children}
    </Element>
  );
});

export default SharpGlassPanelV2;
