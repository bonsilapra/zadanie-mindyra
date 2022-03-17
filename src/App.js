import './App.css';
import React, { useState, useEffect } from 'react';

function App() {

  const [currUser, setCurrUser] = useState(0)
  const [currImg, setCurrImg] = useState([
    {name: "gaearon"},
    {name: "acdlite"},
    {name: "yyx990803"},
    {name: "unclebob"},
    {name: "martinfowler"}
  ])
  const [loading, setLoading] = useState(false)

  const nextImg = () => {
    if (currUser == currImg.length - 1) {
      setCurrUser(0)
    } else {
      setCurrUser(currUser + 1)
    }
  }

  const previousImg = () => {
    if (currUser == 0) {
      setCurrUser(currImg.length - 1)
    } else {
      setCurrUser(currUser - 1)
    }
  }


  useEffect(() => {
    if (!currImg[currUser].avatar) {
      setLoading(true)
      fetch(`https://api.github.com/users/${currImg[currUser].name}`)
        .then(response => response.json())
        .then(data => {
          if (data.login == currImg[currUser].name) {
            let avatars = currImg;
            avatars[currUser] = {...avatars[currUser], avatar: data.avatar_url};
            setCurrImg(avatars);
          }
          setLoading(false)
        });
    }
  }, [currUser])


  return (
    <div className="App">
      <div className="gallery">
        <h1>{currImg[currUser].name}</h1>
        {loading ?
          <div className="galleryDisp">
            <p>Loading...</p>
          </div>
          :
          <div className="galleryDisp">
            <img src = {currImg[currUser].avatar} alt = "avatar"></img>
          </div>
        }
      </div>
      <div className="buttons">
        <button 
          onClick={previousImg}
        >
          Previous
        </button>
        <button
          onClick={nextImg}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
