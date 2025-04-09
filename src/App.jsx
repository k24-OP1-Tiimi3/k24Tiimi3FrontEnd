import { NavLink, Outlet } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <>
      <nav className="nav">
        <h1>Welcome to PetPack</h1>
        <div>
          <NavLink
            to={"/"}
            style={({ isActive }) => ({
              margin: '10px',
              color: isActive ? '#1abc9c' : '#2c3e50',
              textDecoration: 'none',
            })}
          >
            Home
          </NavLink>
          <NavLink
            to={"/shoplist"}
            style={({ isActive }) => ({
              margin: '10px',
              color: isActive ? '#1abc9c' : '#2c3e50',
              textDecoration: 'none',
            })}
          >
            Products
          </NavLink>
          <NavLink
            to={"/about"}
            style={({ isActive }) => ({
              margin: '10px',
              color: isActive ? '#1abc9c' : '#2c3e50',
              textDecoration: 'none',
            })}
          >
            About
          </NavLink>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default App;