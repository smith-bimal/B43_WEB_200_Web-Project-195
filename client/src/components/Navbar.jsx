import React, { useState } from 'react';
import { Link } from 'react-router';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="relative z-20 bg-white">
            <div className="flex items-center justify-between py-4">
                <Link to="/" className=""><img src="logo_light.png" alt="" className='h-16' /></Link>
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
                {/* Hamburger menu for mobile */}
                <button
                    className="md:hidden p-2"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <i className="fas fa-bars text-xl"></i>
                </button>

                {/* Desktop menu */}
                <div className="hidden md:flex items-center space-x-4">
                    <Link to="/register">
                        <PrimaryButton>Sign Up</PrimaryButton>
                    </Link>
                    <Link to="/login">
                        <SecondaryButton>Login</SecondaryButton>
                    </Link>
                </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-lg mt-2 p-4 md:hidden">
                    <div className="flex flex-col space-y-3">
                        <Link to="/register" className="px-6 py-3 rounded-full border border-gray-300 text-center hover:bg-gray-100">
                            Sign Up
                        </Link>
                        <Link to="/login" className="px-6 py-3 rounded-full bg-gray-900 text-white text-center hover:bg-gray-800">
                            Login
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;