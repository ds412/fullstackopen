import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css';

import {
    BrowserRouter as Router,            // rename BrowserRouter
} from "react-router-dom"

ReactDOM.createRoot(document.getElementById("root")).render(<Router> <App/></Router>);
