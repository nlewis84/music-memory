// OverlayComponent.jsx
import React from "react";
import { Paper, Stack, Box, Typography } from "@mui/material";

const OverlayComponent = ({ imageUrl, text }) => (
  <Paper
    id="overlay"
    className="overlay"
    sx={{ display: "none", backgroundColor: "#000000ee" }}
    component={Stack}
    direction="column"
    justifyContent="center"
    alignItems="center"
    spacing={2}
  >
    <Box
      component={Stack}
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={5}
      maxWidth={"75%"}
      maxHeight={"75%"}
    >
      {imageUrl && <img className="image" src={imageUrl} alt="cat gif" />}
      <Typography
        variant="h4"
        sx={{
          fontFamily: '"Poppins", sans-serif',
          fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
          fontWeight: 700,
          textAlign: "center",
          letterSpacing: "-0.02em",
          textShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
        }}
        id="reply"
      >
        {text}
      </Typography>
    </Box>
  </Paper>
);

export default OverlayComponent;
