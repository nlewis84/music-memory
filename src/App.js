import "./App.css";
import React, { useState, useEffect } from "react";
import ReactGA from "react-ga";
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { isMobile } from "react-device-detect";
import { currentPiece, correctPiece } from "./helpers/helperFunctions";
import MUSIC_MEMORY_PIECES from "./helpers/musicSetup";
import StyledYouTube from "./helpers/styledYouTube";
import GameCard from "./components/GameCard";
import OverlayComponent from "./components/OverlayComponent";
import ActionButton from "./components/ActionButton";
import WaveIcon from "./components/WaveIcon";
import CoffeeIcon from "./components/CoffeeIcon";
import RefreshIcon from "./components/RefreshIcon";
import ScoreCounter from "./components/ScoreCounter";
import useFetchCatImage from "./hooks/useFetchCatImage";

function App() {
  const { item, dataIsLoaded } = useFetchCatImage(
    process.env.REACT_APP_CAT_API_KEY
  );

  const [correctCount, setCorrectCount] = useState(
    () => parseInt(localStorage.getItem("correctCount")) || 0
  );
  const [incorrectCount, setIncorrectCount] = useState(
    () => parseInt(localStorage.getItem("incorrectCount")) || 0
  );

  function updateCount(type, currentCount, setCount) {
    const newCount = currentCount + 1;
    setCount(newCount);
    localStorage.setItem(type, newCount);
  }
  
  function resetCounts(setCorrectCount, setIncorrectCount) {
    localStorage.removeItem("correctCount");
    localStorage.removeItem("incorrectCount");
    setCorrectCount(0);
    setIncorrectCount(0);
  }  

  const handleCardClick = (index, item) => {
    const isCorrect = correctPiece(null, item);
  
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
    resetCounts(setCorrectCount, setIncorrectCount);
    window.location.reload();
  };
  

  const handleReload = () => {
    window.location.reload();
  };

  if (!dataIsLoaded || !currentPiece?.youtube) {
    return (
      <>
        <OverlayComponent imageUrl={undefined} text="placeholder" />
        <Container sx={{ p: 5 }}>
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", textAlign: "center" }}
          >
            Texas UIL 3rd-6th Grade
          </Typography>
          <Typography
            variant="h2"
            sx={{ fontWeight: "bold", textAlign: "center" }}
          >
            Music Memory Game
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: "h6.fontSize",
              fontWeight: "bold",
              textAlign: "center",
              color: "text.secondary",
              mt: 2,
            }}
          >
            Trouble? Click this button
          </Typography>
          <Container
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "primary.dark",
              borderRadius: "50%",
              height: 80,
              width: 80,
              ":hover": {
                boxShadow: 10,
              },
              ":active": { boxShadow: 0 },
            }}
            onClick={handleReload}
          >
            <RefreshIcon />
          </Container>
          <Container>
            <Grid
              container
              sx={{ gap: 2, mt: 5 }}
              spacing={2}
              alignItems="center"
              justifyContent="center"
            >
              {new Array(16).fill().map((_, i) => (
                <Card
                  key={i}
                  sx={{
                    backgroundColor: "primary.dark",
                    borderRadius: 2,
                    height: 180,
                    width: 180,
                    ":hover": {
                      boxShadow: 10,
                    },
                  }}
                  variant="outlined"
                  style={{ textDecoration: "none" }}
                >
                  <CardContent>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "text.tertiary",
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      <Skeleton animation="wave" />
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: "text.disabled", textAlign: "center" }}
                    >
                      <Skeleton animation="wave" />
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Grid>
          </Container>
        </Container>
      </>
    );
  }

  if (isMobile) {
    return (
      <>
        <OverlayComponent imageUrl={item[0]?.url} text="placeholder" />
        <Container sx={{ p: 5 }}>
          <Typography
            variant="h2"
            sx={{ fontWeight: "bold", textAlign: "center" }}
          >
            Texas UIL 3rd-6th Grade
          </Typography>
          <Typography variant="h3" sx={{ textAlign: "center" }}>
            Music Memory Game
          </Typography>
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

          <Container>
            <Grid
              container
              sx={{ gap: 2, mt: 5 }}
              spacing={2}
              alignItems="center"
              justifyContent="center"
            >
              {MUSIC_MEMORY_PIECES.map((item, i) => (
                <GameCard
                  key={i}
                  item={item}
                  onClick={() => handleCardClick(i, item)}
                />
              ))}
            </Grid>
          </Container>
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
              <Tooltip title="About me">
                <ActionButton title="About me" onClick={handleAboutMeClick}>
                  <WaveIcon />
                </ActionButton>
              </Tooltip>
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
              <Tooltip title="Buy me a coffee!">
                <ActionButton
                  title="Buy me a coffee!"
                  onClick={handleBuyMeACoffeeClick}
                >
                  <CoffeeIcon />
                </ActionButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Stack>
      </>
    );
  }

  return (
    <>
      <OverlayComponent imageUrl={item[0]?.url} text="placeholder" />
      <Container sx={{ p: 5 }}>
        <Typography
          variant="body1"
          sx={{ fontWeight: "bold", textAlign: "center" }}
        >
          Texas UIL 3rd-6th Grade
        </Typography>
        <Typography
          variant="h2"
          sx={{ fontWeight: "bold", textAlign: "center" }}
        >
          Music Memory Game
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: "h6.fontSize",
            fontWeight: "bold",
            textAlign: "center",
            color: "text.secondary",
            mt: 2,
            mb: 2,
          }}
        >
          No sound or need to reset the game? Click this button
        </Typography>
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "primary.dark",
            borderRadius: "50%",
            height: 80,
            width: 80,
            ":hover": {
              boxShadow: 10,
            },
            ":active": { boxShadow: 0 },
          }}
          onClick={handleNoSoundButtonClick}
        >
          {/* SVG Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="192"
            height="192"
            fill="#ffffff"
            viewBox="0 0 256 256"
          >
            <rect width="256" height="256" fill="none"></rect>
            <polyline
              points="176.2 99.7 224.2 99.7 224.2 51.7"
              fill="none"
              stroke="#ffffff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="24"
            ></polyline>
            <path
              d="M65.8,65.8a87.9,87.9,0,0,1,124.4,0l34,33.9"
              fill="none"
              stroke="#ffffff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="24"
            ></path>
            <polyline
              points="79.8 156.3 31.8 156.3 31.8 204.3"
              fill="none"
              stroke="#ffffff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="24"
            ></polyline>
            <path
              d="M190.2,190.2a87.9,87.9,0,0,1-124.4,0l-34-33.9"
              fill="none"
              stroke="#ffffff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="24"
            ></path>
          </svg>
        </Container>

        {/* Styled Counters */}
        <Box sx={{ mt: 4, display: "flex", justifyContent: "center", gap: 4 }}>
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

        <Container>
          <Grid
            container
            sx={{ gap: 2, mt: 5 }}
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            {MUSIC_MEMORY_PIECES.map((item, i) => (
              <GameCard
                key={i}
                item={item}
                onClick={() => handleCardClick(i, item)}
              />
            ))}
          </Grid>
          {StyledYouTube(currentPiece.youtube, false)}
        </Container>
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
            <Tooltip title="About me">
              <ActionButton title="About me" onClick={handleAboutMeClick}>
                <WaveIcon />
              </ActionButton>
            </Tooltip>
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
            <Tooltip title="Buy me a coffee!">
              <ActionButton
                title="Buy me a coffee!"
                onClick={handleBuyMeACoffeeClick}
              >
                <CoffeeIcon />
              </ActionButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Stack>
    </>
  );
}

export default App;
