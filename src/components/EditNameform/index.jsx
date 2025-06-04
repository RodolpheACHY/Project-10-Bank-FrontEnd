// Composant EditNameForm (inchangé, mais peut être dans un fichier séparé)
import React, { useState, useEffect } from 'react';

function EditNameForm({ firstName, lastName, onSave, onCancel, isLoading }) {
    const [newFirstName, setNewFirstName] = useState(firstName);
    const [newLastName, setNewLastName] = useState(lastName);
  
    useEffect(() => {
      setNewFirstName(firstName);
      setNewLastName(lastName);
    }, [firstName, lastName]);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(newFirstName, newLastName);
    };
  
    return (
      <form onSubmit={handleSubmit} className="form-container">
        <div className="inputs-row">
            <input
            type="text"
            value={newFirstName}
            onChange={(e) => setNewFirstName(e.target.value)}
            placeholder="New First Name"
            disabled={isLoading}
            />
            <input
            type="text"
            value={newLastName}
            onChange={(e) => setNewLastName(e.target.value)}
            placeholder="New Last Name"
            disabled={isLoading}
            />
        </div>
        <div className="buttons-row">
            <button type="submit" disabled={isLoading}>Save</button>
            <button type="button" onClick={onCancel} disabled={isLoading}>Cancel</button>
        </div>
      </form>
    );
  }

  export default EditNameForm;