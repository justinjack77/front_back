// import React, { useContext } from 'react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import { AuthContext } from './AuthContext';




function Home() {
  // const { user, logout } = useContext(AuthContext);
  const [auth, setAuth] = useState(false)
  const [name, setName] = useState('')
  const [message, setMessage] = useState('');

  axios.defaults.withCredentials = true;
  useEffect(() =>{
    axios.get('http://localhost:5000')
    .then(res => {
      if(res.data.Status == "Success"){
        setAuth(true);
        setName(res.data.name);
      }else{
        setMessage(res.data.Message);
      }
    })
  },[])

  const handleLogout = () => {
    axios.get('http://localhost:5000/logout')
    .then(res => {
      if(res.data.Status === "Success"){
      location.reload(true);
      }else{
        alert("Error")
      }
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="container mt-4">
      {
        auth?
         
          <div>
            <h3>You are Login as {name}</h3>
            <button onClick={handleLogout} className="btn btn-danger" >Logout</button>
          </div>
          :
          <div>
            <h3>{message}</h3>
          <h3>Login Now?</h3>
          <Link to='/login'  className="btn btn-primary">Login</Link>
        </div>
      
      }


    </div>
  );
}

export default Home;
