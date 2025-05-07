import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App'
import About from './components/About'
import Home from './components/Home'
import Shoplist from './components/Shoplist'


const ErrorFallback = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Something went wrong</h2>
      <p>The application encountered an error. Please refresh the page.</p>
    </div>
  );
};

try {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <HashRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="shoplist" element={<Shoplist />} />
          </Route>
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </HashRouter>
    </StrictMode>
  );
} catch (error) {
  console.error("Error during rendering:", error);
  createRoot(document.getElementById('root')).render(<ErrorFallback />);
}