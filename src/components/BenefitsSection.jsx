import React from 'react';

const BenefitsSection = () => {
    const benefits = [
        {
            icon: 'https://img.icons8.com/ios-filled/50/000000/globe.png',
            title: 'Fast Delivery',
            description: 'We ensure your products are delivered quickly and efficiently, no matter where you are.'
        },
        {
            icon: 'https://img.icons8.com/ios-filled/50/000000/dress.png',
            title: 'Best Quality',
            description: 'Crafted with the highest standards, our products guarantee durability and style.'
        },
        {
            icon: 'https://img.icons8.com/ios-filled/50/000000/tag-price.png',
            title: 'Customer Support',
            description: 'Our dedicated support team is always here to assist you with any questions or concerns.'
        },
        {
            icon: 'https://img.icons8.com/ios-filled/50/000000/lock.png',
            title: 'Hassle-Free Returns',
            description: 'Enjoy peace of mind with our easy return process, ensuring you’re always satisfied.'
        }
    ];

    return (
        <div className="container mx-auto px-4 py-12">
            {/* Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                {benefits.map((benefit, index) => (
                    <div key={index} className="flex flex-col items-center space-y-4">
                        {/* Icon */}
                        <img src={benefit.icon} alt={benefit.title} className="w-10 h-10 mb-2" />
                        {/* Title */}
                        <h3 className="text-lg font-bold">{benefit.title}</h3>
                        {/* Description */}
                        <p className="text-gray-600">{benefit.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BenefitsSection;