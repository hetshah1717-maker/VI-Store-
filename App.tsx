import React, { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Plans from './components/Plans';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import Location from './components/Location';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Offers from './components/Offers';
import SavingsCalculator from './components/SavingsCalculator';

const App: React.FC = () => {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
            }
        );

        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach((el) => observer.observe(el));

        return () => {
            elements.forEach((el) => observer.unobserve(el));
        };
    }, []);

    return (
        <div className="font-sans text-[#1a1a1a] bg-[#f8f9fa]">
            <Header />
            <main>
                <Hero />
                <Plans />
                <SavingsCalculator />
                <Offers />
                <HowItWorks />
                <Testimonials />
                <Location />
            </main>
            <Footer />
            <FloatingWhatsApp />
        </div>
    );
};

export default App;