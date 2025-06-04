// src/pages/UserProfilePage/index.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetUserProfileMutation, useUpdateUserNameMutation } from '../../services/authApi';
import AccountCard from '../../components/AccountCard';
import EditNameForm from '../../components/EditNameform';

function ProfilePage() {
  const navigate = useNavigate();
  const { isAuthenticated, token, user } = useSelector((state) => state.auth);

  const [isEditingName, setIsEditingName] = useState(false);
  
  const [triggerGetUserProfile, { isLoading: isProfileLoading, isError: isProfileError, error: profileError }] = useGetUserProfileMutation();
  const [updateName, { isLoading: isUpdateLoading, error: updateError }] = useUpdateUserNameMutation();

  // Effet pour vérifier l'authentification
  useEffect(() => {
    if (!isAuthenticated && !token) {
      navigate('/sign-in');
    }
  }, [isAuthenticated, token, navigate]);

  // Si le profil est en cours de chargement
  if (isProfileLoading || !user) {
    return (
      <div className="main bg-dark">
        <div className="header">
          <h1>Loading profile...</h1>
        </div>
      </div>
    );
  }

  // Si une erreur s'est produite
  if (isProfileError) {
    return (
      <div className="main bg-dark">
        <div className="header">
          <h1>Error: {profileError?.data?.message || 'Failed to load profile'}</h1>
        </div>
      </div>
    );
  }

  const handleEditName = () => {
    setIsEditingName(true);
  };

  const handleSaveName = async (newFirstName, newLastName) => {
    try {
      await updateName({ firstName: newFirstName, lastName: newLastName }).unwrap();
      setIsEditingName(false);
      await triggerGetUserProfile().unwrap();
    } catch (err) {
      console.error('Failed to update name:', err);
    }
  };

  const handleCancelEdit = () => {
    setIsEditingName(false);
  };

  const accountsData = [
    { id: 1, title: "Argent Bank Checking (x8349)", amount: "$2,082.79", description: "Available Balance" },
    { id: 2, title: "Argent Bank Savings (x6712)", amount: "$10,928.42", description: "Available Balance" },
    { id: 3, title: "Argent Bank Credit Card (x8349)", amount: "$184.30", description: "Current Balance" },
  ];

  return (
    <div className="main bg-dark">
      <div className="header">
        <h1 className='header-first-h1'>Welcome back</h1>
        {isEditingName ? (
          <EditNameForm
            firstName={user.firstName}
            lastName={user.lastName}
            onSave={handleSaveName}
            onCancel={handleCancelEdit}
            isLoading={isUpdateLoading}
          />
        ) : (
          <>
            <h1 className='header-second-h1'>{user.firstName} {user.lastName} !</h1>
            <button className="edit-button" onClick={handleEditName}>Edit Name</button>
          </>
        )}
        {updateError && <p className="error-message">{updateError.data?.message || 'Update failed'}</p>}
      </div>
      <h2 className="sr-only">Accounts</h2>
      
      {accountsData.map(account => (
        <AccountCard
          key={account.id}
          title={account.title}
          amount={account.amount}
          description={account.description}
        />
      ))}
    </div>
  );
}

export default ProfilePage;