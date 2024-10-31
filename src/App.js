import './App.css';
import React, { useState, useEffect } from 'react';
import ReactGA from 'react-ga';
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
} from '@mui/material';
import { isMobile } from 'react-device-detect';
import { currentPiece, correctPiece } from './helpers/helperFunctions';
import MUSIC_MEMORY_PIECES from './helpers/musicSetup';
import StyledYouTube from './helpers/styledYouTube';

function App() {
  const [item, setItem] = useState([]);
  const [DataisLoaded, setDataisLoaded] = useState(false);

  useEffect(() => {
    fetch(
      'https://api.thecatapi.com/v1/images/search?mime_types=gif&?size=small&?limit=1',
      {
        method: 'GET',
        headers: {
          'x-api-key': process.env.REACT_APP_CAT_API_KEY,
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
          sx={{ display: 'none', backgroundColor: '#000000ee' }}
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
                fontSize: 'h4.fontSize',
                fontWeight: 'bold',
                textAlign: 'center',
              }}
              id="reply"
            >
              placeholder
            </Typography>
          </Box>
        </Paper>
        <Container sx={{ p: 5 }}>
          <Typography
            variant="h1"
            sx={{ fontWeight: 'bold', textAlign: 'center' }}
          >
            Texas UIL 3rd-6th Grade
          </Typography>
          <Typography variant="h2" sx={{ textAlign: 'center' }}>
            Music Memory Game
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: 'h6.fontSize',
              fontWeight: 'bold',
              textAlign: 'center',
              color: 'text.secondary',
              mt: 2,
            }}
          >
            Trouble? Click this button
          </Typography>
          <Container
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'primary.dark',
              borderRadius: '50%',
              height: 80,
              width: 80,
              ':hover': {
                boxShadow: 10,
              },
              ':active': { boxShadow: 0 },
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
                    backgroundColor: 'primary.dark',
                    borderRadius: 2,
                    height: 180,
                    width: 180,
                    ':hover': {
                      boxShadow: 10,
                    },
                  }}
                  variant="outlined"
                  style={{ textDecoration: 'none' }}
                >
                  <CardContent>
                    <Typography
                      variant="body1"
                      sx={{
                        color: 'text.tertiary',
                        fontWeight: 'bold',
                        textAlign: 'center',
                      }}
                    >
                      <Skeleton animation="wave" />
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: 'text.disabled', textAlign: 'center' }}
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

  return (
    <>
      <Paper
        id="overlay"
        className="overlay"
        sx={{ display: 'none', backgroundColor: '#000000ee' }}
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
          width={"75%"}
          height={"75%"}
        >
          <img className="image" src={item[0]?.url} alt="cat gif" />
          <Typography
            variant="h4"
            sx={{
              fontSize: 'h4.fontSize',
              fontWeight: 'bold',
              textAlign: 'center',
            }}
            id="reply"
          >
            placeholder
          </Typography>
        </Box>
      </Paper>
      <Container sx={{ p: 5 }}>
        <Typography
          variant="h1"
          sx={{ fontWeight: 'bold', textAlign: 'center' }}
        >
          Texas UIL 3rd-6th Grade
        </Typography>
        <Typography variant="h2" sx={{ textAlign: 'center' }}>
          Music Memory Game
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: 'h6.fontSize',
            fontWeight: 'bold',
            textAlign: 'center',
            color: 'text.secondary',
            mt: 2,
          }}
        >
          No sound? Click this button
        </Typography>
        <Container
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'primary.dark',
            borderRadius: '50%',
            height: 80,
            width: 80,
            ':hover': {
              boxShadow: 10,
            },
            ':active': { boxShadow: 0 },
          }}
          onClick={() => {
            ReactGA.event({
              category: 'No Sound Button',
              action: 'Clicked',
            });
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
                  backgroundColor: 'primary.dark',
                  borderRadius: 2,
                  height: 180,
                  width: 180,
                  ':hover': {
                    boxShadow: 10,
                  },
                  ':active': { boxShadow: 0 },
                }}
                variant="outlined"
                style={{ textDecoration: 'none' }}
                onClick={(e) => correctPiece(e, item)}
              >
                <CardContent>
                  {item.majorWork ? (
                    <>
                      <Typography
                        variant="h6"
                        sx={{
                          color: 'text.tertiary',
                          fontWeight: 'bold',
                          textAlign: 'center',
                        }}
                      >
                        {item.majorWork}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: 'text.primary',
                          fontWeight: 'regular',
                          textAlign: 'center',
                        }}
                      >
                        {item.selection}
                      </Typography>
                    </>
                  ) : (
                    <Typography
                      variant="body1"
                      sx={{
                        color: 'text.primary',
                        fontWeight: 'regular',
                        textAlign: 'center',
                      }}
                    >
                      {item.selection}
                    </Typography>
                  )}
                  <Typography
                    variant="body1"
                    sx={{ color: 'text.disabled', textAlign: 'center' }}
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
