import './App.css';
import React from "react";
import { Box, Card, CardContent, Container, Grid, Paper, Skeleton, Stack, Typography } from '@mui/material';
import { currentPiece, correctPiece } from './helpers/helperFunctions';
import MUSIC_MEMORY_PIECES from './helpers/musicSetup';
import styledYouTube from './helpers/styledYouTube';

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
		fetch('https://api.thecatapi.com/v1/images/search?mime_types=gif&?size=small&?limit=1', {
      method: 'GET',
      headers: {
        'x-api-key': process.env.REACT_APP_CAT_API_KEY,
      }
    })
      
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
  if (!DataisLoaded || !currentPiece?.youtube)
  return (
    <>
      <Paper
        id="overlay"
        className="overlay"
        sx={{ display: 'none', backgroundColor: '#000000ee'}}
        component={Stack}
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}>
        <Box component={Stack} direction="column" justifyContent="center" alignItems="center" spacing={5}>
          <Typography variant='body1' sx={{ fontWeight: 'bold' }} id="reply">placeholder</Typography>
        </Box>
      </Paper>
      <Container sx={{ p: 5 }}>
        <Typography variant='h1' sx={{ fontWeight: 'bold', textAlign: 'center'}}>Texas UIL 3rd Grade</Typography>
        <Typography variant='h2' sx={{ textAlign: 'center'}}>Music Memory Game</Typography>
        <Container>
          <Grid container sx={{ gap: 2, mt: 5 }} spacing={2} alignItems="center" justifyContent="center">
            {new Array(16).fill().map((item, i) => {
              return <Card key={i} sx={{ backgroundColor: 'primary.dark', borderRadius: 2, height: 160, width: 160, ':hover': {
                boxShadow: 10,
              }, }}  variant="outlined" style={{ textDecoration: 'none' }}>
                <CardContent>
                  <Typography variant='body1' sx={{ color: 'text.tertiary', fontWeight: 'bold', textAlign: 'center' }}><Skeleton animation="wave" /></Typography>
                  <Typography variant='body1' sx={{ color: 'text.disabled', textAlign: 'center' }}><Skeleton animation="wave" /></Typography>
                </CardContent>
              </Card>
            })}
          </Grid>
        </Container>
      </Container>
    </>
  );
    console.log(item[0].url)
    
  return (
    <>
      <Paper
        id="overlay"
        className="overlay"
        sx={{ display: 'none', backgroundColor: '#000000ee'}}
        component={Stack}
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}>
        <Box component={Stack} direction="column" justifyContent="center" alignItems="center" spacing={5}>
          <img className="image" src={item[0].url} alt='cat gif' />
          <Typography variant='body1' sx={{ fontWeight: 'bold' }} id="reply">placeholder</Typography>
        </Box>
      </Paper>
      <Container sx={{ p: 5 }}>
        <Typography variant='h1' sx={{ fontWeight: 'bold', textAlign: 'center'}}>Texas UIL 3rd Grade</Typography>
        <Typography variant='h2' sx={{ textAlign: 'center'}}>Music Memory Game</Typography>
        <Container>
          <Grid container sx={{ gap: 2, mt: 5 }} spacing={2} alignItems="center" justifyContent="center">
            {MUSIC_MEMORY_PIECES.map((item, i) => {
              return <Card key={i} sx={{ backgroundColor: 'primary.dark', borderRadius: 2, height: 160, width: 160, ':hover': {
                boxShadow: 10,
              }, }}  variant="outlined" style={{ textDecoration: 'none' }} onClick={(e) => correctPiece(e, item)}>
                <CardContent>
                  {item.majorWork
                    ?
                    <>
                        <Typography variant='body1' sx={{ color: 'text.tertiary', fontWeight: 'bold', textAlign: 'center' }}>{item.majorWork}</Typography>
                        <Typography variant='body1' sx={{ color: 'text.tertiary', fontWeight: 'bold', textAlign: 'center' }}>{item.selection}</Typography>
                      </>
                    :
                    <Typography variant='body1' sx={{ color: 'text.tertiary', fontWeight: 'bold', textAlign: 'center' }}>{item.selection}</Typography>
                  }
                  <Typography variant='body1' sx={{ color: 'text.disabled', textAlign: 'center' }}>{item.composer}</Typography>
                </CardContent>
              </Card>
            })}
          </Grid>
          {styledYouTube(currentPiece.youtube)}
        </Container>
      </Container>
    </>
  );

};
}

export default App;
