// context storing state management of the counter (globally accessible application state)
import { createContext, useReducer, useContext } from 'react'

// reducer function: changes current state based on action; returns new state
const counterReducer = (state, action) => {
    switch (action.type) {
        case "INC":
            return state + 1
        case "DEC":
            return state - 1
        case "ZERO":
            return 0
        default:
            return state
    }
}

const CounterContext = createContext()

export const CounterContextProvider = (props) => {
    // useReducer() creates a state for an application given a reducer function and initial state
    // returns [current_value_of_state, dispatchFunction]
    const [counter, counterDispatch] = useReducer(counterReducer, 0)

    return (
        // provide access to counter state to child components
        <CounterContext.Provider value={[counter, counterDispatch]}>
            {props.children}
        </CounterContext.Provider>
    )
}

// custom hook: helper allowing component to access counter value
export const useCounterValue = () => {
    const counterAndDispatch = useContext(CounterContext)
    return counterAndDispatch[0]
}

// custom hook: helper allowing component to access counter dispatch function
export const useCounterDispatch = () => {
    const counterAndDispatch = useContext(CounterContext)
    return counterAndDispatch[1]
}

export default CounterContext
