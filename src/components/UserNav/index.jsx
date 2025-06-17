import React from 'react';
import { NavLink, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import { authApi } from '../../services/authApi';

function UserNav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    try {
      console.log('Déconnexion initiée');
      
      // 1. Annuler toutes les requêtes en cours
      dispatch(authApi.util.invalidateTags(['User']));
      
      // 2. Déclencher le logout pour nettoyer le token immédiatement
      dispatch(logout());
      
      // 3. Nettoyer le cache RTK Query
      dispatch(authApi.util.resetApiState());
      
      // 4. Rediriger vers homepage
      navigate('/', { replace: true });
      
    } catch (error) {
      console.error('Logout error:', error);
      navigate('/', { replace: true });
    }
  };
  
  return (
    <nav className="main-nav">
      <NavLink className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src="/img/argentBankLogo.png"
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </NavLink>
      <div>
      {user ? (
          <>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive ? 'main-nav-item active' : 'main-nav-item'
              }
            >
              <i className="fa fa-user-circle main-nav-icon-user"></i>
              {user.firstName}
            </NavLink>
            <button className="main-nav-item" onClick={handleLogout} style={{ background: 'none', border: 'none', color: '#2c3e50', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem', marginRight: '0.5rem' }}>
              <i className="fa fa-sign-out main-nav-icon-user"></i>
              Sign Out
            </button>
          </>
      ) : (
            <NavLink
              to="/sign-in"
              className="main-nav-item"
            >
              <i className="fa fa-user-circle main-nav-icon-user"></i>
              Sign In
            </NavLink>
      )}
      </div>
    </nav>
  );
}

export default UserNav;