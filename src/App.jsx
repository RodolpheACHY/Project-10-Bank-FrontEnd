import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';
import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';
import ProfilePage from './pages/ProfilePage';
import Page404 from './pages/Page404/Page404';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="sign-in" element={<SignInPage />} />
          <Route 
            path="profile" 
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            } 
          />
          <Route path="*" element={<Page404 />} />     
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
