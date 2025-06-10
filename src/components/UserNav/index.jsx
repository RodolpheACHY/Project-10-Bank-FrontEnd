import React from 'react';
import { NavLink, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/auth/authSlice'; // Importez l'action de déconnexion
import { authApi } from '../../services/authApi'; // Importez l'API slice pour invalider le cache

function UserNav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Récupérez les infos utilisateur depuis le slice 'auth'
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout()); // Déclenchez l'action de déconnexion
    // Nettoyage de tout le cache d'authApi pour ne pas laisser de traces des précédentes connexions
    dispatch(authApi.util.resetApiState());
    navigate('/sign-in'); // Redirigez l'utilisateur vers la page de connexion
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
      {user ? ( // Affichez les liens utilisateur si l'objet user est présent
          <>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive ? 'main-nav-item active' : 'main-nav-item'
              }
            >
              <i className="fa fa-user-circle main-nav-icon-user"></i>
              {user.firstName} {/* Afficher le prénom de l'utilisateur */}
            </NavLink>
            <button className="main-nav-item" onClick={handleLogout} style={{ background: 'none', border: 'none', color: '#2c3e50', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem', marginRight: '0.5rem' }}>
              <i className="fa fa-sign-out main-nav-icon-user"></i>
              Sign Out
            </button>
          </>
      ) : (
          // Afficher le lien de connexion si l'utilisateur n'est pas connecté
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