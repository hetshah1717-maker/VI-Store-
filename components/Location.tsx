import React from 'react';
import { PhoneIcon } from './icons/PhoneIcon';
import { WhatsappIcon } from './icons/WhatsappIcon';
import { MapPinIcon } from './icons/MapPinIcon';
import { ClockIcon } from './icons/ClockIcon';

const InfoCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="flex items-start">
        <div className="flex-shrink-0 h-14 w-14 flex items-center justify-center bg-red-100 rounded-xl text-[#e60000]">{icon}</div>
        <div className="ml-4">
            <h4 className="text-lg font-bold text-gray-900">{title}</h4>
            <div className="text-gray-600">{children}</div>
        </div>
    </div>
);

const Location: React.FC = () => {
    return (
        <section id="contact" className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20 animate-on-scroll fade-in-up">
                    <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl tracking-tighter">Visit or Contact Us</h2>
                    <p className="mt-4 text-lg text-gray-700">We are here to help you in Ahmedabad.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
                    <div className="md:col-span-3 h-96 md:h-full rounded-2xl overflow-hidden shadow-xl animate-on-scroll fade-in-up" style={{ animationDelay: '200ms' }}>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117503.70222137911!2d72.4891146399064!3d23.02047409259214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fcedd11614f6516!2sAhmedabad%2C%20Gujarat%2C%20India!5e0!3m2!1sen!2sus!4v1684321098765!5m2!1sen!2sus"
                            width="100%"
                            height="100%"
                            className="grayscale hover:grayscale-0 transition-all duration-500"
                            style={{ border: 0 }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="VI Mini Store Location"
                        ></iframe>
                    </div>
                    <div className="md:col-span-2 bg-gray-50 p-8 rounded-2xl shadow-xl space-y-8 border border-gray-200 animate-on-scroll fade-in-up" style={{ animationDelay: '400ms' }}>
                        <InfoCard icon={<MapPinIcon className="h-7 w-7" />} title="Address">
                            <p>VI Mini Store, Near Vijay Cross Road,<br />Ahmedabad, Gujarat</p>
                        </InfoCard>
                         <InfoCard icon={<ClockIcon className="h-7 w-7" />} title="Hours">
                            <p>Monday - Sunday: <br/>10:00 AM to 9:00 PM</p>
                        </InfoCard>
                        
                        <div className="flex flex-col sm:flex-row items-center pt-6 border-t border-gray-200 gap-4">
                             <a href="tel:+919913397555" className="group flex-1 w-full text-center bg-gradient-to-r from-[#e60000] to-[#ff3333] text-white p-3 rounded-lg font-bold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center overflow-hidden">
                                <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
                                <PhoneIcon className="h-5 w-5 mr-2" /> Call Us
                            </a>
                            <a href="https://wa.me/919913397555" target="_blank" rel="noopener noreferrer" className="flex-1 w-full text-center bg-green-500 text-white p-3 rounded-lg font-bold hover:bg-green-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center shadow-md">
                                <WhatsappIcon className="h-5 w-5 mr-2" /> WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Location;
