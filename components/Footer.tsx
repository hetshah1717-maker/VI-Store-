import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-[#1a1a1a] text-white">
            <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    <div className="md:col-span-2 lg:col-span-1">
                         <span className="text-4xl font-black text-white">vi</span>
                         <span className="text-xl font-medium text-gray-300 align-text-bottom ml-2"> Mini Store</span>
                         <p className="text-gray-400 text-base mt-4">
                             Your authorized VI Postpaid & MNP expert in Ahmedabad.
                         </p>
                         <p className="text-gray-400 text-base mt-2">
                            Call: <a href="tel:+919913397555" className="hover:text-red-500 font-semibold transition-colors">+91 99133 97555</a>
                         </p>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Services</h3>
                        <ul className="mt-4 space-y-3">
                            <li><span className="text-base text-gray-400">Postpaid Connections</span></li>
                            <li><span className="text-base text-gray-400">MNP (Porting)</span></li>
                            <li><span className="text-base text-gray-400">Family Plans</span></li>
                            <li><span className="text-base text-gray-400">Business Plans</span></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Quick Links</h3>
                        <ul className="mt-4 space-y-3">
                            <li><a href="#plans" className="text-base text-gray-400 hover:text-white transition-colors">Plans</a></li>
                            <li><a href="#calculator" className="text-base text-gray-400 hover:text-white transition-colors">Calculator</a></li>
                            <li><a href="#how-it-works" className="text-base text-gray-400 hover:text-white transition-colors">Process</a></li>
                            <li><a href="#contact" className="text-base text-gray-400 hover:text-white transition-colors">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Why Us?</h3>
                        <ul className="mt-4 space-y-3">
                            <li><span className="text-base text-gray-400">✓ Same Day Activation</span></li>
                            <li><span className="text-base text-gray-400">✓ Doorstep Service</span></li>
                            <li><span className="text-base text-gray-400">✓ Official Partner</span></li>
                            <li><span className="text-base text-gray-400">✓ Gujarati Support</span></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-20 border-t border-gray-800 pt-8 text-center">
                    <p className="text-base text-gray-500">&copy; {new Date().getFullYear()} VI Mini Store, Ahmedabad. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
