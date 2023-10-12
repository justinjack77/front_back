import React, { useEffect, useState } from 'react';
import api from '../api/axios'; // Import the axios instance
import { Link } from 'react-router-dom';
import Admin from '../Pages/Admin';
import AdminView from '../Pages/AdminView';
import Login from './Login';
import useUserData from '../auth/useUserData'

function VerUser() {

    const { auth, name, role, message } = useUserData();

    // api.defaults.withCredentials=true;
    const handleLogout = () => {
        api.get('/logout')
            .then(res => {
                if (res.data.Status === "Success") {
                    window.location.reload(true);
                } else {
                    alert("Error");
                }
            })
            .catch(err => console.log(err));
    };

    const userRolPage = () => {
        if (auth) {
            if (role === "Admin" || role === "Super") {
                return <Admin />;
            } else if (role === "Normal") {
                return <AdminView />;
            }
        } else {
            return <h1>You need to log in first</h1>;
        }
    }

    return (
        <div className="container-fluid">
            {auth ? (
                <div className="row">
                    <div className="col-md-3">
                        <div className="bg-light p-3 rounded shadow">
                            <h3>Sidebar Content</h3>
                            {/* Add your sidebar content here */}
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div className="bg-light p-3 rounded shadow text-dark d-flex justify-content-between align-items-center">
                            <span>Logged in as {name} (Role: {role})</span>
                            <button onClick={handleLogout} className="btn btn-danger">Logout</button>
                        </div>
                        <div>
                            {userRolPage()}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-light p-3 rounded shadow">
                    <Login />
                </div>
            )}
        </div>
    );
}

export default VerUser;
