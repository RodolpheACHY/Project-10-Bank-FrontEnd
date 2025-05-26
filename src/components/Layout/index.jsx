// src/layout/Layout.jsx
import Footer from '../Footer';
import MainNav from '../MainNav';
import { Outlet, useLocation } from 'react-router-dom';
//import './layout.css'

const Layout = () => {
  // const location = useLocation();
  // const isSignInPage = location.pathname === '/sign-in';

  return (
    <div className='layout'>
      <MainNav />
      <main>
          <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;