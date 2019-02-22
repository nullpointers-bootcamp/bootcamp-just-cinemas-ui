import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap-theme.css";
import "./index.css";
import App from "./app/App";
import registerServiceWorker from "./registerServiceWorker";

document.title = "Just Cinemas";
ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
