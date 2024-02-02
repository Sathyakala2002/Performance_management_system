import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "./style/style.css";

import { UserContextProvider } from "./context/UserContext";
import { AuthContextProvider } from "./context/AuthContext";

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
/**
=========================================================
* Material Tailwind Dashboard React - v2.1.0
=========================================================
* Product Page: https://www.creative-tim.com/product/material-tailwind-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-tailwind-dashboard-react/blob/main/LICENSE.md)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
import { ThemeProvider } from "@material-tailwind/react";
import { MaterialTailwindControllerProvider } from "./context/index";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import pageReducer from "./features/page";
import feedbackReducer from "./features/feedbackSlice";
import { FeedbackProvider } from "./context/FeedbackContext";
const store = configureStore({
  reducer: {
    page: pageReducer,
    feedback: feedbackReducer,
  },
});
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthContextProvider>
        <UserContextProvider>
          <MaterialTailwindControllerProvider>
            <FeedbackProvider>
            <Provider store={store}>
                <App />
            </Provider>
            </FeedbackProvider>
          </MaterialTailwindControllerProvider>
        </UserContextProvider>
      </AuthContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);
