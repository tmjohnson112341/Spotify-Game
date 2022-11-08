import React, { useState, useEffect } from 'react'
import '../index.css'

const Home = () => {
  //const [value, setValue] = useState({genre: "pop", songs: 1, artists: 2});
  const [genre, setGenre] = useState({genre: "pop"});
  const [artist, setArtist] = useState({artist: 2});
  const [song, setSong] = useState({song: 1});

  // useEffect(() => {
  //   setGenre(localStorage.getItem('genre'));
  // }, []);

  const handleChange = (e) => {
   // localStorage.setItem("genre", JSON.stringify(value));
   localStorage.setItem("genre", JSON.stringify(genre));
   localStorage.setItem("artist", JSON.stringify(artist));
   localStorage.setItem("song", JSON.stringify(song));
  };

  const handleGenre = (e) => {
    //setValue({...value, genre: e.target.value})
    setGenre({genre: e.target.value})
    console.log("genre: " + e.target.value)
  };

  const handleArtist = (e) => {
    setArtist({artist: parseInt(e.target.value)})
    console.log("artist: " + e.target.value)
  };

  const handleSong = (e) => {
    setSong({song: parseInt(e.target.value)})
    console.log("song: " + e.target.value)
  };

  return (
    <div id="main-container">
      <h1 style={{fontFamily : 'Poiret One', fontSize: "75px"}}>Who's Who?</h1>
      <div className="menu-container">
        <p>
          Choose a genre, number of songs/guess, and number of artists to guess from!
        </p>
        <form action="/game" onSubmit={handleChange}>
          <span>Genre: </span>
          <select id="mySelect" defaultValue="pop" onChange={handleGenre} required>
            <option value="pop">pop</option>
            <option value="hip-hop">hip-hop</option>
            <option value="rap">rap</option>
            <option value="country">country</option>
            <option value="rock">rock</option>
            <option value="classical">classical</option>
            <option value="k-pop">k-pop</option>
            <option value="jazz">jazz</option>
            <option value="alternative">alternative</option>
            <option value="anime">anime</option>
          </select>
          <span>Number of songs: </span>
          <select id="mySelect" defaultValue="1" onChange={handleSong} required>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          <span>Number of artists: </span>
          <select id="mySelect" defaultValue="2" onChange={handleArtist} required>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
          <button type="submit" id="submit" required>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Home
