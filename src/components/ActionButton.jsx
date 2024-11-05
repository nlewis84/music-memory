// components/ActionButton.js
import React from 'react';
import { Tooltip, Fab } from '@mui/material';

function ActionButton({ title, onClick, children }) {
  return (
    <Tooltip title={title}>
      <Fab color="primary" onClick={onClick}>
        {children}
      </Fab>
    </Tooltip>
  );
}

export default ActionButton;
