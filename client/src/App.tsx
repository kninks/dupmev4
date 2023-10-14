import { useEffect, useState } from 'react'
import './App.css'

<<<<<<< Updated upstream
import Piano from './components/Piano';

const socket = io("http://localhost:3000");
=======
import Users from './components/Users';
>>>>>>> Stashed changes

function App() {

  return (
    <div className="App">
      <Piano />
    </div>
  )
}

export default App
