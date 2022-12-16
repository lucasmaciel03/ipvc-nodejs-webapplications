import React from 'react';
import './App.css';
import axios from 'axios';

export const LS_AUTH_TOKEN = 'AUTH_TOKEN';

function Dashboard() {
    const [authToken, setAuthToken] = React.useState(null);
    const [allUsers, setAllUsers] = React.useState([]);

    React.useEffect(() => {
        const token = localStorage.getItem('AUTH_TOKEN')
        if (token) {
            setAuthToken(token);
        }
    }, []);

    async function getAllUsers() {
        try{
            const res = await axios.get('http://localhost:4243/api/user/1.1', {
                headers: {
                    Authorization : `Bearer ${authToken}`
                }
            });
            console.log(res)
            setAllUsers(res.data);
        } catch (err){
            console.error(err);
        }
    }
  
  return (
    <div>
        <button onClick={getAllUsers}>Get all users </button>
        {allUsers && allUsers.map((user) => <p key={user.username}>{user.username}</p>)}
    </div>
  );
}

export default Dashboard;


