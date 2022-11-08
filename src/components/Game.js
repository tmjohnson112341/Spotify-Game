import React, { useEffect, useState, useHistory } from "react";
import fetchFromSpotify, { request } from "../services/api";
import Win from "./Win";
import Lose from "./Lose";
import ReactAudioPlayer from "react-audio-player";


const AUTH_ENDPOINT =
  "https://nuod0t2zoe.execute-api.us-east-2.amazonaws.com/FT-Classroom/spotify-auth-token";
const TOKEN_KEY = "whos-who-access-token";

const Game = () => {
  const [artists, setArtists] = useState([]);
  const [songs, setSongs] = useState([]);
  const [authLoading, setAuthLoading] = useState(false);
  const [configLoading, setConfigLoading] = useState(false);
  const [token, setToken] = useState("");
  const [winningArtist, setWinningArtist] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loseOpen, setLoseOpen] = useState(false);
  const [genre, setGenre] = useState(JSON.parse(localStorage.getItem("genre")));
  const [artistNum, setArtistNum] = useState(
    JSON.parse(localStorage.getItem("artist"))
  );
  const [songNum, setSongNum] = useState(
    JSON.parse(localStorage.getItem("song"))
  );

  const num = songNum.song;
  const imgNum = artistNum.artist;
  let randomOffset = Math.floor(Math.random() * 100);

  const randomIndex = function () {
    return Math.floor(Math.random() * imgNum);
  };

  const random = randomIndex();

  const loadData = async (t) => {
    setConfigLoading(true);
    const response = await fetchFromSpotify({
      token: t,
      endpoint: `search?q=genre%3A%22${genre.genre}%22&type=artist&market=ES&offset=${randomOffset}`,
    });

    let data = await response.artists.items[random].id;

    setArtists(response.artists.items);
    setWinningArtist(response.artists.items[random]);

    const response2 = await fetchFromSpotify({
      token: t,
      endpoint: `artists/${data}/top-tracks?market=US`,
    });

    let data2 = await response2.tracks;

    setSongs(data2.filter((song) => song.preview_url != null));
    setConfigLoading(false);
  };
console.log(songs)


  useEffect(() => {
    setAuthLoading(true);
    const storedTokenString = localStorage.getItem(TOKEN_KEY);
    if (storedTokenString) {
      const storedToken = JSON.parse(storedTokenString);
      if (storedToken.expiration > Date.now()) {
        console.log("Token found in localstorage");
        setAuthLoading(false);
        setToken(storedToken.value);
        loadData(storedToken.value);
        return;
      }
    }
    console.log("Sending request to AWS endpoint");
    request(AUTH_ENDPOINT).then(({ access_token, expires_in }) => {
      const newToken = {
        value: access_token,
        expiration: Date.now() + (expires_in - 20) * 1000,
      };
      localStorage.setItem(TOKEN_KEY, JSON.stringify(newToken));
      setAuthLoading(false);
      setToken(newToken.value);
      loadData(newToken.value);
    });
  }, []);


  if (authLoading || configLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <div className="cardContainer">
          {artists.length > imgNum
            ? artists.slice(0, imgNum).map((artist) => (
                <div
                  className="artistCard"
                  key={artist.id}
                  onClick={() => {
                    artist.id == winningArtist.id
                      ? setIsOpen(true)
                      : setLoseOpen(true);
                  }}
                >
                  <img src={artist.images[0].url} />
                  <p>{artist.name}</p>
                </div>
              ))
            : "No Images to display"}
        </div>
      </div>
      <div className="buttonContainer">
        {songs.length > 0 ? (
          songs
            .slice(0, num)
            .map((song) => (
              <ReactAudioPlayer
                key={song.id}
                src={song.preview_url}
                autoPlay={false}
                controls
              />
            ))
        ) : (
          <button onClick={() => window.location.reload()}>
            No Songs for this Artist: Try again?
          </button>
        )}
      </div>
      {isOpen && <Win setIsOpen={setIsOpen} />}
      {loseOpen && (
        <Lose setLoseOpen={setLoseOpen} correct={winningArtist.name} />
      )}
      <div></div>
    </div>
  );
};
export default Game;
