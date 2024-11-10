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

// Helper function to filter pieces based on the selected grade in localStorage
function getFilteredPieces() {
  const selectedGrade = localStorage.getItem('selectedGrade') || '3rd-6th';

  console.log('number of pieces: ', MUSIC_MEMORY_PIECES.filter((piece) =>
    selectedGrade === '2nd' ? piece.grade === '2' : piece.grade === 'all' || piece.grade === '2'
  ).length);
  return MUSIC_MEMORY_PIECES.filter((piece) =>
    selectedGrade === '2nd' ? piece.grade === '2' : piece.grade === 'all' || piece.grade === '2'
  );
}

// Select a random item from the filtered array
function setNewCurrentPiece() {
  const filteredPieces = getFilteredPieces();
  currentPiece = filteredPieces[Math.floor(Math.random() * filteredPieces.length)];
}

// Initialize currentPiece on load
let currentPiece = null;
setNewCurrentPiece();

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
