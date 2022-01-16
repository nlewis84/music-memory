import './App.css';
import React from "react";
import { Container, Typography } from '@mui/material';
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
    <Container sx={{ p: 5 }}>
      <Typography variant='h1' style={{textAlign: 'center'}}>Texas UIL 3rd Grade</Typography>
      <Typography variant='h2' style={{textAlign: 'center'}}>Music Memory Game</Typography>
      <div className="cards">
        {MUSIC_MEMORY_PIECES.map((item, i) => { 
          return <div className="card" key={i} onClick={(e) => correctPiece(e, item)}>
            {item.majorWork 
              ? 
              <div>
                  <h3 style={{color: 'lightyellow'}}>{item.majorWork}</h3>
                  <h3 style={{color: 'white'}}>{item.selection}</h3>
                </div>
              :
              <h3 style={{color: 'lightyellow'}}>{item.selection}</h3>
            }
            <h3 style={{color: 'firebrick'}}>{item.composer}</h3>
            </div>
        })}
      </div>
    </Container>
  );
    console.log(item[0].url)
    
  return (
    <Container sx={{ p: 5 }}>
      <div className="header"></div>
      <div id="overlay" className="overlay absolute">
        <img className="image" src={item[0].url} alt='cat gif' />
        <Typography variant='h1' id="reply" className="child">placeholder</Typography>
      </div>
      {styledYouTube(currentPiece.youtube)}
      <Typography variant='h1' style={{textAlign: 'center'}}>Texas UIL 3rd Grade</Typography>
      <Typography variant='h2' style={{textAlign: 'center'}}>Music Memory Game</Typography>
      <div className="cards">
        {MUSIC_MEMORY_PIECES.map((item, i) => {
          return <div className="card" key={i} onClick={(e) => correctPiece(e, item)}>
            {item.majorWork 
              ? 
                <div>
                  <h3 style={{color: 'lightyellow'}}>{item.majorWork}</h3>
                  <h3 style={{color: 'white'}}>{item.selection}</h3>
                </div>
              :
                <h3 style={{color: 'lightyellow'}}>{item.selection}</h3>
            }
            <h3 style={{color: 'firebrick'}}>{item.composer}</h3>
          </div>
        })}
      </div>
    </Container>
  );

};
}

export default App;
