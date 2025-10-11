import ReactGA from "react-ga";
import MUSIC_MEMORY_PIECES from "./musicSetup";

let onPieceChange = null; // Callback to notify React of changes
let overlayTimeout = null; // Store timeout ID for dismissal

export function setOnPieceChange(callback) {
  onPieceChange = callback;
}

function dismissOverlay() {
  const overlaySelector = document.getElementById("overlay");
  if (overlaySelector) {
    overlaySelector.style.display = "none";
  }
  guess = "";

  // Clear any existing timeout
  if (overlayTimeout) {
    clearTimeout(overlayTimeout);
    overlayTimeout = null;
  }

  // Trigger new piece
  setNewCurrentPiece();
  if (onPieceChange) onPieceChange();
}

function overlay(isCorrect) {
  let reply = document.getElementById("reply");
  reply.innerHTML = guess;
  // Use friendlier, theme-appropriate colors
  isCorrect ? (reply.style.color = "#4ade80") : (reply.style.color = "#fb923c");
  let overlaySelector = document.getElementById("overlay");
  overlaySelector.style.display = "flex";
  overlaySelector.style.cursor = "pointer";

  // Clear any existing timeout
  if (overlayTimeout) {
    clearTimeout(overlayTimeout);
  }

  // Set up click handler for manual dismissal
  overlaySelector.onclick = dismissOverlay;

  // Auto-dismiss after 5 seconds
  overlayTimeout = setTimeout(() => {
    dismissOverlay();
  }, 5000);
}

let guess = "";

// Helper function to filter pieces based on the selected grade in localStorage
function getFilteredPieces() {
  const selectedGrade = localStorage.getItem("selectedGrade") || "3rd-6th";

  return MUSIC_MEMORY_PIECES.filter((piece) =>
    selectedGrade === "2nd"
      ? piece.grade === "2"
      : piece.grade === "all" || piece.grade === "2"
  );
}

// Select a random item from the filtered array (excluding current piece)
function setNewCurrentPiece() {
  const filteredPieces = getFilteredPieces();

  // If only one piece available, keep it (edge case)
  if (filteredPieces.length <= 1) {
    currentPiece = filteredPieces[0];
    return;
  }

  // Filter out the current piece to avoid repetition
  const availablePieces = filteredPieces.filter(
    (piece) => piece !== currentPiece
  );

  // Select random piece from remaining options
  currentPiece =
    availablePieces[Math.floor(Math.random() * availablePieces.length)];
}

// Initialize currentPiece on load
let currentPiece = null;
setNewCurrentPiece();

function correctPiece(item) {
  if (item !== currentPiece) {
    ReactGA.event({
      category: "Wrong Guess",
      action: "Clicked",
    });

    // Create structured HTML for better styling
    const majorWork = currentPiece?.majorWork
      ? `<div style="font-family: 'Poppins', sans-serif; font-size: 1.5rem; margin-top: 1rem; line-height: 1.3;">${currentPiece.majorWork}</div>`
      : "";
    const selection = `<div style="font-family: 'Open Sans', sans-serif; font-size: 1.2rem; font-weight: 600; margin-top: 0.5rem;">${currentPiece.selection}</div>`;
    const composer = `<div style="font-family: 'Poppins', sans-serif; font-size: 1rem; font-weight: 700; margin-top: 1rem; opacity: 0.9;">${currentPiece.composer}</div>`;

    guess = `<div style="font-family: 'Poppins', sans-serif; font-size: 2.5rem; font-weight: 700; margin-bottom: 1.5rem;">Oh no!</div>
            <div style="font-family: 'Open Sans', sans-serif; font-size: 1.1rem; font-weight: 500; margin-bottom: 0.5rem; opacity: 0.9;">This was actually:</div>
            ${majorWork}${selection}${composer}`;
    overlay(false);

    return false; // Return false for an incorrect answer
  }

  ReactGA.event({
    category: "Correct Guess",
    action: "Clicked",
  });
  guess = `<div style="font-family: 'Poppins', sans-serif;">GREAT JOB!</div>`;
  overlay(true);

  return true; // Return true for a correct answer
}

export { currentPiece, correctPiece };
