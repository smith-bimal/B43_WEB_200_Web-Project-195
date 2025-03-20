import React from 'react'
import PrimaryButton from './PrimaryButton'
import SecondaryButton from './SecondaryButton'
import { useNavigate } from 'react-router';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    };
    const handleSignup = () => {
        navigate('/register');
    };
    return (
        <header className="flex justify-between items-center mx-auto py-4">
            <img src="logo_light.png" alt="" className='h-16' />
            <nav className="hidden md:flex space-x-12">
                <a className="text-gray-700" href="#">
                    About us
                </a>
                <a className="text-gray-700" href="#">
                    Reviews
                </a>
                <a className="text-gray-700" href="#">
                    Our blog
                </a>
            </nav>
            <div className='space-x-4'>
                <PrimaryButton onClick={handleSignup}>Signup</PrimaryButton>
                <SecondaryButton onClick={handleLogin}>Login</SecondaryButton>
            </div>
        </header >
    )
}

export default Navbar