import ReactDOM from 'react-dom/client'
import App from './App'
import { CounterContextProvider } from './CounterContext'

ReactDOM.createRoot(document.getElementById('root')).render(
    // wrap App in context provider, making context state available to all components
    <CounterContextProvider>
        <App />
    </CounterContextProvider>
)
