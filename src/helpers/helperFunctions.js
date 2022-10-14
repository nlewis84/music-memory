import MUSIC_MEMORY_PIECES from './musicSetup';

function overlay(boolean) {
  let reply = document.getElementById('reply');
  reply.innerHTML = guess;
  boolean ? reply.style.color = 'green' : reply.style.color = 'red';
  let overlaySelector = document.getElementById("overlay");
  overlaySelector.style.display = 'flex';
}

let guess = ''

// select a random item from the array MUSIC_MEMORY_PIECES
let currentPiece = MUSIC_MEMORY_PIECES[Math.floor(Math.random() * MUSIC_MEMORY_PIECES.length)];

function correctPiece(e, item) {
  if (item !== currentPiece) {
    guess = `Oh no! This was actually ${currentPiece?.majorWork || ''} ${currentPiece.selection} by ${currentPiece.composer}`
    overlay(false); 
  
    return setTimeout(function() {
      guess = ''
      window.location.reload(true)
    }, 5000);
  }
  guess = `GREAT JOB!!!`
  overlay(true);

  return setTimeout(function() {
    guess = ''
    window.location.reload(true)
  }, 5000);
}

export {currentPiece, correctPiece };