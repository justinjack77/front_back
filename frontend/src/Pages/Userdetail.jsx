import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const EditUser = ({ user, onUpdate }) => {
  const [editedUser, setEditedUser] = useState({ ...user });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleUpdate = () => {
    // Perform API call to update user details with editedUser data
    // After successful update, call onUpdate to update the parent component's state
    onUpdate(editedUser);
  };

  return (
    <div className="mb-3">
      <h3>Edit User</h3>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          name="name"
          placeholder="Enter Name"
          value={editedUser.name}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          name="username"
          placeholder="Enter Username"
          value={editedUser.username}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          name="role"
          placeholder="Enter Role"
          value={editedUser.role}
          onChange={handleInputChange}
        />
      </div>
      <button className="btn btn-primary" onClick={handleUpdate}>
        Update User
      </button>
    </div>
  );
};

const DeleteUser = ({ user, onDelete }) => {
  const handleDelete = () => {
    // Perform API call to delete user based on user.id
    // After successful deletion, call onDelete to update the parent component's state
    onDelete(user.id);
  };

  return (
    <div className="mb-3">
      <h3>Delete User</h3>
      <p>Are you sure you want to delete {user.name}?</p>
      <button className="btn btn-danger" onClick={handleDelete}>
        Delete User
      </button>
    </div>
  );
};

const AddUser = ({ onAdd }) => {
  const [newUser, setNewUser] = useState({ name: '', username: '', role: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleAdd = () => {
    // Perform API call to add new user with newUser data
    // After successful addition, call onAdd to update the parent component's state
    onAdd(newUser);
  };

  return (
    <div className="mb-3">
      <h3>Add User</h3>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          name="name"
          placeholder="Enter Name"
          value={newUser.name}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          name="username"
          placeholder="Enter Username"
          value={newUser.username}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          name="role"
          placeholder="Enter Role"
          value={newUser.role}
          onChange={handleInputChange}
        />
      </div>
      <button className="btn btn-primary" onClick={handleAdd}>
        Add User
      </button>
    </div>
  );
};

const UserDetails = ({ user, onUpdate, onDelete, onAdd }) => {
  return (
    <div className="container mt-4">
      <EditUser user={user} onUpdate={onUpdate} />
      <DeleteUser user={user} onDelete={onDelete} />
      <AddUser onAdd={onAdd} />
    </div>
  );
};

export default UserDetails;
