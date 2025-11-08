import React from 'react';
import { WhatsappIcon } from './icons/WhatsappIcon';
import { CheckBadgeIcon } from './icons/CheckBadgeIcon';

const Hero: React.FC = () => {
    const whatsappLink = "https://wa.me/919913397555?text=Namaste%2C%20I%20want%20VI%20postpaid%20same-day%20MNP.%20My%20name%3A%20_____%2C%20Area%3A%20_____%2C%20Current%20operator%3A%20_____";

    const features = [
        "Same-Day MNP",
        "Free Doorstep KYC",
        "500+ Happy Customers",
        "Official VI Partner"
    ];

    return (
        <section className="bg-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-50">
                <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-white to-transparent"></div>
                 <div 
                    className="absolute bottom-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"
                    style={{ animation: 'pulse-glow 8s infinite alternate' }}
                ></div>
                <div 
                    className="absolute top-0 left-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl"
                     style={{ animation: 'pulse-glow 10s infinite alternate-reverse' }}
                ></div>
            </div>
             <div 
                className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23e60000%22%20fill-opacity%3D%220.04%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')]"
                style={{ backgroundSize: '60px 60px' }}
             />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-40 text-center relative z-10">
                <h1 
                    className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter animate-on-scroll fade-in-up"
                    style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.05)', animationDelay: '100ms' }}
                >
                    <span className="block">Ahmedabad, Get VI Postpaid</span>
                    <span className="block text-[#e60000] mt-2">ઘરે બેઠા, 20 મિનિટમાં!</span>
                </h1>
                <p 
                    className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-700 font-medium animate-on-scroll fade-in-up"
                    style={{ animationDelay: '300ms' }}
                >
                    Switch to VI with ease. Enjoy free doorstep KYC, same-day activation, and exclusive plans.
                </p>
                <div 
                    className="mt-12 animate-on-scroll fade-in-up"
                    style={{ animationDelay: '500ms' }}
                >
                    <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative inline-flex items-center justify-center px-12 py-4 border border-transparent text-lg font-bold rounded-full text-white bg-gradient-to-r from-[#e60000] to-[#ff3333] shadow-2xl shadow-red-500/30 transition-all duration-300 transform hover:scale-105"
                        style={{ animation: 'pulse-glow 2.5s infinite' }}
                    >
                         <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></span>
                        <WhatsappIcon className="h-7 w-7 mr-3" />
                        Start on WhatsApp
                    </a>
                </div>
                <div className="mt-16 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-600">
                    {features.map((feature, index) => (
                         <div 
                            key={index} 
                            className="flex items-center justify-center p-2 animate-on-scroll fade-in-up"
                            style={{ animationDelay: `${700 + index * 150}ms` }}
                         >
                             <CheckBadgeIcon className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
                             <span className="font-semibold text-sm text-left">{feature}</span>
                         </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Hero;