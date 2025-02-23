import React from 'react';

const Banner = ({ banners }) => {
    return (
        <section className="container mx-auto px-4 max-w-7xl py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {banners.map((banner, index) => (
                    <div key={index} className="banner-item relative h-64 md:h-96 rounded-xl overflow-hidden shadow-lg">
                        <img 
                            src={banner.imageUrl}
                            alt={banner.title}
                            className="w-full h-full object-cover brightness-90"
                            // Add these performance optimizations
                            loading="eager"
                            fetchpriority="high"
                            decoding="async"
                            width={1920}  // Set actual image width
                            height={1080} // Set actual image height
                            style={{
                                contentVisibility: "auto",
                                backgroundColor: "rgb(230,230,230)" // Dominant color placeholder
                            }}
                            />
                        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-black/60">
                            <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">{banner.title}</h1>
                            <p className="text-white/90 mb-4">{banner.description}</p>
                            {banner.buttons && (
                                <div className="flex flex-col md:flex-row gap-3">
                                    {banner.buttons.map((button, idx) => (
                                    <a key={idx} href={button.link}>
                                        <button
                                        className={`bg-${button.color}-600 hover:bg-${button.color}-700 text-white px-6 py-3 rounded-lg transition-colors w-full md:w-auto`}
                                        >
                                        {button.text}
                                        </button>
                                    </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Banner;