import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Modal, Button, Form } from 'react-bootstrap';
import api from '../api/axios'; // Import the axios instance

const Admin = () => {
    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newUserData, setNewUserData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        role: 'Super',
    });

    useEffect(() => {
        fetchAdminUsers();
    }, []);

    const fetchAdminUsers = () => {
        api.get('/adminuser')
            .then(res => setData(res.data))
            .catch(error => console.error('Error fetching admin users:', error));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUserData({
            ...newUserData,
            [name]: value,
        });
    };

    const handleAddUser = () => {
        api.post('/addadmin', newUserData)
            .then(() => {
                console.log('User added successfully');
                window.location.reload(true);
                setShowModal(false);
            })
            .catch(error => console.error('Error adding user:', error));
    };

    const handleDelete = (id) => {
        api.delete(`/adminuser/${id}`)
            .then(() => {
                console.log('User deleted successfully');
                window.location.reload(true);
            })
            .catch(error => console.error('Error deleting user:', error));
    };

    const handleEdit = (id) => {
        api.get(`/adminuser/${id}`)
            .then(userData => {
                console.log('Fetched user data:', userData);
                setNewUserData(userData.data);
                setShowModal(true);
            })
            .catch(error => console.error('Error fetching user data:', error));
    };

    const handleSaveEdit = () => {
        api.put(`/adminuser/${newUserData.id}`, newUserData)
            .then(() => {
                console.log('User updated successfully');
                setData(prevData => prevData.map(user => (user.id === newUserData.id ? newUserData : user)));
                setShowModal(false);
            })
            .catch(error => console.error('Error updating user:', error));
    };

    return (
        <div className="container mt-5">
            <h1>Admin User Page</h1>
            <button className="btn btn-primary mb-3" onClick={() => setShowModal(true)}>
                Add New User
            </button>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">User Name</th>
                        <th scope="col">Role</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((d, i) => (
                        <tr key={i}>
                            <td>{d.id}</td>
                            <td>{d.name}</td>
                            <td>{d.username}</td>
                            <td>{d.role}</td>
                            <td>
                                <button className="btn btn-primary btn-sm mr-2" onClick={() => { handleEdit(d.id); setShowModal(true); }}>
                                    Edit
                                </button>
                                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(d.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Add/Edit User Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{newUserData.id ? 'Edit User' : 'Add New User'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                name="name"
                                value={newUserData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formUsername">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter username"
                                name="username"
                                value={newUserData.username}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                name="email"
                                value={newUserData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                name="password"
                                value={newUserData.password}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formRole">
                            <Form.Label>Role</Form.Label>
                            <Form.Control
                                as="select"
                                name="role"
                                value={newUserData.role}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="Super">Super</option>
                                <option value="Admin">Admin</option>
                                <option value="Normal">Normal</option>
                            </Form.Control>
                        </Form.Group>
                        <Button variant="primary" type="button" onClick={newUserData.id ? handleSaveEdit : handleAddUser}>
                            {newUserData.id ? 'Save Changes' : 'Add User'}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Admin;
