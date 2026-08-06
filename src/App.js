import "./App.css";
import React, { useState, useEffect } from "react";
import ReactGA from "react-ga";
import { Box, Container, Grid, Stack, Switch, Typography } from "@mui/material";
import { isMobile } from "react-device-detect";
import {
  currentPiece,
  correctPiece,
  setOnPieceChange,
} from "./helpers/helperFunctions";
import MUSIC_MEMORY_PIECES from "./helpers/musicSetup";
import StyledYouTube from "./helpers/styledYouTube";
import GameCard from "./components/GameCard";
import OverlayComponent from "./components/OverlayComponent";
import ActionButton from "./components/ActionButton";
import WaveIcon from "./components/WaveIcon";
import CoffeeIcon from "./components/CoffeeIcon";
import RefreshIcon from "./components/RefreshIcon";
import ScoreCounter from "./components/ScoreCounter";
import AdSlot from "./components/AdSlot";
import useFetchCatImage from "./hooks/useFetchCatImage";

function App() {
  const [selectedGrade, setSelectedGrade] = useState(
    () => localStorage.getItem("selectedGrade") || "3rd-6th"
  );
  const [correctCount, setCorrectCount] = useState(
    () => parseInt(localStorage.getItem("correctCount")) || 0
  );
  const [incorrectCount, setIncorrectCount] = useState(
    () => parseInt(localStorage.getItem("incorrectCount")) || 0
  );
  const [_resetTrigger, setResetTrigger] = useState(0);

  // Fetch cat with trigger to get new cat each round
  const { item } = useFetchCatImage(
    process.env.REACT_APP_CAT_API_KEY,
    _resetTrigger
  );

  // Set up callback for piece changes to trigger re-render
  useEffect(() => {
    setOnPieceChange(() => {
      setResetTrigger((prev) => prev + 1);
    });
  }, []);

  // Toggle function
  const handleToggleChange = () => {
    const newGrade = selectedGrade === "3rd-6th" ? "2nd" : "3rd-6th";
    setSelectedGrade(newGrade);
    localStorage.setItem("selectedGrade", newGrade);
  };

  // Filter pieces based on selected grade
  const filteredPieces = MUSIC_MEMORY_PIECES.filter((piece) =>
    selectedGrade === "2nd"
      ? piece.grade === "2"
      : piece.grade === "all" || piece.grade === "2"
  );

  function updateCount(type, currentCount, setCount) {
    const newCount = currentCount + 1;
    setCount(newCount);
    localStorage.setItem(type, newCount);
  }

  function resetCounts() {
    localStorage.removeItem("correctCount");
    localStorage.removeItem("incorrectCount");
    setCorrectCount(0);
    setIncorrectCount(0);
    setResetTrigger((prev) => prev + 1); // Trigger re-render
  }

  const handleCardClick = (index, item) => {
    const isCorrect = correctPiece(item);

    if (isCorrect) {
      updateCount("correctCount", correctCount, setCorrectCount);
    } else {
      updateCount("incorrectCount", incorrectCount, setIncorrectCount);
    }
  };

  const handleBuyMeACoffeeClick = () => {
    ReactGA.event({
      category: "Buy me a coffee",
      action: "Clicked",
    });
    window.open("https://account.venmo.com/u/Nathan-Lewis-35");
  };

  const handleAboutMeClick = () => {
    ReactGA.event({
      category: "About Me",
      action: "Clicked",
    });
    window.open("https://nathanlewis.dev/about");
  };

  const handleNoSoundButtonClick = () => {
    ReactGA.event({
      category: "No Sound Button",
      action: "Clicked",
    });
    resetCounts();
  };

  // Removed blocking loading state - cat images load in background
  // Game should be instantly playable with local data

  if (isMobile) {
    return (
      <>
        <OverlayComponent imageUrl={item[0]?.url} text="placeholder" />
        <Container sx={{ p: 5 }}>
          <Typography
            variant="h2"
            sx={{ fontWeight: "bold", textAlign: "center" }}
          >
            Texas UIL Music Memory
          </Typography>
          <Typography variant="h3" sx={{ textAlign: "center" }}>
            Music Memory Game
          </Typography>
          {/* Custom Toggle with Labels */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 2,
            }}
          >
            <Typography variant="body2" sx={{ mr: 1 }}>
              2nd Grade List
            </Typography>
            <Switch
              checked={selectedGrade === "3rd-6th"}
              onChange={handleToggleChange}
              color="primary"
            />
            <Typography variant="body2" sx={{ ml: 1 }}>
              3rd-6th Grade List
            </Typography>
          </Box>

          <div
            style={{
              display: "grid",
              placeItems: "top",
              width: "300px",
              height: "200px",
              margin: "0 auto",
            }}
          >
            <div
              style={{
                gridArea: "inner-div",
                zIndex: 2,
                background: "#E1E1E1",
                height: "50px",
                width: "300px",
              }}
            />
            <div style={{ gridArea: "inner-div", zIndex: 1 }}>
              {StyledYouTube(currentPiece.youtube, true)}
            </div>
          </div>

          {/* Styled Counters */}
          <Box
            sx={{ mt: 4, display: "flex", justifyContent: "center", gap: 4 }}
          >
            <ScoreCounter
              label="Correct Answers"
              count={correctCount}
              backgroundColor="#d4edda"
              textColor="#155724"
              borderColor="#c3e6cb"
            />
            <ScoreCounter
              label="Incorrect Answers"
              count={incorrectCount}
              backgroundColor="#f8d7da"
              textColor="#721c24"
              borderColor="#f5c6cb"
            />
          </Box>

          <AdSlot placement="top" />

          <Container>
            <Grid
              container
              sx={{ gap: 2, mt: 5 }}
              spacing={2}
              alignItems="center"
              justifyContent="center"
            >
              {filteredPieces.map((item, i) => (
                <GameCard
                  key={i}
                  item={item}
                  onClick={() => handleCardClick(i, item)}
                />
              ))}
            </Grid>
          </Container>
          <AdSlot placement="bottom" />
        </Container>
        <Stack
          sx={{
            position: "fixed",
            width: "100px",
            bottom: 0,
            left: 0,
            m: 2,
            zIndex: 3,
          }}
          direction="column"
          spacing={2}
        >
          <Grid
            container
            sx={{ gap: 2, mt: 5 }}
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item>
              <ActionButton
                title="About me"
                aria-label="About me"
                onClick={handleAboutMeClick}
              >
                <WaveIcon />
              </ActionButton>
            </Grid>
          </Grid>
        </Stack>
        <Stack
          sx={{
            position: "fixed",
            width: "100px",
            bottom: 0,
            right: 0,
            m: 2,
            zIndex: 3,
          }}
          direction="column"
          spacing={2}
        >
          <Grid
            container
            sx={{ gap: 2, mt: 5 }}
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item>
              <ActionButton
                title="Buy me a coffee!"
                aria-label="Buy me a coffee"
                onClick={handleBuyMeACoffeeClick}
              >
                <CoffeeIcon />
              </ActionButton>
            </Grid>
          </Grid>
        </Stack>
      </>
    );
  }

  return (
    <>
      <OverlayComponent imageUrl={item[0]?.url} text="placeholder" />
      <Container sx={{ py: 1, px: 3 }}>
        <Typography
          variant="body1"
          sx={{ fontWeight: "bold", textAlign: "center", fontSize: "0.875rem" }}
        >
          Texas UIL Music Memory
        </Typography>
        <Typography
          variant="h2"
          sx={{ fontWeight: "bold", textAlign: "center", mb: 1 }}
        >
          Music Memory Game
        </Typography>
        {/* Stacked control bar: Toggle above Scores */}
        <Box
          sx={{
            mt: 0.5,
            mb: 0.5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          {/* Grade Toggle - Centered Top with equal-width labels */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "70px auto 70px",
              alignItems: "center",
              justifyItems: "center",
              gap: 0.5,
              mx: "auto",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontSize: "0.875rem",
                fontWeight: selectedGrade === "2nd" ? "600" : "400",
                justifySelf: "end",
              }}
            >
              2nd
            </Typography>
            <Switch
              checked={selectedGrade === "3rd-6th"}
              onChange={handleToggleChange}
              color="primary"
              size="small"
            />
            <Typography
              variant="body2"
              sx={{
                fontSize: "0.875rem",
                fontWeight: selectedGrade === "3rd-6th" ? "600" : "400",
                justifySelf: "start",
              }}
            >
              3rd-6th
            </Typography>
          </Box>

          {/* Score Counters - Centered Below */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
            }}
          >
            {/* Correct Counter */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.75,
                backgroundColor: "rgba(212, 237, 218, 0.4)",
                borderRadius: "20px",
                px: 1.25,
                py: 0.5,
                border: "1px solid rgba(195, 230, 203, 0.6)",
              }}
            >
              <Box
                sx={{
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  color: "#155724",
                }}
              >
                ✓
              </Box>
              <Typography
                variant="body2"
                sx={{
                  color: "#155724",
                  fontWeight: "600",
                  fontSize: "0.875rem",
                }}
              >
                {correctCount}
              </Typography>
            </Box>

            {/* Incorrect Counter */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.75,
                backgroundColor: "rgba(248, 215, 218, 0.4)",
                borderRadius: "20px",
                px: 1.25,
                py: 0.5,
                border: "1px solid rgba(245, 198, 203, 0.6)",
              }}
            >
              <Box
                sx={{
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  color: "#721c24",
                }}
              >
                ✗
              </Box>
              <Typography
                variant="body2"
                sx={{
                  color: "#721c24",
                  fontWeight: "600",
                  fontSize: "0.875rem",
                }}
              >
                {incorrectCount}
              </Typography>
            </Box>
          </Box>
        </Box>

        <AdSlot placement="top" />

        <Container sx={{ maxWidth: "100% !important", px: 3 }}>
          <Grid
            container
            sx={{ gap: 1.5, mt: 1, ml: 0 }}
            alignItems="center"
            justifyContent="center"
          >
            {filteredPieces.map((item, i) => (
              <GameCard
                key={i}
                item={item}
                onClick={() => handleCardClick(i, item)}
              />
            ))}
          </Grid>
          {StyledYouTube(currentPiece.youtube, false)}
          <AdSlot placement="bottom" />
        </Container>
      </Container>
      {/* Fixed buttons - Top Left: Reset, Bottom Left: About */}
      <Stack
        sx={{
          position: "fixed",
          width: "100px",
          top: 0,
          left: 0,
          m: 2,
          zIndex: 3,
        }}
        direction="column"
        spacing={2}
      >
        <Grid
          container
          sx={{ gap: 2 }}
          spacing={2}
          alignItems="center"
          justifyContent="center"
        >
          <Grid item>
            <ActionButton
              title="No sound or need to reset?"
              aria-label="Reset game"
              onClick={handleNoSoundButtonClick}
            >
              <RefreshIcon />
            </ActionButton>
          </Grid>
        </Grid>
      </Stack>
      <Stack
        sx={{
          position: "fixed",
          width: "100px",
          bottom: 0,
          left: 0,
          m: 2,
          zIndex: 3,
        }}
        direction="column"
        spacing={2}
      >
        <Grid
          container
          sx={{ gap: 2 }}
          spacing={2}
          alignItems="center"
          justifyContent="center"
        >
          <Grid item>
            <ActionButton
              title="About me"
              aria-label="About me"
              onClick={handleAboutMeClick}
            >
              <WaveIcon />
            </ActionButton>
          </Grid>
        </Grid>
      </Stack>
      <Stack
        sx={{
          position: "fixed",
          width: "100px",
          bottom: 0,
          right: 0,
          m: 2,
          zIndex: 3,
        }}
        direction="column"
        spacing={2}
      >
        <Grid
          container
          sx={{ gap: 2, mt: 5 }}
          spacing={2}
          alignItems="center"
          justifyContent="center"
        >
          <Grid item>
            <ActionButton
              title="Buy me a coffee!"
              aria-label="Buy me a coffee"
              onClick={handleBuyMeACoffeeClick}
            >
              <CoffeeIcon />
            </ActionButton>
          </Grid>
        </Grid>
      </Stack>
    </>
  );
}

export default App;
