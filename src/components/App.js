import React from 'react'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'


import Home from './Home'
import Game from './Game'
import background from "../assets/background.jpg"

const App = () => (
  <Router>
  <div style={{backgroundImage: `url(${background})`, height:'100vh', backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", minHeight: "100%"}}>
    <Routes>
    <Route exact path='/' element={<Home/>} />
    <Route path='/game' element={<Game/>}/>
    </Routes>
  </div>
  </Router>
)

export default App
