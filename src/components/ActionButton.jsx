// components/ActionButton.js
import React from "react";
import { Tooltip, Fab } from "@mui/material";

function ActionButton({ title, onClick, children, "aria-label": ariaLabel }) {
  return (
    <Tooltip title={title}>
      <Fab color="primary" onClick={onClick} aria-label={ariaLabel || title}>
        {children}
      </Fab>
    </Tooltip>
  );
}

export default ActionButton;
