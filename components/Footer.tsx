import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 text-white">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="text-center space-y-4">
                    <div className="flex justify-center space-x-6">
                         <div className="text-center">
                            <div className="bg-white text-[#E60576] rounded-full p-2 inline-block">
                               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </div>
                            <p className="mt-2 text-sm font-semibold">Authorized VI Partner</p>
                        </div>
                         <div className="text-center">
                             <div className="bg-white text-[#E60576] rounded-full p-2 inline-block">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                            </div>
                            <p className="mt-2 text-sm font-semibold">Same Day Guarantee</p>
                        </div>
                    </div>
                     <p className="text-base text-gray-400">
                        500+ Happy customers in Ahmedabad
                    </p>
                </div>
                <div className="mt-8 border-t border-gray-700 pt-8 text-center">
                    <p className="text-base text-gray-400">&copy; {new Date().getFullYear()} VI Mini Store, Ahmedabad. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
