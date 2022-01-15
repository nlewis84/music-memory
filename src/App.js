import './App.css';
import React from "react";
import YouTube from 'react-youtube';

const MUSIC_MEMORY_PIECES = [
  {selection: 'Minuet in G', composer: 'Beethoven', youtube: 'zSXRJwspGU0'},
  {majorWork: 'The Creation', selection: 'The Heavens Are Telling', composer: 'Haydn', youtube: 'OwqqfbinUDY'},
  {majorWork: 'Cello Suite No. 1 in G Major', selection: 'Prelude', composer: 'Bach', youtube: '1prweT95Mo0'},
  {majorWork: 'Symphonie Fantastique', selection: 'March to the Scaffold', composer: 'Berlioz', youtube: 'QwCuFaq2L3U'},
  {selection: 'Short Ride in a Fast Machine', composer: 'Adams', youtube: 'rx9JUyFqTJI'},
  {majorWork: 'Nabucco', selection: 'Va, pensiero', composer: 'Verdi', youtube: 'XObwULrJ5xg'},
  {majorWork: "Young Person's Guide to the Orchestra", selection: 'Fugue', composer: 'Britten', youtube: 'UuRdm9x6LaI'},
  {selection: 'Hungarian Dance No. 5', composer: 'Brahms', youtube: '-HNmVe0Mmek'},
  {majorWork: 'Three Gymnopedies', selection: 'No. 1', composer: 'Satie', youtube: 'S-Xm7s9eGxU'},
  {majorWork: 'West Side Story', selection: 'Dance at the Gym (Mambo)', composer: 'Bernstein', youtube: 'Pqn-lO2QCGc'},
  {majorWork: 'Viola Concerto in G Major', selection: 'Movement 2', composer: 'Telemann', youtube: 'iTbwMis5Xn4'},
  {majorWork: 'Symphony No. 40', selection: 'Movement 1', composer: 'Mozart', youtube: 'BJPmYURJk4c'},
  {selection: "It Don't Mean a Thing If It Ain't Got That Swing", composer: 'Ellington', youtube: 'myRc-3oF1d0'},
  {selection: 'Circus Polka (For a Young Elephant)', composer: 'Stravinksy', youtube: 'kkL9LS2ZfUE'},
  {selection: 'Medalist Fanfare', composer: 'Giroux', youtube: 'tEjso5bweQY'},
  {selection: 'Fanfare for the Common Man', composer: 'Copland', youtube: '9dljTJ9qJ4U'}
]

function overlay() {
  let reply = document.getElementById('reply');
  reply.innerHTML = guess;
  let overlaySelector = document.getElementById("overlay");
  overlaySelector.style.display = 'flex';
}

let guess = ''

let currentIndex = Math.floor(Math.random() * (16 + 1));
let currentPiece = MUSIC_MEMORY_PIECES[currentIndex];

function correctPiece(e, item) {
  if (item !== currentPiece) {
    guess = `Oh no! This was actually ${currentPiece.composer}'s ${currentPiece?.majorWork || ''} ${currentPiece.selection}`
    overlay(); 
    return setTimeout(function() {
      guess = ''
      window.location.reload(true)
    }, 3000);
  }
  guess = `GREAT JOB JACKSON!!!`
  overlay();
  return setTimeout(function() {
    guess = ''
    window.location.reload(true)
  }, 3000);
}

function styledYouTube(id) {
  let array = [30, 150, 20, 200, 70, 90, 100]
  let randomTime = Math.floor(Math.random() * 8);  
  const opts = {
    height: '20',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      enablejsapi: 1,
      start: array[randomTime],
    },
  };

  console.log(array[randomTime])
  
  return <YouTube videoId={id} opts={opts} />;
}

function App() {
if (currentPiece) {
      return (
        <>
        <div className="header"></div>
        <div id="overlay" className="overlay absolute"><h1 id="reply" className="child">placeholder</h1></div>
        {styledYouTube(currentPiece.youtube)}
        <div className="center">
          <h1 style={{textAlign: 'center'}}>Jackson's</h1>
          <h2 style={{textAlign: 'center'}}>Music Memory Game</h2>
        </div>
        <div className="cards">
          {MUSIC_MEMORY_PIECES.map((item, i) => {
            
            return <div className="card" key={i} onClick={(e) => correctPiece(e, item)}>
              {item.majorWork ? <div><h1 style={{color: 'lightyellow'}}>{item.majorWork}</h1><h1 style={{color: 'white'}}>{item.selection}</h1></div> : <h1 style={{color: 'lightyellow'}}>{item.selection}</h1>}
              <h2 style={{color: 'firebrick'}}>{item.composer}</h2>
            </div>
          })}
        </div>
      </>
    );
} else {
    return (
      <>
      
      <div className="center">
          <h1 style={{textAlign: 'center'}}>Jackson's</h1>
          <h2 style={{textAlign: 'center'}}>Music Memory Game</h2>
        </div>
        <div className="cards">
          {MUSIC_MEMORY_PIECES.map((item, i) => {
            
            return <div className="card" key={i} onClick={(e) => correctPiece(e, item)}>
              {item.majorWork ? <div><h1>{item.majorWork}</h1><h1>{item.selection}</h1></div> : <h1>{item.selection}</h1>}
              <h2>{item.composer}</h2>
            </div>
          })}
        </div>
      </>
    )
  }
}

export default App;
