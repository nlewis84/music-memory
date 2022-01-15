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
    console.log(process.env.REACT_APP_CAT_API_KEY)
		// eslint-disable-next-line no-undef
		fetch(`https://thecatapi.com/v1/images?api_key=${process.env.REACT_APP_CAT_API_KEY}`)
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

  if (!DataisLoaded)
    return (
      <>
        <div className="center">
            <h1 style={{textAlign: 'center'}}>Jackson's</h1>
            <h2 style={{textAlign: 'center'}}>Music Memory Game</h2>
        </div>
        <div className="cards">
          {MUSIC_MEMORY_PIECES.map((item, i) => { 
            return <div className="card" key={i} onClick={(e) => correctPiece(e, item)}>
              {item.majorWork 
                ? 
                  <div>
                    <h1 style={{color: 'lightyellow'}}>{item.majorWork}</h1>
                    <h2 style={{color: 'white'}}>{item.selection}</h2>
                  </div>
                :
                  <h1 style={{color: 'lightyellow'}}>{item.selection}</h1>
              }
              <h2 style={{color: 'firebrick'}}>{item.composer}</h2>
              </div>
          })}
        </div>
      </>
    );

    return (
      <>
        <div className="header"></div>
        <div id="overlay" className="overlay absolute">
          <img src={item.message} alt='dog' />
          <h1 id="reply" className="child">placeholder</h1>
        </div>
        {styledYouTube(currentPiece.youtube)}
        <div className="center">
          <h1 style={{textAlign: 'center'}}>Jackson's</h1>
          <h2 style={{textAlign: 'center'}}>Music Memory Game</h2>
        </div>
        <div className="cards">
          {MUSIC_MEMORY_PIECES.map((item, i) => {
            return <div className="card" key={i} onClick={(e) => correctPiece(e, item)}>
              {item.majorWork 
                ? 
                  <div>
                    <h1 style={{color: 'lightyellow'}}>{item.majorWork}</h1>
                    <h2 style={{color: 'white'}}>{item.selection}</h2>
                  </div>
                :
                  <h1 style={{color: 'lightyellow'}}>{item.selection}</h1>
              }
              <h2 style={{color: 'firebrick'}}>{item.composer}</h2>
            </div>
          })}
        </div>
      </>
    );

};
}

export default App;
