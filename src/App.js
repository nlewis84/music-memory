import "./App.css";
import React, { useState, useEffect } from "react";
import ReactGA from "react-ga";
import {
  Box,
  Card,
  CardContent,
  Container,
  Fab,
  Grid,
  Paper,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { isMobile } from "react-device-detect";
import { currentPiece, correctPiece } from "./helpers/helperFunctions";
import MUSIC_MEMORY_PIECES from "./helpers/musicSetup";
import StyledYouTube from "./helpers/styledYouTube";

function App() {
  const [item, setItem] = useState([]);
  const [DataisLoaded, setDataisLoaded] = useState(false);
  const [correctCount, setCorrectCount] = useState(
    () => parseInt(localStorage.getItem("correctCount")) || 0
  );
  const [incorrectCount, setIncorrectCount] = useState(
    () => parseInt(localStorage.getItem("incorrectCount")) || 0
  );

  const handleCardClick = (index, item) => {
    const isCorrect = correctPiece(null, item); // Adjust the return value of `correctPiece` if necessary

    if (isCorrect) {
      const newCorrectCount = correctCount + 1;
      setCorrectCount(newCorrectCount);
      localStorage.setItem("correctCount", newCorrectCount); // Save to localStorage
    } else {
      const newIncorrectCount = incorrectCount + 1;
      setIncorrectCount(newIncorrectCount);
      localStorage.setItem("incorrectCount", newIncorrectCount); // Save to localStorage
    }
  };

  useEffect(() => {
    fetch(
      "https://api.thecatapi.com/v1/images/search?mime_types=gif&?size=small&?limit=1",
      {
        method: "GET",
        headers: {
          "x-api-key": process.env.REACT_APP_CAT_API_KEY,
        },
      }
    )
      .then((res) => res.json())
      .then((json) => {
        setItem(json);
        setDataisLoaded(true);
      });
  }, []);

  if (!DataisLoaded || !currentPiece?.youtube) {
    return (
      <>
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
          >
            <Typography
              variant="h4"
              sx={{
                fontSize: "h4.fontSize",
                fontWeight: "bold",
                textAlign: "center",
              }}
              id="reply"
            >
              placeholder
            </Typography>
          </Box>
        </Paper>
        <Container sx={{ p: 5 }}>
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", textAlign: "center" }}
          >
            Texas UIL 3rd-6th Grade
          </Typography>
          <Typography variant="h2" sx={{ fontWeight: "bold", textAlign: "center" }}>
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
            onClick={() => window.location.reload()}
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
            <img className="image" src={item[0].url} alt="cat gif" />
            <Typography
              variant="h4"
              sx={{
                fontSize: "h4.fontSize",
                fontWeight: "bold",
                textAlign: "center",
              }}
              id="reply"
            >
              placeholder
            </Typography>
          </Box>
        </Paper>
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
            <Typography
              variant="h6"
              sx={{
                backgroundColor: "#d4edda",
                color: "#155724",
                border: "1px solid #c3e6cb",
                borderRadius: "4px",
                padding: "5px 15px",
                fontWeight: "bold",
              }}
            >
              Correct Answers: {correctCount}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                backgroundColor: "#f8d7da",
                color: "#721c24",
                border: "1px solid #f5c6cb",
                borderRadius: "4px",
                padding: "5px 15px",
                fontWeight: "bold",
              }}
            >
              Incorrect Answers: {incorrectCount}
            </Typography>
          </Box>

          <Container>
            <Grid
              container
              sx={{ gap: 2, mt: 5 }}
              spacing={2}
              alignItems="center"
              justifyContent="center"
            >
              {MUSIC_MEMORY_PIECES.map((item, i) => {
                return (
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
                      ":active": { boxShadow: 0 },
                    }}
                    variant="outlined"
                    style={{ textDecoration: "none" }}
                    onClick={() => handleCardClick(i, item)}
                  >
                    <CardContent>
                      {item.majorWork ? (
                        <>
                          <Typography
                            variant="h6"
                            sx={{
                              color: "text.tertiary",
                              fontWeight: "bold",
                              textAlign: "center",
                            }}
                          >
                            {item.majorWork}
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{
                              color: "text.primary",
                              fontWeight: "regular",
                              textAlign: "center",
                            }}
                          >
                            {item.selection}
                          </Typography>
                        </>
                      ) : (
                        <Typography
                          variant="body1"
                          sx={{
                            color: "text.primary",
                            fontWeight: "regular",
                            textAlign: "center",
                          }}
                        >
                          {item.selection}
                        </Typography>
                      )}
                      <Typography
                        variant="body1"
                        sx={{ color: "text.disabled", textAlign: "center" }}
                      >
                        {item.composer}
                      </Typography>
                    </CardContent>
                  </Card>
                );
              })}
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
                <Fab
                  color="primary"
                  aria-label="about"
                  onClick={() => {
                    ReactGA.event({
                      category: "About Me",
                      action: "Clicked",
                    });
                    window.open("https://nathanlewis.dev/about");
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="#ffffff"
                    viewBox="0 0 256 256"
                  >
                    <rect width="256" height="256" fill="none"></rect>
                    <path
                      d="M158.6,93.3a20,20,0,0,1,34.7-20l20,34.7A80,80,0,0,1,74.7,188l-42-72.8a20,20,0,0,1,34.7-20l-16-27.7A20,20,0,0,1,86,47.5l8,13.9a20,20,0,0,1,34.6-20Z"
                      opacity="0.2"
                    ></path>
                    <path
                      d="M94,61.4a20,20,0,0,1,34.6-20l30,51.9"
                      fill="none"
                      stroke="#ffffff"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="16"
                    ></path>
                    <path
                      d="M67.4,95.2l-16-27.7A20,20,0,0,1,86,47.5l34,58.9"
                      fill="none"
                      stroke="#ffffff"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="16"
                    ></path>
                    <path
                      d="M154,165.3a39.9,39.9,0,0,1,14.6-54.6l-10-17.4a20,20,0,0,1,34.7-20l20,34.7A80,80,0,0,1,74.7,188l-42-72.8a20,20,0,0,1,34.7-20l22,38.1"
                      fill="none"
                      stroke="#ffffff"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="16"
                    ></path>
                    <path
                      d="M81.1,240A110.3,110.3,0,0,1,48,204"
                      fill="none"
                      stroke="#ffffff"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="16"
                    ></path>
                    <path
                      d="M176,31a51.7,51.7,0,0,1,45,26"
                      fill="none"
                      stroke="#ffffff"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="16"
                    ></path>
                  </svg>
                </Fab>
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
                <Fab
                  color="primary"
                  aria-label="add"
                  onClick={() => {
                    ReactGA.event({
                      category: "Buy me a coffee",
                      action: "Clicked",
                    });
                    window.open("https://account.venmo.com/u/Nathan-Lewis-35");
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="#000000"
                    viewBox="0 0 256 256"
                  >
                    <rect width="48" height="48" fill="none"></rect>
                    <path
                      d="M83.3,216A88,88,0,0,1,32,136V88H208v48a88,88,0,0,1-51.3,80Z"
                      opacity="0.2"
                    ></path>
                    <line
                      x1="88"
                      y1="24"
                      x2="88"
                      y2="56"
                      fill="none"
                      stroke="#FFFFFF"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="16"
                    ></line>
                    <line
                      x1="120"
                      y1="24"
                      x2="120"
                      y2="56"
                      fill="none"
                      stroke="#FFFFFF"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="16"
                    ></line>
                    <line
                      x1="152"
                      y1="24"
                      x2="152"
                      y2="56"
                      fill="none"
                      stroke="#FFFFFF"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="16"
                    ></line>
                    <line
                      x1="32"
                      y1="216"
                      x2="208"
                      y2="216"
                      fill="none"
                      stroke="#FFFFFF"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="16"
                    ></line>
                    <path
                      d="M83.3,216A88,88,0,0,1,32,136V88H208v48a88,88,0,0,1-51.3,80"
                      fill="none"
                      stroke="#FFFFFF"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="16"
                    ></path>
                    <path
                      d="M208,88h0a32,32,0,0,1,32,32v8a32,32,0,0,1-32,32h-3.4"
                      fill="none"
                      stroke="#FFFFFF"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="16"
                    ></path>
                  </svg>
                </Fab>
              </Tooltip>
            </Grid>
          </Grid>
        </Stack>
      </>
    );
  }

  return (
    <>
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
          <img className="image" src={item[0]?.url} alt="cat gif" />
          <Typography
            variant="h4"
            sx={{
              fontSize: "h4.fontSize",
              fontWeight: "bold",
              textAlign: "center",
            }}
            id="reply"
          >
            placeholder
          </Typography>
        </Box>
      </Paper>
      <Container sx={{ p: 5 }}>
        <Typography
          variant="body1"
          sx={{ fontWeight: "bold", textAlign: "center" }}
        >
          Texas UIL 3rd-6th Grade
        </Typography>
        <Typography variant="h2" sx={{ fontWeight: "bold", textAlign: "center" }}>
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
          onClick={() => {
            ReactGA.event({
              category: "No Sound Button",
              action: "Clicked",
            });
            localStorage.removeItem("correctCount");
            localStorage.removeItem("incorrectCount");
            window.location.reload();
          }}
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
          <Typography
            variant="h6"
            sx={{
              backgroundColor: "#d4edda",
              color: "#155724",
              border: "1px solid #c3e6cb",
              borderRadius: "4px",
              padding: "5px 15px",
              fontWeight: "bold",
            }}
          >
            Correct Answers: {correctCount}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              backgroundColor: "#f8d7da",
              color: "#721c24",
              border: "1px solid #f5c6cb",
              borderRadius: "4px",
              padding: "5px 15px",
              fontWeight: "bold",
            }}
          >
            Incorrect Answers: {incorrectCount}
          </Typography>
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
                  ":active": { boxShadow: 0 },
                }}
                variant="outlined"
                style={{ textDecoration: "none" }}
                onClick={() => handleCardClick(i, item)}
              >
                <CardContent>
                  {item.majorWork ? (
                    <>
                      <Typography
                        variant="h6"
                        sx={{
                          color: "text.tertiary",
                          fontWeight: "bold",
                          textAlign: "center",
                        }}
                      >
                        {item.majorWork}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: "text.primary",
                          fontWeight: "regular",
                          textAlign: "center",
                        }}
                      >
                        {item.selection}
                      </Typography>
                    </>
                  ) : (
                    <Typography
                      variant="body1"
                      sx={{
                        color: "text.primary",
                        fontWeight: "regular",
                        textAlign: "center",
                      }}
                    >
                      {item.selection}
                    </Typography>
                  )}
                  <Typography
                    variant="body1"
                    sx={{ color: "text.disabled", textAlign: "center" }}
                  >
                    {item.composer}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Grid>
          {StyledYouTube(currentPiece.youtube, false)}
        </Container>
      </Container>
    </>
  );
}

export default App;
