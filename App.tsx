import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Plans from './components/Plans';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import Location from './components/Location';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Offers from './components/Offers';

const App: React.FC = () => {
    return (
        <div className="font-sans text-gray-800">
            <Header />
            <main>
                <Hero />
                <Plans />
                <HowItWorks />
                <Testimonials />
                <Offers />
                <Location />
            </main>
            <Footer />
            <FloatingWhatsApp />
        </div>
    );
};

export default App;