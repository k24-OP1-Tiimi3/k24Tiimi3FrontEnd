import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App'
import About from './components/About'
import Home from './components/Home'
import Shoplist from './components/Shoplist'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="shoplist" element={<Shoplist />} />
        </Route>
      </Routes>
    </HashRouter>
  </StrictMode>,
)