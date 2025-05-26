// src/pages/UserProfilePage/UserProfilePage.jsx
import React from 'react';
import AccountCard from '../../components/AccountCard';

function ProfilePage() {
  // Ces données seraient idéalement chargées depuis une API ou un store Redux/Context
  const userFullName = "Tony Jarvis"; // Nom complet de l'utilisateur
  const accountsData = [
    { id: 1, title: "Argent Bank Checking (x8349)", amount: "$2,082.79", description: "Available Balance" },
    { id: 2, title: "Argent Bank Savings (x6712)", amount: "$10,928.42", description: "Available Balance" },
    { id: 3, title: "Argent Bank Credit Card (x8349)", amount: "$184.30", description: "Current Balance" },
  ];

  return (
    // Utilisez un div ou une section ici, car le <main> sera dans le Layout
    <div className="main bg-dark"> {/* Conservez les classes CSS de l'original si elles sont nécessaires pour le style de fond/hauteur */}
      <div className="header">
        <h1 className="account-h1">Welcome back<br />{userFullName}!</h1>
        <button className="edit-button">Edit Name</button>
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