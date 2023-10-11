import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Admin from '../Pages/Admin';
import AdminView from '../Pages/AdminView';
// import Sidebar from '../components/Sidebar';
import Login from './Login';

function VerUser() {
    const [auth, setAuth] = useState(false);
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [message, setMessage] = useState('');

    axios.defaults.withCredentials = true;
    const PORT = 8000;

    useEffect(() => {
        axios.get(`http://localhost:${PORT}`)
            .then(res => {
                console.log("Response from Server:", res.data); // Log the response from the server
                if (res.data.Status === "Success") {
                    setAuth(true);
                    setName(res.data.name);
                    setRole(res.data.role);
                } else {
                    setMessage(res.data.Message);
                }
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);



    const handleLogout = () => {
        axios.get(`http://localhost:${PORT}/logout`)
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
        // const isLoggedIn = props.isLoggedIn;
        if (auth) {
            if (role === "Admin" || role === "Super") {
                return <Admin />
            } else if (role === "Normal") {
                return <AdminView />
            }
        } else {
            return <h1>You need to login first</h1>;
        }
    }

    return (
        <div className="container-fluid" >
            {auth ? (
                <div className="row">
                    <div className="col-md-5">
                        {/* Sidebar content */}
                        <div className="bg-light p-3 rounded shadow">
                            <h3>Sidebar Content</h3>
                            {/* Add your sidebar content here */}
                            {/* <Sidebar /> */}
                        </div>
                    </div>
                    <div className="col-md-7">
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