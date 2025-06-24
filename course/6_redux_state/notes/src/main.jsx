import React from 'react'
import ReactDOM from 'react-dom/client'

import { createStore } from 'redux'

// // reducer: returns new state, given current state and an action
// // (must be a pure function (no mutation or other side effects!))
// const noteReducer = (state = [], action) => {
//     if (action.type === 'NEW_NOTE') {
//         return state.concat(action.payload)   // concat creates new array (no mutable state)
//     }

//     return state
// }

// // creates the store (a state) with a reducer to handle actions affecting that state:
// // - getState() returns the current state of the store
// // - dispatch() sends an action of a certain type with certain payload to reducer in order to change the state
// // - subscribe() registers a callback that gets called whenever an action is dispatched to the store
// const store = createStore(noteReducer)

// store.dispatch({
//     type: 'NEW_NOTE',
//     payload: {
//         content: 'the app state is in redux store',
//         important: true,
//         id: 1
//     }
// })

// store.dispatch({
//     type: 'NEW_NOTE',
//     payload: {
//         content: 'state changes are made with actions',
//         important: false,
//         id: 2
//     }
// })

// const App = () => {
//     return (
//         <div>
//             <ul>
//                 {store.getState().map(note =>
//                     <li key={note.id}>
//                         {note.content} <strong>{note.important ? 'important' : ''}</strong>
//                     </li>
//                 )}
//             </ul>
//         </div>
//     )
// }
// export default noteReducer;


const root = ReactDOM.createRoot(document.getElementById('root'))

// function that renders the whole app
const renderApp = () => {
    root.render(<App />)
}

renderApp()                 // call render() to ensure first render happens
store.subscribe(renderApp)  // callback listens for changes in the store, re-rendering upon change
