import YouTube from 'react-youtube';

function styledYouTube(id) {
  let array = [20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150]
  let randomTime = Math.floor(Math.random() * 14);  
  const opts = {
    height: '0',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      enablejsapi: 1,
      start: array[randomTime],
    },
  };
  
  return <YouTube videoId={id} opts={opts} />;
}

export default styledYouTube;