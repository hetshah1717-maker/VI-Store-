import React from 'react';
import { PhoneIcon } from './icons/PhoneIcon';

const Header: React.FC = () => {
    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0">
                        <span className="text-2xl font-bold text-[#E60576]">VI</span>
                        <span className="text-xl font-semibold text-gray-700"> Mini Store</span>
                    </div>
                    <div className="flex items-center">
                        <a 
                            href="tel:+919913397555"
                            className="flex items-center bg-[#E60576] text-white font-bold py-2 px-4 rounded-full shadow-lg hover:bg-[#c40463] transition-colors duration-300"
                        >
                            <PhoneIcon className="h-5 w-5 mr-2" />
                            <span className="hidden sm:inline">Call Now</span>
                            <span className="sm:hidden">+91 9913397555</span>
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
