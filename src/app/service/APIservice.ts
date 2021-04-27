export const API = (parm1 = null, parm2 = null, parm3 = null) => {
  const API_URL = "https://www.googleapis.com/youtube/v3";
  const API_TOKEN = "AIzaSyAVhFErb9e4vs65w8pnBiOu_WKaqddmZiE";
  const APis = {
    getChannelVideos: `${API_URL}/search?q=7clouds&key=${API_TOKEN}&part=snippet&type=video&maxResults=${parm1}`,
    getVideosDetails: `${API_URL}/videos?part=statistics%2C+snippet%2C+contentDetails&id=${parm1}&key=${API_TOKEN}`,
  };
  return APis;
};
