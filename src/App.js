import './App.css';
import React from "react";
import {MUSIC_MEMORY_PIECES, currentPiece, correctPiece, styledYouTube} from './helpers/helperFunctions'

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
        <div className="center">
            <h1 style={{textAlign: 'center'}}>Texas UIL 3rd Grade</h1>
            <h2 style={{textAlign: 'center'}}>Music Memory Game</h2>
        </div>
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
      </>
    );
    console.log(item[0].url)
    
    return (
      <>
        <div className="header"></div>
        <div id="overlay" className="overlay absolute">
          <img className="image" src={item[0].url} alt='cat gif' />
          <h1 id="reply" className="child">placeholder</h1>
        </div>
        {styledYouTube(currentPiece.youtube)}
        <div className="center">
          <h1 style={{textAlign: 'center'}}>Texas UIL 3rd Grade</h1>
          <h2 style={{textAlign: 'center'}}>Music Memory Game</h2>
        </div>
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
      </>
    );

};
}

export default App;
