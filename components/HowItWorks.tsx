import React from 'react';

const HowItWorks: React.FC = () => {
    const steps = [
        {
            number: "01",
            title: "Book on WhatsApp",
            description: "Fill a quick form on WhatsApp and get an instant response from our team.",
        },
        {
            number: "02",
            title: "Doorstep KYC or Store Visit",
            description: "We offer free KYC at your doorstep (within 5km) or you can visit our store.",
        },
        {
            number: "03",
            title: "Same-day Activation",
            description: "Your MNP is completed and your new VI SIM is delivered and activated the same day.",
        },
    ];

    return (
        <section id="how-it-works" className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Get Your VI Postpaid in 3 Easy Steps</h2>
                    <p className="mt-4 text-lg text-gray-600">From booking to activation, we make it quick and hassle-free.</p>
                </div>
                <div className="mt-12">
                    <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
                        {steps.map((step) => (
                            <div key={step.number} className="text-center">
                                <div className="flex items-center justify-center h-16 w-16 mx-auto bg-[#E60576] text-white rounded-full text-2xl font-bold">
                                    {step.number}
                                </div>
                                <h3 className="mt-6 text-xl font-semibold text-gray-900">{step.title}</h3>
                                <p className="mt-2 text-base text-gray-600">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
