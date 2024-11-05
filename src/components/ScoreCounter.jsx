import React from 'react';
import { Typography } from '@mui/material';

function ScoreCounter({ label, count, backgroundColor, textColor, borderColor }) {
  return (
    <Typography
      variant="h6"
      sx={{
        backgroundColor: backgroundColor,
        color: textColor,
        border: `1px solid ${borderColor}`,
        borderRadius: '4px',
        padding: '5px 15px',
        fontWeight: 'bold',
      }}
    >
      {label}: {count}
    </Typography>
  );
}

export default ScoreCounter;
