import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from "react-router-dom";
import globalData from './GlobalData';
import App from './App.jsx'
// import './index.css'

if (!window.location.hostname.includes('localhost')) {
  // If not localhost, assume we are running on Google Cloud
  globalData.apiServer = 'https://direct-terminal-412715.nw.r.appspot.com/';
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <App /> 
    </Router>
  </React.StrictMode>
)
