import React from 'react'
import ReactDOM from 'react-dom/client'

import { createStore } from 'redux'


// reducer: returns new state, given current state and an action
// (this is never called directly, it is only used as a parameter by createStore)
const counterReducer = (state = 0, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1
        case 'DECREMENT':
            return state - 1
        case 'ZERO':
            return 0
        default:            // if none of the above matches, code comes here
            return state
    }
}

// creates the store (a state) with a reducer to handle actions affecting that state:
// - getState() returns the current state of the store
// - dispatch() sends an action of a certain type to the reducer in order to change the state
// - subscribe() registers a callback that gets called whenever an action is dispatched to the store
const store = createStore(counterReducer)

const App = () => {
    return (
        <div>
            <div>
                {store.getState()}   {/* gets the current value of the counter */}
            </div>
            <button onClick={e => store.dispatch({ type: 'INCREMENT' })}>
                plus
            </button>
            <button onClick={e => store.dispatch({ type: 'DECREMENT' })}>
                minus
            </button>
            <button onClick={e => store.dispatch({ type: 'ZERO' })}>
                zero
            </button>
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

// function that renders the whole app
const renderApp = () => {
    root.render(<App/>)
}

renderApp()                 // call render() to ensure first render happens
store.subscribe(renderApp)  // callback listens for changes in the store, re-rendering upon change
