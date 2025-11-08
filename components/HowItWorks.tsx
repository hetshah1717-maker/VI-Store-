import React from 'react';
import { WhatsappIcon } from './icons/WhatsappIcon';
import { UserCircleIcon } from './icons/UserCircleIcon';
import { CheckBadgeIcon } from './icons/CheckBadgeIcon';

const HowItWorks: React.FC = () => {
    const steps = [
        {
            icon: <WhatsappIcon className="h-10 w-10 text-white" />,
            title: "WhatsApp પર બુક કરો",
            description: "Click the button, share your details on WhatsApp, and get an instant confirmation.",
        },
        {
            icon: <UserCircleIcon className="h-10 w-10 text-white" />,
            title: "Free Doorstep KYC",
            description: "Our agent will visit you for KYC at your convenience, free of charge (within 5km).",
        },
        {
            icon: <CheckBadgeIcon className="h-10 w-10 text-white" />,
            title: "Same-Day Activation",
            description: "Your new VI SIM is activated and ready to use on the very same day. It's that fast!",
        },
    ];

    return (
        <section id="how-it-works" className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center animate-on-scroll fade-in-up">
                    <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl tracking-tighter">Get VI Postpaid in 3 Easy Steps</h2>
                    <p className="mt-4 text-lg text-gray-700">From booking to activation, we make it quick and hassle-free.</p>
                </div>
                <div className="mt-20 max-w-5xl mx-auto">
                    <div className="relative">
                         <div className="hidden md:block absolute top-14 left-0 w-full h-1 bg-gray-200 rounded-full">
                             <div className="h-full bg-gradient-to-r from-red-500 to-rose-500 rounded-full animate-on-scroll" style={{ width: 'calc(100% - 8rem)', marginLeft: '4rem', transition: 'width 2s ease-out', transform: 'scaleX(0)', transformOrigin: 'left' }
                             }></div>
                         </div>
                        <div className="relative grid grid-cols-1 gap-16 md:grid-cols-3">
                            {steps.map((step, index) => (
                                <div 
                                    key={step.title} 
                                    className="text-center animate-on-scroll fade-in-up"
                                    style={{ animationDelay: `${index * 200}ms` }}
                                >
                                    <div className="relative z-10 flex items-center justify-center h-28 w-28 mx-auto bg-gradient-to-br from-[#e60000] to-[#ff3333] rounded-full shadow-lg shadow-red-500/30 transform transition-transform duration-300 hover:scale-110">
                                        {step.icon}
                                    </div>
                                    <h3 className="mt-8 text-xl font-bold text-gray-900">{step.title}</h3>
                                    <p className="mt-2 text-base text-gray-600">{step.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
