import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Modal, Button, Form } from 'react-bootstrap';

const Admin = () => {
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newUserData, setNewUserData] = useState({
      name: "",
      username: "",
      email: "",
      password: "",
      role: "Super",
    });
    const [error, setError] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const PORT = 8000;

  
    
    const handleAddUser = () => {
      // Validate form data
      if (!newUserData.name || !newUserData.username || !newUserData.email || !newUserData.password) {
        setError("All fields are required.");
        return;
      }
  
      // Reset error state
      setError(null);
  
      // Make a POST request to add the new user data to the database
      fetch(`http://localhost:${PORT}/addadmin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUserData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("User added successfully:", data);
          window.location.reload(true);
          setShowModal(false);
          // Optionally, you can fetch updated user data and setData(data) to refresh the table.
        })
        .catch((error) => {
          console.error("Error adding user:", error);
          setError("Error adding user. Please try again later.");
        });
    };


  useEffect(() => {
    fetch(`http://localhost:${PORT}/adminuser`)
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.log(err));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUserData({
      ...newUserData,
      [name]: value,
    });
  };


 
  const handleDelete = (id) => {
    // Make a DELETE request to delete the user with the given ID
    console.log('Delete user with ID:', id);
    fetch(`http://localhost:${PORT}/adminuser/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        window.location.reload(true);
        console.log('User deleted successfully:', data);
        // Optionally, you can fetch updated user data and setData(data) to refresh the table.
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
      });
  };


  
  const handleEdit = (id) => {
    fetch(`http://localhost:${PORT}/adminuser/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((userData) => {
        console.log('Fetched user data:', userData);
        setNewUserData(userData);
        setShowModal(true);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        // Handle errors, e.g., show an error message to the user
      });
  };

  const handleSaveEdit = () => {
    console.log('Saving changes for user:', newUserData);
    fetch(`http://localhost:${PORT}/adminuser/${newUserData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUserData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('User updated successfully:', data);
        // Update the user data in the state
        setData((prevData) =>
          prevData.map((user) => (user.id === newUserData.id ? newUserData : user))
        );
        setShowModal(false); // Close the edit modal after updating the user
      })
      .catch((error) => {
        console.error('Error updating user:', error);
        // Handle errors, e.g., show an error message to the user
      });
  };
 

  return (
    <div className="container mt-5">
      <div>
        <h1>User Page</h1>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">User Name</th>
            <th scope="col">Role</th>
           
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr key={i}>
              <td>{d.id}</td>
              <td>{d.name}</td>
              <td>{d.username}</td>
              <td>{d.role}</td>
             
            </tr>
          ))}
        </tbody>
      </table>

      


    </div>
  );
};

export default Admin;
