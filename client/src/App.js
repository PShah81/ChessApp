import './style/App.css';
import Menu from './Menu.js';
import Navbar from './Navbar.js';
import Game from './Game.js';
import Pawn from './pieces/Pawn.js';
import 'materialize-css/dist/css/materialize.min.css';
import React, { useEffect, useRef, useState } from 'react';
function App() {
  return ( 
    <div className="row">
        <div className="col s3">
          <Navbar/>
        </div>
        <div className="col s6" style={{padding: '0', height: '50vw'}}>
          <Game/>
        </div>
        <div className="col s3">
          <Menu/>
        </div>
    </div>
  );
}

export default App;
