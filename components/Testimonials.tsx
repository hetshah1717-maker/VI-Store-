import React from 'react';

interface TestimonialCardProps {
    quote: string;
    author: string;
    location: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, author, location }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-700 italic">"{quote}"</p>
            <p className="mt-4 font-bold text-gray-900">- {author}, <span className="font-normal text-gray-600">{location}</span></p>
        </div>
    );
};

const Testimonials: React.FC = () => {
    const testimonialsData = [
        {
            quote: "Family plan thi ₹1200 per month bachyu! Service pan saras che.",
            author: "Harsh Shah",
            location: "Satellite",
        },
        {
            quote: "20 minute ma MNP thai gyu, rider ghar par aaviyu.",
            author: "Priya Patel",
            location: "Bopal",
        },
        {
            quote: "Business mate separate line, call quality excellent.",
            author: "Rajesh Bhai",
            location: "CG Road",
        },
    ];

    return (
        <section id="testimonials" className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">What Our Customers Say</h2>
                    <p className="mt-4 text-lg text-gray-600">Over 500+ Happy Customers in Ahmedabad!</p>
                </div>
                <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
                    {testimonialsData.map((testimonial, index) => (
                        <TestimonialCard key={index} {...testimonial} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
