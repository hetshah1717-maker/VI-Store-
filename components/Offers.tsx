import React from 'react';
import { GiftIcon } from './icons/GiftIcon';
import { WhatsappIcon } from './icons/WhatsappIcon';
import { UserCircleIcon } from './icons/UserCircleIcon';
import { UserPlusIcon } from './icons/UserPlusIcon';

const OfferCard: React.FC<{ icon: React.ReactNode; title: string; description: string; index: number; }> = ({ icon, title, description, index }) => (
    <div 
        className="relative bg-white p-8 rounded-2xl border border-gray-200 text-center shadow-lg group hover:shadow-xl hover:-translate-y-2 transition-all duration-300 animate-on-scroll fade-in-up overflow-hidden"
        style={{ animationDelay: `${index * 150}ms` }}
    >
        <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative z-10">
            <div className="flex justify-center items-center h-16 w-16 mx-auto bg-gradient-to-br from-red-100 to-red-200 text-[#e60000] rounded-2xl transition-transform duration-300 transform group-hover:scale-110 group-hover:rotate-6 shadow-md">
                {icon}
            </div>
            <h3 className="mt-6 text-xl font-bold text-gray-900">{title}</h3>
            <p className="mt-2 text-gray-600">{description}</p>
        </div>
    </div>
);


const Offers: React.FC = () => {
    const whatsappLink = "https://wa.me/919913397555?text=Namaste%2C%20I'm%20interested%20in%20your%20special%20offers%20for%20VI%20Postpaid.";

    return (
        <section className="bg-white py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                 <div className="animate-on-scroll fade-in-up">
                    <h2 className="text-4xl font-extrabold tracking-tighter text-gray-900 sm:text-5xl lg:text-6xl">
                        Exclusive Limited-Time Offers
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg leading-6 text-gray-700">
                        Get these extra benefits when you switch to VI with us today!
                    </p>
                </div>
                <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <OfferCard 
                        icon={<GiftIcon className="h-8 w-8" />}
                        title="First Month FREE" 
                        description="Rental waived for the first month on select family plans." 
                        index={0}
                    />
                    <OfferCard 
                        icon={<UserCircleIcon className="h-8 w-8" />}
                        title="Free Doorstep KYC" 
                        description="Convenient and safe KYC process at your home, within 5km radius." 
                        index={1}
                    />
                     <OfferCard 
                        icon={<UserPlusIcon className="h-8 w-8" />}
                        title="Referral Bonus" 
                        description="Get ₹200 bill credit for each friend who successfully joins VI through you." 
                        index={2}
                    />
                </div>
                 <div className="mt-16 animate-on-scroll fade-in-up" style={{ animationDelay: '400ms' }}>
                    <a
                        href={whatsappLink}
                        className="relative group inline-flex items-center justify-center px-10 py-4 border border-transparent text-base font-bold rounded-full text-white bg-gradient-to-r from-[#e60000] to-[#ff3333] hover:from-red-700 hover:to-red-600 transform hover:scale-105 transition-all shadow-lg overflow-hidden"
                    >
                        <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
                        <WhatsappIcon className="h-6 w-6 mr-3" />
                        Claim Offer on WhatsApp
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Offers;
