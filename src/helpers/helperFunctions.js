import MUSIC_MEMORY_PIECES from './musicSetup';

function overlay(boolean) {
  let reply = document.getElementById('reply');
  reply.innerHTML = guess;
  boolean ? reply.style.color = 'green' : reply.style.color = 'red';
  let overlaySelector = document.getElementById("overlay");
  overlaySelector.style.display = 'flex';
}

let guess = ''

let currentIndex = Math.floor(Math.random() * (16 + 1));
let currentPiece = MUSIC_MEMORY_PIECES[currentIndex];

function correctPiece(e, item) {
  if (item !== currentPiece) {
    guess = `Oh no! This was actually ${currentPiece.composer}'s ${currentPiece?.majorWork || ''} ${currentPiece.selection}`
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