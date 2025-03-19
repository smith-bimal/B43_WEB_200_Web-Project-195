import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from '../config/axios';

function Auth({ isLogin }) {
  const [isSignIn, setIsSignIn] = useState(isLogin);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isSignIn ? '/auth/login' : '/auth/register';
      const data = isSignIn ? { email, password } : { name, email, password };
      const response = await axios.post(endpoint, data);
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (error) {
      console.error(`${isSignIn ? 'Login' : 'Signup'} failed`, error);
    }
  };

  return (
    <div className="w-full h-screen flex">
      <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
        <div className="flex justify-center mb-8">
          <img alt="logo" src="logo_light.png" className="h-16" />
        </div>
        <h2 className="text-3xl font-semibold text-center mb-2">
          {isSignIn ? 'Welcome Back' : 'Create Account'}
        </h2>
        <p className="text-center text-gray-500 mb-8">
          {isSignIn ? 'Welcome Back, Please enter Your details' : 'Please fill in the details to create your account'}
        </p>
        <div className="flex justify-center mb-4">
          <button
            className={`py-2 px-4 rounded-l-full cursor-pointer ${isSignIn ? 'bg-gray-200 text-black' : 'bg-gray-100 text-gray-500 text-sm'}`}
            onClick={() => setIsSignIn(true)}
          >
            SignIn
          </button>
          <button
            className={`py-2 px-4 rounded-r-full cursor-pointer ${!isSignIn ? 'bg-gray-200 text-black' : 'bg-gray-100 text-gray-500 text-sm'}`}
            onClick={() => setIsSignIn(false)}
          >
            SignUp
          </button>
        </div>

        <form onSubmit={handleSubmit} className='w-full max-w-md mx-auto'>
          {!isSignIn && (
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="name">Name</label>
              <div className="flex items-center border border-gray-300 rounded-full px-4 py-2">
                <i className="fas fa-user text-gray-500 mr-2"></i>
                <input
                  className="flex-grow outline-none"
                  id="name"
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">Email Address</label>
            <div className="flex items-center border border-gray-300 rounded-full px-4 py-2">
              <i className="fas fa-envelope text-gray-500 mr-2"></i>
              <input
                className="flex-grow outline-none"
                id="email"
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
            <div className="flex items-center border border-gray-300 rounded-full px-4 py-2">
              <i className="fas fa-lock text-gray-500 mr-2"></i>
              <input
                className="flex-grow outline-none"
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button className='border w-full border-gray-900 bg-gray-900 text-white py-2 my-4 rounded-full cursor-pointer hover:bg-gray-700 hover:text-white transition duration-200'>Continue</button>
        </form>

        <div className="flex items-center justify-center mb-4">
          <hr className="w-1/4 border-gray-300" />
          <span className="mx-2 text-gray-500">Or Continue With</span>
          <hr className="w-1/4 border-gray-300" />
        </div>
        <div className="flex justify-center space-x-4 mb-8">
          <button className="bg-white border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center">
            <i className="fa-brands fa-google"></i>
          </button>
          <button className="bg-black text-white rounded-full w-10 h-10 flex items-center justify-center">
            <i className="fa-brands fa-apple"></i>
          </button>
          <button className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center">
            <i className="fa-brands fa-facebook"></i>
          </button>
        </div>
        <small className="text-gray-500 text-sm text-center block max-w-[500px] mx-auto">
          Join TripMate today and start planning your dream vacations. Log in to access personalized itineraries, exclusive deals, and much more.
        </small>
      </div>
      <div className="hidden md:flex w-1/2 items-center justify-center">
        <img alt="" src="https://travelfrancebucketlist.com/wp-content/uploads/2021/06/paris-travel-planning.jpg" className='w-full h-full object-cover'/>
      </div>
    </div>
  );
}

export default Auth;
