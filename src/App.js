import './App.css';
import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { isMobile } from 'react-device-detect';
import { currentPiece, correctPiece } from './helpers/helperFunctions';
import MUSIC_MEMORY_PIECES from './helpers/musicSetup';
import StyledYouTube from './helpers/styledYouTube';

class App extends React.Component {
  // Constructor
  constructor(props) {
    super(props);

    this.state = {
      item: [],
      DataisLoaded: false,
    };
  }

  componentDidMount() {
    // eslint-disable-next-line no-undef
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
        this.setState({
          item: json,
          DataisLoaded: true,
        });
      });
  }

  render() {
    const { DataisLoaded, item } = this.state;

    if (isMobile) {
      return (
        <div className="App">
          {/* a container that is centered vertically and horizontally */}
          <Container
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100vh',
            }}
          >
            <Grid
              container
              spacing={2}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Grid item xs={12}>
                <Typography
                  variant="h4"
                  component="div"
                  sx={{ flexGrow: 1, textAlign: 'center' }}
                >
                  Due to the limitations of auto play on phones and tablets,
                  this site is designed for use on desktops, laptops, or
                  chromebooks. Basically, Apple and Google have decided to 
                  protect you and your data limits from spammy videos eating 
                  up your data caps.
                </Typography>
              </Grid>
            </Grid>
          </Container>
        </div>
      );
    }

    if (!DataisLoaded || !currentPiece?.youtube)
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
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="24"
                ></polyline>
                <path
                  d="M65.8,65.8a87.9,87.9,0,0,1,124.4,0l34,33.9"
                  fill="none"
                  stroke="#ffffff"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="24"
                ></path>
                <polyline
                  points="79.8 156.3 31.8 156.3 31.8 204.3"
                  fill="none"
                  stroke="#ffffff"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="24"
                ></polyline>
                <path
                  d="M190.2,190.2a87.9,87.9,0,0,1-124.4,0l-34-33.9"
                  fill="none"
                  stroke="#ffffff"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="24"
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
                {new Array(16).fill().map((item, i) => {
                  return (
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
                  );
                })}
              </Grid>
            </Container>
          </Container>
        </>
      );
    console.log(item[0].url);

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
            <img className="image" src={item[0].url} alt="cat gif" />
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
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="24"
              ></polyline>
              <path
                d="M65.8,65.8a87.9,87.9,0,0,1,124.4,0l34,33.9"
                fill="none"
                stroke="#ffffff"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="24"
              ></path>
              <polyline
                points="79.8 156.3 31.8 156.3 31.8 204.3"
                fill="none"
                stroke="#ffffff"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="24"
              ></polyline>
              <path
                d="M190.2,190.2a87.9,87.9,0,0,1-124.4,0l-34-33.9"
                fill="none"
                stroke="#ffffff"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="24"
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
              {MUSIC_MEMORY_PIECES.map((item, i) => {
                return (
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
                );
              })}
            </Grid>
            {StyledYouTube(currentPiece.youtube)}
          </Container>
        </Container>
        <Stack
          sx={{
            position: 'fixed',
            width: '100px',
            bottom: 0,
            right: 75,
            m: 2,
            zIndex: 1,
          }}
          direction="column"
          spacing={2}
        >
          <Typography
            variant="body1"
            sx={{
              textAlign: 'center',
              position: 'absolute',
              bottom: 25,
              left: 0,
              right: 25,
            }}
          >
            <a
              href="https://account.venmo.com/u/Nathan-Lewis-35"
              target="_blank"
              rel="noreferrer"
            >
              ☕️ Buy me a coffee
            </a>
          </Typography>
        </Stack>
      </>
    );
  }
}

export default App;
