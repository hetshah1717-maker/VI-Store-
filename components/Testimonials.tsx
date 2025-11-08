import React from 'react';
import { StarIcon } from './icons/StarIcon';

const TestimonialCard: React.FC<{ quote: string; author: string; location: string; index: number; }> = ({ quote, author, location, index }) => {
    return (
        <div 
            className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 h-full flex flex-col relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 animate-on-scroll fade-in-up"
            style={{ animationDelay: `${index * 150}ms` }}
        >
             <svg className="absolute top-0 left-0 h-32 w-32 text-red-50 opacity-70 transform -translate-x-4 -translate-y-4" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                <path d="M9.333 7h10.417c.966 0 1.75.784 1.75 1.75v10.5c0 .966-.784 1.75-1.75 1.75h-4.417l-3.5 3.5v-3.5H9.333c-.966 0-1.75-.784-1.75-1.75V8.75c0-.966.784-1.75 1.75-1.75z"/>
             </svg>
            <div className="flex text-yellow-400 z-10 mb-4">
                {[...Array(5)].map((_, i) => <StarIcon key={i} className="h-5 w-5" />)}
            </div>
            <blockquote className="text-gray-800 text-lg font-medium flex-grow z-10">"{quote}"</blockquote>
            <footer className="mt-6 font-bold text-gray-900 z-10">- {author}, <span className="font-normal text-gray-600">{location}</span></footer>
        </div>
    );
};

const Testimonials: React.FC = () => {
    const testimonialsData = [
        {
            quote: "Family plan thi ₹1200 per month bachyu! Service pan saras che. Highly recommended.",
            author: "Harsh Shah",
            location: "Satellite",
        },
        {
            quote: "20 minute ma MNP thai gyu, rider ghar par aaviyu. Superfast service!",
            author: "Priya Patel",
            location: "Bopal",
        },
        {
            quote: "My business calls are crystal clear now. The priority support is a great feature.",
            author: "Rajesh Bhai",
            location: "CG Road",
        },
    ];

    return (
        <section id="testimonials" className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center animate-on-scroll fade-in-up">
                    <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl tracking-tighter">અમદાવાદના ગ્રાહકો શું કહે છે?</h2>
                    <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">Join Over 500+ Happy Customers in Ahmedabad!</p>
                </div>
                <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
                    {testimonialsData.map((testimonial, index) => (
                        <TestimonialCard key={index} {...testimonial} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
