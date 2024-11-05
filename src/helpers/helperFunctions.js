import ReactGA from 'react-ga';
import MUSIC_MEMORY_PIECES from './musicSetup';

function overlay(isCorrect) {
  let reply = document.getElementById('reply');
  reply.innerHTML = guess;
  isCorrect ? (reply.style.color = 'green') : (reply.style.color = 'red');
  let overlaySelector = document.getElementById('overlay');
  overlaySelector.style.display = 'flex';

  setTimeout(() => {
    overlaySelector.style.display = 'none';
    guess = '';
  }, 5000);
}

let guess = '';

// Select a random item from the array MUSIC_MEMORY_PIECES
let currentPiece = MUSIC_MEMORY_PIECES[Math.floor(Math.random() * MUSIC_MEMORY_PIECES.length)];

function correctPiece(item) {
  if (item !== currentPiece) {
    ReactGA.event({
      category: 'Wrong Guess',
      action: 'Clicked',
    });
    guess = `Oh no! This was actually ${currentPiece?.majorWork || ''} ${currentPiece.selection} by ${currentPiece.composer}`;
    overlay(false);

    setTimeout(function () {
      guess = '';
      window.location.reload(true);
    }, 5000);

    return false; // Return false for an incorrect answer
  }

  ReactGA.event({
    category: 'Correct Guess',
    action: 'Clicked',
  });
  guess = `GREAT JOB!!!`;
  overlay(true);

  setTimeout(function () {
    guess = '';
    window.location.reload(true);
  }, 5000);
  
  return true; // Return true for a correct answer
}

export { currentPiece, correctPiece };
