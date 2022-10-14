import React from 'react';
import YouTube from 'react-youtube';

function StyledYouTube(id) {
  let array = [
    0.07, 0.14, 0.21, 0.28, 0.35, 0.42, 0.49, 0.56, 0.63, 0.7, 0.77, 0.84, 0.91,
  ];
  let randomTime = Math.floor(Math.random() * 13);
  let isUnMuted = true;

  const checkElapsedTime = (e) => {
    const duration = e.target.getDuration();

    if (e.target.isMuted() && e.target.getPlayerState() === 1 && isUnMuted) {
      e.target.unMute();
      // Sing, Sing, Sing, Vivaldi, and Barber of Seville are REALLY loud.....turn it down
      id === 'HDsWyXIR1to' || id === 'JhLxK2xGqqo' || id === 'IVyRd9mlGyQ'? e.target.setVolume(50) : e.target.setVolume(75);
      e.target.seekTo(duration * array[randomTime]);
      e.target.playVideo(); // resume playback
      isUnMuted = false; // you want to run this once only!
    }
  };

  const opts = {
    height: '0',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      mute: 1,
      enablejsapi: 1,
      start: array[randomTime],
      playsinline: 1,
    },
  };

  return (
    <YouTube
      videoId={id}
      opts={opts}
      onStateChange={(e) => checkElapsedTime(e)}
    />
  );
}

export default StyledYouTube;
