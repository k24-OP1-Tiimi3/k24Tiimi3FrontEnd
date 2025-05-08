import { NavLink, Outlet } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <>
      <nav className="nav">
        <div className="nav-container">
          <h1>PetPack</h1>
          <div className="nav-links">
            <NavLink
              to={"/"}
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              Home
            </NavLink>
            <NavLink
              to={"/shoplist"}
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              Products
            </NavLink>
            <NavLink
              to={"/about"}
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              About
            </NavLink>
            <NavLink
              to={"/account"}
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              Account
            </NavLink>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default App;