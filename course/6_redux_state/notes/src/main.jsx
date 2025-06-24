import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import App from './App'
import noteReducer from './reducers/noteReducer'

// // creates the store (a state) with a reducer to handle actions affecting that state:
// // - getState() returns the current state of the store
// // - dispatch() sends an action of a certain type with certain payload to reducer in order to change the state
// // - subscribe() registers a callback that gets called whenever an action is dispatched to the store
const store = createStore(noteReducer)

// store is accessible in App and children because main.jsx wraps App inside react-redux Provider
ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>
)
