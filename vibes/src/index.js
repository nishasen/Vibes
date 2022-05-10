import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider, CategoryProvider, ThemeProvider, VideoProvider } from "./Contexts";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ThemeProvider>
        <VideoProvider>
          <CategoryProvider>
            <AuthProvider>
              <App />
            </AuthProvider>
          </CategoryProvider>
        </VideoProvider>
      </ThemeProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
