import React from 'react';
import { WhatsappIcon } from './icons/WhatsappIcon';

const FloatingWhatsApp: React.FC = () => {
    const whatsappLink = "https://wa.me/919913397555?text=Namaste%2C%20I%20want%20VI%20postpaid%20same-day%20MNP.%20My%20name%3A%20_____%2C%20Area%3A%20_____%2C%20Current%20operator%3A%20_____";

    return (
        <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-5 right-5 z-50 bg-green-500 text-white rounded-full p-4 shadow-lg hover:bg-green-600 transition-colors duration-300 transform hover:scale-110"
            aria-label="Chat on WhatsApp"
        >
            <WhatsappIcon className="h-8 w-8" />
        </a>
    );
};

export default FloatingWhatsApp;
