import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {RouterProvider} from "react-router-dom";
import {ThemeProvider} from "@material-tailwind/react";
import router from "./router.jsx";
import {ContextProvider} from "./contexts/ContextProvider.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <ThemeProvider>
          <ContextProvider>
      <RouterProvider router={router} />
          </ContextProvider>
      </ThemeProvider>
  </React.StrictMode>,
)
