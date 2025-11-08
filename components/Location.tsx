import React from 'react';
import { PhoneIcon } from './icons/PhoneIcon';
import { WhatsappIcon } from './icons/WhatsappIcon';

const Location: React.FC = () => {
    return (
        <section id="contact" className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Visit or Contact Us</h2>
                    <p className="mt-4 text-lg text-gray-600">We are here to help you in Ahmedabad.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-xl">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117503.70222137911!2d72.4891146399064!3d23.02047409259214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fcedd11614f6516!2sAhmedabad%2C%20Gujarat%2C%20India!5e0!3m2!1sen!2sus!4v1684321098765!5m2!1sen!2sus"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="VI Mini Store Location"
                        ></iframe>
                    </div>
                    <div className="bg-white p-8 rounded-lg shadow-xl">
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <PhoneIcon className="h-6 w-6 text-[#E60576]" />
                                <span className="ml-3 text-lg"><strong>Phone:</strong> <a href="tel:+919913397555" className="text-gray-700 hover:text-[#E60576]">+91 9913397555</a></span>
                            </div>
                            <div className="flex items-center">
                                <WhatsappIcon className="h-6 w-6 text-green-500" />
                                <span className="ml-3 text-lg"><strong>WhatsApp:</strong> <a href="https://wa.me/919913397555" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-[#E60576]">+91 9913397555</a></span>
                            </div>
                            <div className="flex items-start">
                                <svg className="h-6 w-6 text-[#E60576] mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span className="ml-3 text-lg"><strong>Hours:</strong><br />Monday - Sunday<br />10:00 AM to 9:00 PM</span>
                            </div>
                             <div className="flex items-start">
                                <svg className="h-6 w-6 text-[#E60576] mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                <span className="ml-3 text-lg"><strong>Address:</strong><br />VI Mini Store, [Area],<br />Ahmedabad, Gujarat</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Location;
