import React from 'react';

const GalleryImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => (
    <div className="aspect-w-3 aspect-h-2">
        <img className="object-cover rounded-lg shadow-lg" src={src} alt={alt} />
    </div>
);

const Gallery: React.FC = () => {
    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Our Store & Happy Customers</h2>
                    <p className="mt-4 text-lg text-gray-600">Visit us in Ahmedabad for personalized service.</p>
                </div>
                <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    <GalleryImage src="https://picsum.photos/seed/storefront/500/350" alt="VI Mini Store Front" />
                    <GalleryImage src="https://picsum.photos/seed/team/500/350" alt="VI Mini Store Team" />
                    <GalleryImage src="https://picsum.photos/seed/customer1/500/350" alt="Happy VI customer" />
                    <GalleryImage src="https://picsum.photos/seed/customer2/500/350" alt="Another happy customer" />
                </div>
            </div>
        </section>
    );
};

export default Gallery;
