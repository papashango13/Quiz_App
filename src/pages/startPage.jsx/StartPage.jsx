import React, { useState } from 'react';
import './StartPage.css';
import { Link } from 'react-router-dom';

const StartPage = () => {
  const [username, setUsername] = useState('');

  return (
    <div className='start-container'> 
      <h1>Welcome To The Quiz App!</h1>
      <div className='start-form'>
        <p>Enter Your Name</p>
        <input 
          className='start-input' 
          type="text" 
          placeholder='Username' 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <Link to='/dashboard' state={{ username }}> 
          <button className='start-button'>Submit</button>
        </Link>
      </div>
    </div>
  );
};

export default StartPage;