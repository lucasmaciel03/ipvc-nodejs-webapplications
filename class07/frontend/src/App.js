import React from 'react';
import './App.css';
import axios from 'axios';
import Dashboard from './Dashboard';

function App() {
  const [authToken, setAuthToken] = React.useState(null);

  const [loginData, setLoginData] = React.useState({
    username: '', 
    password: ''
  });

  const {username, password} = loginData;

  function onChangeInput(e) {
    setLoginData( prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }

  React.useEffect(() => {
    const token = localStorage.getItem('AUTH_TOKEN');
    if(token){
      setAuthToken(token);
    }
  }, []);

  async function onSubmitForm(e) {
    e.preventDefault();
    try{
      const res = await axios.post('http://localhost:4243/api/user/auth', loginData);
      localStorage.setItem('AUTH_TOKEN', res.data.token);
      
      setAuthToken(res.data.token);
    } catch (err){
      console.error(err);
      alert(err.response.data.msg)
    }

  }
  return (
    <>
  {
    authToken ? (
      <Dashboard />
    ) : (
    <form onSubmit={onSubmitForm}>
      <input type="text" placeholder="Enter your username" id="username" name="username" value={username} onChange={onChangeInput}/>
      <input type="password" placeholder="Enter your password" id="password" name="password" value={password} onChange={onChangeInput}/>
      <button type="submit" value="login">Login</button>
    </form>
    )
}
    </>
  );
}

export default App;


