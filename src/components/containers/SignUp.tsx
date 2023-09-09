'use client'
export const SignUp = () => {
    return <></>
}
import { useState } from 'react';

export const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        })  
      });

      const data = await response.json();
      if(response.ok) {

      } else {

      }

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      <label>
        Password:
        <input
          type="password"
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>

      <button type="submit">Login</button>
    </form>
  );
}
