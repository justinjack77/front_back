import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Admin from './Admin';
import AdminView from './AdminView';
// import Sidebar from '../components/Sidebar';
import Login from '../AccountPage/Login';
import VerUser from '../AccountPage/VerUser';

function Home() {
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




    return (
        <div className="container-fluid" >

            <div className="login-container">
                <VerUser/>
            </div>
        </div>
                   
    );
}

export default Home;