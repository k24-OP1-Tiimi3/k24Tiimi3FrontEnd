import React from 'react';
import './index.css'
import App from './App';
import About from './components/About';
import Home from './components/Home';

import { createRoot } from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import Shoplist from './components/Shoplist';

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <Home />,
        index: true
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "shoplist",
        element: <Shoplist />,
      },
    ]
  }
]
);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);