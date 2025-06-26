import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import App from './App'
import noteReducer from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'


// creates the store (a state) with reducers to handle actions affecting their states:
// (all reducers get informed of all dispatched actions, but only explicitly handle those set inside them)
// - getState() returns the current state of the store
// - dispatch() sends an action of a certain type with certain payload to reducer in order to change the state
// - subscribe() registers a callback that gets called whenever an action is dispatched to the store
const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer
  }
})

console.log(store.getState())

// store is accessible in App and children because main.jsx wraps App inside react-redux Provider
ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>
)
