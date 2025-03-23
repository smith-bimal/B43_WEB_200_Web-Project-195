import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-white text-gray-800 py-4 sm:py-6 md:py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row md:justify-between md:items-center">
                    <div className="flex justify-center md:justify-start">
                        <img src="logo_light.png" alt="Logo" className="h-8 sm:h-10 md:h-12" />
                    </div>
                    <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm sm:text-base">
                        <a href="#" className="hover:underline hover:text-gray-600 transition-colors">About Us</a>
                        <a href="#" className="hover:underline hover:text-gray-600 transition-colors">Contact</a>
                        <a href="#" className="hover:underline hover:text-gray-600 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:underline hover:text-gray-600 transition-colors">Terms of Service</a>
                        <a href="#" className="hover:underline hover:text-gray-600 transition-colors">Careers</a>
                    </div>
                    <div className="flex justify-center space-x-6 md:space-x-4">
                        <a href="#" className="text-gray-800 hover:text-gray-600 transition-colors text-xl sm:text-2xl">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="#" className="text-gray-800 hover:text-gray-600 transition-colors text-xl sm:text-2xl">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="#" className="text-gray-800 hover:text-gray-600 transition-colors text-xl sm:text-2xl">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="#" className="text-gray-800 hover:text-gray-600 transition-colors text-xl sm:text-2xl">
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                    </div>
                </div>
                <div className="text-center mt-6 text-gray-300">
                    <small>&copy; 2023 TripMate. All rights reserved.</small>
                </div>
            </div>
        </footer>
    );
};

export default Footer;