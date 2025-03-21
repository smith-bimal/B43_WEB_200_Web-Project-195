import React, { useState } from 'react';
import { useAuth } from '../components/AuthProvider';

function Auth({ isLogin }) {
  const [isSignIn, setIsSignIn] = useState(isLogin);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (isSignIn) {
      const result = await login(email, password);
      if (!result.success) {
        setError(result.error);
      }
    } else {
      const result = await register({ name, email, password });
      if (!result.success) {
        setError(result.error);
      }
    }
  };

  return (
    <div className="flex h-screen w-full">
      <div className="flex flex-col justify-center p-8 w-full md:w-1/2">
        <div className="flex justify-center mb-8">
          <img alt="logo" src="logo_light.png" className="h-16" />
        </div>
        <h2 className="text-3xl text-center font-semibold mb-2">
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
          {error && (
            <div className="text-center text-red-500 mb-4">
              {error}
            </div>
          )}
          {!isSignIn && (
            <div className="mb-4">
              <label className="text-gray-700 block mb-2" htmlFor="name">Name</label>
              <div className="flex border border-gray-300 rounded-full items-center px-4 py-2">
                <i className="text-gray-500 fa-user fas mr-2"></i>
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
            <label className="text-gray-700 block mb-2" htmlFor="email">Email Address</label>
            <div className="flex border border-gray-300 rounded-full items-center px-4 py-2">
              <i className="text-gray-500 fa-envelope fas mr-2"></i>
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
            <label className="text-gray-700 block mb-2" htmlFor="password">Password</label>
            <div className="flex border border-gray-300 rounded-full items-center px-4 py-2">
              <i className="text-gray-500 fa-lock fas mr-2"></i>
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
          <button className='bg-gray-900 border border-gray-900 rounded-full text-white w-full cursor-pointer duration-200 hover:bg-gray-700 hover:text-white my-4 py-2 transition'>Continue</button>
        </form>

        <div className="flex justify-center items-center mb-4">
          <hr className="border-gray-300 w-1/4" />
          <span className="text-gray-500 mx-2">Or Continue With</span>
          <hr className="border-gray-300 w-1/4" />
        </div>
        <div className="flex justify-center mb-8 space-x-4">
          <button className="flex bg-white border border-gray-300 h-10 justify-center rounded-full w-10 items-center">
            <i className="fa-brands fa-google"></i>
          </button>
          <button className="flex bg-black h-10 justify-center rounded-full text-white w-10 items-center">
            <i className="fa-apple fa-brands"></i>
          </button>
          <button className="flex bg-blue-600 h-10 justify-center rounded-full text-white w-10 items-center">
            <i className="fa-brands fa-facebook"></i>
          </button>
        </div>
        <small className="text-center text-gray-500 text-sm block max-w-[500px] mx-auto">
          Join TripMate today and start planning your dream vacations. Log in to access personalized itineraries, exclusive deals, and much more.
        </small>
      </div>
      <div className="justify-center w-1/2 hidden items-center md:flex">
        <img alt="" src="https://travelfrancebucketlist.com/wp-content/uploads/2021/06/paris-travel-planning.jpg" className='h-full w-full object-cover'/>
      </div>
    </div>
  );
}

export default Auth;
