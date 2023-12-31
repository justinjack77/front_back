import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Admin from './Admin'

function Home() {
    const [auth, setAuth] = useState(false);
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [message, setMessage] = useState('');
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get('http://localhost:5000')
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
    axios.get('http://localhost:5000/logout')
        .then(res => {
            if (res.data.Status === "Success") {
                window.location.reload(true);
            } else {
                alert("Error");
            }
        })
        .catch(err => console.log(err));
};

return (
<div className="container-fluid">
    <div className="row">
        <div className="col-md-3">
            {/* Sidebar content */}
            <div className="bg-light p-3 rounded shadow">
                <h3>Sidebar Content</h3>
                {/* Add your sidebar content here */}
            </div>
        </div>
        <div className="col-md-9">
            {/* Content of your topnav */}
            <div className="topnav">
                <div className="login-container">
                    {auth ? (
                        <div className="bg-light p-3 rounded shadow text-dark">
                            <span className="mr-2">Logged in as {name} (Role: {role})</span>
                            <button onClick={handleLogout} className="btn btn-danger">Logout</button>
                        </div>
                    ) : (
                        <div className="bg-light p-3 rounded shadow">
                            <h3>{message}</h3>
                            <h3>Login Now?</h3>
                            <Link to='/login' className="btn btn-primary">Login</Link>
                        </div>
                    )}
                </div>
            </div>
            <div>
            {/* Conditional rendering based on user's role */}
          {role === 'Super' || role === 'Admin' ? (
            <Admin />
          ) : (
            <div className="bg-light p-3 rounded shadow">
              <h3>You can't access this page.</h3>
            </div>
          )}
        </div>
        </div>
        
    </div>
</div>






);
}

export default Home;