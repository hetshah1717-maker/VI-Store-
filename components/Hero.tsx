import React from 'react';
import { WhatsappIcon } from './icons/WhatsappIcon';

const Hero: React.FC = () => {
    const whatsappLink = "https://wa.me/919913397555?text=Namaste%2C%20I%20want%20VI%20postpaid%20same-day%20MNP.%20My%20name%3A%20_____%2C%20Area%3A%20_____%2C%20Current%20operator%3A%20_____";

    return (
        <section className="bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
                <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
                    <span className="block">VI Postpaid —</span>
                    <span className="block text-[#E60576] mt-2">20 Minute MNP ane Free Doorstep KYC</span>
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-600">
                    Fast same-day activation in Ahmedabad | Book on WhatsApp
                </p>
                <div className="mt-8">
                    <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-full text-white bg-[#E60576] hover:bg-[#c40463] transform hover:scale-105 transition-transform duration-300 shadow-xl"
                    >
                        <WhatsappIcon className="h-7 w-7 mr-3" />
                        WhatsApp Now
                    </a>
                </div>
                <p className="mt-6 text-sm text-gray-500 tracking-wider">
                    Open 10 AM–9 PM | Same-day activation | Gujarati support
                </p>
            </div>
        </section>
    );
};

export default Hero;
