import React from 'react';
import { GiftIcon } from './icons/GiftIcon';

const OfferItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="flex items-start">
        <div className="flex-shrink-0">
            <GiftIcon className="h-6 w-6 text-green-500" />
        </div>
        <div className="ml-4">
            <p className="text-lg leading-6 font-medium text-white">{children}</p>
        </div>
    </div>
);

const Offers: React.FC = () => {
    const whatsappLink = "https://wa.me/919913397555?text=Namaste%2C%20I'm%20interested%20in%20your%20special%20offers%20for%20VI%20Postpaid.";

    return (
        <section className="bg-gray-800">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
                <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                    <span className="block">Ready to switch?</span>
                    <span className="block text-[#E60576]">Check out our special offers.</span>
                </h2>
                <div className="mt-8 lg:mt-0 lg:ml-8 lg:flex-shrink-0">
                    <div className="space-y-4">
                        <OfferItem>Limited Time: First month rental waived + 3 months OTT free</OfferItem>
                        <OfferItem>Doorstep KYC absolutely free within 5km radius</OfferItem>
                        <OfferItem>Family referral bonus: ₹200 credit for each new connection</OfferItem>
                    </div>
                    <div className="mt-8 inline-flex rounded-md shadow">
                        <a
                            href={whatsappLink}
                            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-white hover:bg-gray-200"
                        >
                            Claim Offer on WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Offers;
