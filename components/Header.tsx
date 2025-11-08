import React, { useState, useEffect } from 'react';
import { PhoneIcon } from './icons/PhoneIcon';

const Header: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`bg-white/80 backdrop-blur-lg sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-md border-b border-gray-200/80' : 'shadow-sm'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <span className="text-4xl font-black text-[#e60000]">vi</span>
                            <span className="text-xl font-medium text-gray-700 align-text-bottom ml-2 tracking-normal"> Mini Store</span>
                        </div>
                         <nav className="hidden lg:flex items-center space-x-10 ml-16">
                            <a href="#plans" className="text-gray-600 hover:text-[#e60000] font-semibold transition-colors relative after:content-[''] after:absolute after:left-0 after:bottom-[-5px] after:w-0 after:h-[3px] after:bg-[#e60000] after:transition-all after:duration-300 hover:after:w-full">Plans</a>
                            <a href="#calculator" className="text-gray-600 hover:text-[#e60000] font-semibold transition-colors relative after:content-[''] after:absolute after:left-0 after:bottom-[-5px] after:w-0 after:h-[3px] after:bg-[#e60000] after:transition-all after:duration-300 hover:after:w-full">Calculator</a>
                            <a href="#how-it-works" className="text-gray-600 hover:text-[#e60000] font-semibold transition-colors relative after:content-[''] after:absolute after:left-0 after:bottom-[-5px] after:w-0 after:h-[3px] after:bg-[#e60000] after:transition-all after:duration-300 hover:after:w-full">Process</a>
                            <a href="#contact" className="text-gray-600 hover:text-[#e60000] font-semibold transition-colors relative after:content-[''] after:absolute after:left-0 after:bottom-[-5px] after:w-0 after:h-[3px] after:bg-[#e60000] after:transition-all after:duration-300 hover:after:w-full">Contact</a>
                        </nav>
                    </div>
                    <div className="flex items-center">
                        <a 
                            href="tel:+919913397555"
                            className="relative group flex items-center bg-gradient-to-r from-[#e60000] to-[#ff3333] text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl hover:from-red-700 hover:to-red-600 transition-all duration-300 transform hover:scale-105 overflow-hidden"
                        >
                             <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></span>
                             <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
                            <PhoneIcon className="h-5 w-5 mr-2" />
                            <span className="hidden sm:inline">Call Now</span>
                            <span className="sm:inline ml-1 hidden md:inline"> · 99133 97555</span>
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
