import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './App.css';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <nav className="nav">
        <div className="nav-header">
          <h1>Welcome to PetPack</h1>
          <button className="menu-button" onClick={toggleMenu}>
            ☰
          </button>
        </div>
        {menuOpen && (
          <div className="dropdown-menu">
            <NavLink
              to={"/"}
              style={({ isActive }) => ({
                margin: '0 15px',
                color: isActive ? '#1abc9c' : '#2c3e50',
                textDecoration: 'none',
              })}
            >
              Home
            </NavLink>
            <NavLink
              to={"/shoplist"}
              style={({ isActive }) => ({
                margin: '0 15px',
                color: isActive ? '#1abc9c' : '#2c3e50',
                textDecoration: 'none',
              })}
            >
              Products
            </NavLink>
            <NavLink
              to={"/about"}
              style={({ isActive }) => ({
                margin: '0 15px',
                color: isActive ? '#1abc9c' : '#2c3e50',
                textDecoration: 'none',
              })}
            >
              About
            </NavLink>
          </div>
        )}
      </nav>
      <Outlet />
    </>
  );
}

export default App;