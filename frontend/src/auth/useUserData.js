import { useState, useEffect } from 'react';
import api from '../api/axios';

function useUserData() {
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');
  api.defaults.withCredentials=true;

  useEffect(() => {
    api.get('/')
        .then(res => {
            console.log("Response from Server:", res.data);
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

  return { auth, name, role, message };
}

export default useUserData;
