// OverlayComponent.jsx
import React from "react";
import { Paper, Stack, Box, Typography } from "@mui/material";

const OverlayComponent = ({ imageUrl, text }) => (
  <Paper
    id="overlay"
    className="overlay"
    sx={{ display: "none", backgroundColor: "#000000ee", cursor: "pointer" }}
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
      <Typography
        variant="body2"
        sx={{
          fontFamily: '"Open Sans", sans-serif',
          fontSize: "0.9rem",
          fontWeight: 400,
          textAlign: "center",
          color: "rgba(255, 255, 255, 0.7)",
          fontStyle: "italic",
          mt: 2,
        }}
      >
        Click anywhere to continue
      </Typography>
    </Box>
  </Paper>
);

export default OverlayComponent;
