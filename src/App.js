import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Components/Routes";
import ThemeContextProvider from "./ThemeContext";
import { Provider } from "react-redux";  // Import Provider from react-redux
import { store } from "./Store/store";  // Import the Redux store

const App = () => (
  <Provider store={store}>  {/* Wrap with Redux Provider */}
    <ThemeContextProvider>
      <Router>
        <Routes />
      </Router>
    </ThemeContextProvider>
  </Provider>
);

export default App;
