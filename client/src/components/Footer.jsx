import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-white text-gray-800 py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <img src="logo_light.png" alt="Logo" className="h-12" />
                    </div>
                    <div className="flex space-x-4 mb-4 md:mb-0">
                        <a href="#" className="hover:underline">About Us</a>
                        <a href="#" className="hover:underline">Contact</a>
                        <a href="#" className="hover:underline">Privacy Policy</a>
                        <a href="#" className="hover:underline">Terms of Service</a>
                        <a href="#" className="hover:underline">Careers</a>
                    </div>
                    <div className="flex space-x-4">
                        <a href="#" className="text-gray-800 hover:text-gray-600">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="#" className="text-gray-800 hover:text-gray-600">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="#" className="text-gray-800 hover:text-gray-600">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="#" className="text-gray-800 hover:text-gray-600">
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                    </div>
                </div>
                <div className="text-center mt-4">
                    <p>&copy; 2023 TripMate. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;