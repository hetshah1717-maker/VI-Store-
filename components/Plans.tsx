import React from 'react';
import { DataIcon } from './icons/DataIcon';
import { UsersIcon } from './icons/UsersIcon';
import { CheckIcon } from './icons/CheckIcon';

interface OttChoice {
    name: string;
    bgColor: string;
    textColor: string;
    extraClasses?: string;
}

interface Plan {
    name: string;
    price: string;
    connections: number;
    primary: {
        title: string;
        data: string;
    };
    secondary: {
        title: string;
        data: string;
    };
    complimentaryBenefits: {
        tag: string;
        choices: OttChoice[];
    };
    whatsappMessage: string;
    isBestseller?: boolean;
}

const OttLogo: React.FC<OttChoice> = ({ name, bgColor, textColor, extraClasses }) => (
    <div className={`h-10 w-full rounded-md flex items-center justify-center p-1 text-center text-[10px] font-bold leading-tight ${bgColor} ${textColor} ${extraClasses}`}>
        {name}
    </div>
);

const PlanBenefit: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => (
    <div className="flex items-center text-sm text-gray-700">
        {icon}
        <span>{text}</span>
    </div>
);

const PlanCard: React.FC<Plan & { index: number }> = ({ name, price, connections, primary, secondary, complimentaryBenefits, isBestseller, index }) => {
    const whatsappBaseUrl = "https://wa.me/919913397555?text=";
    const planBaseMessage = "My name: _____, Area: _____, Current operator: _____";
    const link = `${whatsappBaseUrl}${encodeURIComponent(`Namaste, I want the ${name} plan. ${planBaseMessage}`)}`;

    return (
        <div 
            className={`relative bg-white rounded-2xl shadow-lg flex flex-col transition-all duration-300 group animate-on-scroll fade-in-up ${isBestseller ? 'border-2 border-[#e60000]' : 'border border-gray-200'}`}
            style={{ animationDelay: `${index * 150}ms` }}
        >
            <div className={`absolute -inset-0.5 bg-gradient-to-r from-red-500 to-rose-500 rounded-2xl blur opacity-0 group-hover:opacity-75 transition duration-500 ${!isBestseller && 'hidden'}`}></div>
             <div className="relative bg-white rounded-2xl flex flex-col flex-grow">
                {isBestseller && (
                    <div className="absolute top-0 right-6 -mt-4 z-20">
                        <span className="bg-gradient-to-r from-[#e60000] to-[#ff3333] text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg">Bestseller</span>
                    </div>
                )}
                
                <div className="p-8 flex-grow flex flex-col">
                    <div className="mb-6">
                        <h3 className="text-2xl font-bold text-gray-900">{name}</h3>
                        <p className="text-5xl font-extrabold text-gray-900 mt-2">₹{price}<span className="text-lg font-medium text-gray-500">/mo</span></p>
                    </div>

                    <div className="space-y-4 mb-6 text-left">
                        <PlanBenefit icon={<UsersIcon className="h-5 w-5 mr-3 text-[#e60000]" />} text={`${connections} Connections`} />
                        <PlanBenefit icon={<DataIcon className="h-5 w-5 mr-3 text-[#e60000]" />} text={`${primary.data} for Primary User`} />
                        <PlanBenefit icon={<CheckIcon className="h-5 w-5 mr-3 text-[#e60000]" />} text={`${secondary.data} for Each Add-on`} />
                    </div>

                    <div className="mt-auto pt-6 border-t border-gray-200">
                        <div className="flex items-center space-x-2 mb-3">
                            <span className="bg-red-100 text-[#e60000] text-xs font-bold px-2.5 py-1 rounded-full uppercase">Choice of 2</span>
                            <span className="text-gray-600 text-xs font-medium">OTT Benefits</span>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                            {complimentaryBenefits.choices.map((ott) => (
                               <OttLogo key={ott.name} {...ott} />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-gray-50 rounded-b-2xl mt-auto">
                     <a href={link} target="_blank" rel="noopener noreferrer" className="relative group block w-full text-center bg-gradient-to-r from-[#e60000] to-[#ff3333] text-white font-bold py-4 px-6 rounded-lg text-md shadow-lg hover:shadow-xl hover:from-red-700 hover:to-red-600 transition-all duration-300 transform hover:scale-105 overflow-hidden">
                        <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
                        Select Plan
                     </a>
                </div>
            </div>
        </div>
    );
};


const Plans: React.FC = () => {
    const ottChoices = {
        vi: { name: 'Vi Movies & TV', bgColor: 'bg-red-600', textColor: 'text-white' },
        prime: { name: 'amazon prime', bgColor: 'bg-blue-500', textColor: 'text-white' },
        hotstar: { name: 'Disney+ hotstar', bgColor: 'bg-blue-900', textColor: 'text-white' },
        sony: { name: 'SONY LIV', bgColor: 'bg-black', textColor: 'text-white' },
        norton: { name: 'Norton', bgColor: 'bg-yellow-400', textColor: 'text-black' },
        swiggy: { name: 'SWIGGY one', bgColor: 'bg-orange-500', textColor: 'text-white' },
        eazydiner: { name: 'eazydiner', bgColor: 'bg-purple-600', textColor: 'text-white' },
    };

    const plansData: Plan[] = [
        {
            name: "Vi Max Family 701",
            price: "701",
            connections: 2,
            primary: { title: "Primary member gets", data: "70 GB" },
            secondary: { title: "Secondary gets", data: "40 GB" },
            complimentaryBenefits: {
                tag: "choice of any 2",
                choices: [ottChoices.vi, ottChoices.prime, ottChoices.hotstar, ottChoices.sony, ottChoices.norton],
            },
            whatsappMessage: "Vi Max Family 701 plan",
        },
        {
            name: "Vi Max Family 1201",
            price: "1201",
            connections: 4,
            isBestseller: true,
            primary: { title: "Primary member gets", data: "140 GB" },
            secondary: { title: "Secondary gets", data: "40 GB" },
            complimentaryBenefits: {
                tag: "choice of any 2",
                choices: [ottChoices.vi, ottChoices.prime, ottChoices.hotstar, ottChoices.sony, ottChoices.swiggy, ottChoices.eazydiner, ottChoices.norton],
            },
            whatsappMessage: "Vi Max Family 1201 plan",
        },
        {
            name: "Vi Max Family 1401",
            price: "1401",
            connections: 5,
            primary: { title: "Primary member gets", data: "140 GB" },
            secondary: { title: "Secondary gets", data: "40 GB" },
            complimentaryBenefits: {
                tag: "choice of any 2",
                choices: [ottChoices.vi, ottChoices.prime, ottChoices.hotstar, ottChoices.sony, ottChoices.swiggy, ottChoices.eazydiner, ottChoices.norton],
            },
            whatsappMessage: "Vi Max Family 1401 plan",
        },
    ];

    return (
        <section id="plans" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="animate-on-scroll fade-in-up">
                    <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl tracking-tighter">તમારા માટે પરફેક્ટ પ્લાન પસંદ કરો</h2>
                    <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">Exclusive family plans with amazing benefits. No hidden charges.</p>
                </div>
                <div className="mt-20 grid gap-10 lg:grid-cols-3 lg:gap-x-8">
                    {plansData.map((plan, index) => (
                        <PlanCard key={index} {...plan} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Plans;
