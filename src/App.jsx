import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useUser } from './components/Customers/UserContext';
import { useCart } from './components/Cart/CartContext';
import './App.css';

function App() {
  const { user, logout } = useUser();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

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
            {user ? (
              <>
                <NavLink
                  to={"/profile"}
                  className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                >
                  Profile
                </NavLink>
                <div className="user-info">
                  <span className="welcome-text">Hi, {user.firstName}!</span>
                  <button className="logout-button" onClick={handleLogout}>Logout</button>
                </div>
              </>
            ) : (
              <NavLink
                to={"/account"}
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
              >
                Account
              </NavLink>
            )}

            {user && (
              <NavLink
                to={"/cart"}
                className={({ isActive }) => isActive ? 'nav-link active cart-link' : 'nav-link cart-link'}
              >
                Cart
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </NavLink>
            )}
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default App;