// src/layout/Layout.jsx
import Footer from '../Footer';
import MainNav from '../MainNav';
import UserNav from '../UserNav';
import { Outlet, useLocation } from 'react-router-dom';

const Layout = () => {
  const location = useLocation();

  // Déterminez si l'utilisateur est "connecté" ou si la page actuelle nécessite UserNav.
  // Pour l'exemple, nous allons simplement vérifier la route.
  // Dans une application réelle, vous utiliseriez un état d'authentification (ex: userLoggedIn)
  const isProfilePage = location.pathname === '/profile'; // Ou toute autre route qui nécessite UserNav

  return (
    <div className='layout'>
      {isProfilePage ? <UserNav /> : <MainNav />} {/* Affichage conditionnel du header */}
      <main>
          <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;