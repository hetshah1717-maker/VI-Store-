import React from 'react';
import { CheckIcon } from './icons/CheckIcon';
import { WhatsappIcon } from './icons/WhatsappIcon';

interface PlanCardProps {
    title: string;
    price: string;
    features: string[];
    ctaText: string;
    whatsappMessage: string;
    highlight?: boolean;
}

const PlanCard: React.FC<PlanCardProps> = ({ title, price, features, ctaText, whatsappMessage, highlight = false }) => {
    const whatsappBaseUrl = "https://wa.me/919913397555?text=";
    const link = `${whatsappBaseUrl}${encodeURIComponent(whatsappMessage)}`;

    return (
        <div className={`border rounded-xl p-6 flex flex-col ${highlight ? 'bg-gray-800 text-white shadow-2xl scale-105' : 'bg-white shadow-lg'}`}>
            <h3 className={`text-2xl font-bold ${highlight ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
            <p className="mt-2 text-4xl font-extrabold">
                <span className={highlight ? 'text-white' : 'text-gray-900'}>{price}</span>
                <span className={`text-lg font-medium ${highlight ? 'text-gray-300' : 'text-gray-500'}`}>/month</span>
            </p>
            <ul className="mt-6 space-y-4 text-left">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                        <CheckIcon className={`flex-shrink-0 h-6 w-6 ${highlight ? 'text-green-400' : 'text-[#E60576]'}`} />
                        <span className="ml-3">{feature}</span>
                    </li>
                ))}
            </ul>
            <div className="mt-8">
                <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white ${highlight ? 'bg-white text-[#E60576] hover:bg-gray-200' : 'bg-[#E60576] hover:bg-[#c40463]'}`}
                >
                    <WhatsappIcon className="h-5 w-5 mr-2" /> {ctaText}
                </a>
            </div>
        </div>
    );
};

const Plans: React.FC = () => {
    const planBaseMessage = "My name: _____, Area: _____, Current operator: _____";

    const plansData = [
        {
            title: "Family Connect",
            price: "₹799",
            features: [
                "Shared 300GB data pool",
                "2 OTT subscriptions (3 months free)",
                "Unlimited local/STD calls",
                "3 SIM connections included",
            ],
            ctaText: "Book Family Plan",
            whatsappMessage: `Namaste, I want the VI Postpaid Family Connect ₹799 plan. ${planBaseMessage}`,
        },
        {
            title: "Youth Plus",
            price: "₹499",
            features: [
                "100GB high-speed data",
                "1 OTT subscription",
                "Unlimited calls + SMS",
                "Social media benefits",
            ],
            ctaText: "Book Youth Plan",
            whatsappMessage: `Namaste, I want the VI Postpaid Youth Plus ₹499 plan. ${planBaseMessage}`,
            highlight: true,
        },
        {
            title: "Business Pro",
            price: "₹899",
            features: [
                "200GB data + rollover",
                "Separate business number",
                "Priority customer care",
                "International roaming ready",
            ],
            ctaText: "Book Business Plan",
            whatsappMessage: `Namaste, I want the VI Postpaid Business Pro ₹899 plan. ${planBaseMessage}`,
        }
    ];

    return (
        <section id="plans" className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Choose Your Perfect Postpaid Plan</h2>
                <p className="mt-4 text-lg text-gray-600">Simple, transparent plans for every need in Ahmedabad.</p>
                <div className="mt-12 grid gap-8 lg:grid-cols-3 lg:gap-x-8">
                    {plansData.map((plan, index) => (
                        <PlanCard key={index} {...plan} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Plans;
