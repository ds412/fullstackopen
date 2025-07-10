// webpack runs this file to build ./build/main.js
import 'core-js/stable/index.js'
import 'regenerator-runtime/runtime.js'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// renders the App.js code
ReactDOM.createRoot(document.getElementById('root')).render(<App />)
