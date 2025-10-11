import React from "react";
import YouTube from "react-youtube";

function StyledYouTube(id, mobile) {
  let array = [
    0.1, 0.14, 0.21, 0.28, 0.35, 0.42, 0.49, 0.56, 0.63, 0.7, 0.77, 0.8, 0.83,
  ];
  let randomTime = Math.floor(Math.random() * 13);
  let isUnMuted = true;

  const checkElapsedTime = (e) => {
    const duration = e.target.getDuration();

    if (e.target.isMuted() && e.target.getPlayerState() === 1 && isUnMuted) {
      e.target.unMute();
      // These videos are too loud, so we need to turn down the volume
      id === "j2AwPl_lc8o" ? e.target.setVolume(50) : e.target.setVolume(75);
      // These videos are too quiet, so we need to turn up the volume
      id === "lLjwkamp3lI" ? e.target.setVolume(100) : e.target.setVolume(75);
      id === "OOvyjk8qgRQ" ? e.target.setVolume(100) : e.target.setVolume(75);
      id === "9gn-kJ_IOJU" ? e.target.setVolume(125) : e.target.setVolume(75);
      id === "hEOjMfBYhCY" ? e.target.setVolume(100) : e.target.setVolume(75);
      id === "8-rKxGZSRKk" ? e.target.setVolume(125) : e.target.setVolume(75);
      id === "KObrPaWM_dE" ? e.target.setVolume(125) : e.target.setVolume(75);
      id === "Szdziw4tI9o" ? e.target.setVolume(100) : e.target.setVolume(75);
      e.target.seekTo(duration * array[randomTime]);
      e.target.playVideo(); // resume playback
      isUnMuted = false; // you want to run this once only!
      // change the opts.height to 0 to hide the video
      if (mobile) {
        e.target.setSize(0, 0);
      }
    }
  };

  const opts = {
    height: mobile ? "100%" : "0",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: mobile ? 0 : 1,
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
