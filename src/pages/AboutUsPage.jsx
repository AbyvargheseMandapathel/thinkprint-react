import React from "react";
import ShopHeader from "../components/ShopHeader";
import { aboutData } from "../input/data"; // ✅ Importing data
import BenefitsSection from "../components/BenefitsSection";

const AboutUsPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen"> {/* Light background for better contrast */}
      <ShopHeader
        title="About Us"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About Us", href: "/about" }
        ]}
      />
      <main className="container mx-auto px-6 py-12 md:py-16 lg:py-20">
        <section className="max-w-4xl mx-auto text-center">
          {/* <h2 className="text-4xl font-extrabold text-gray-800 mb-6">
            {aboutData.title}
          </h2> */}
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            {aboutData.intro}
          </p>
        </section>

        {/* About Content */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {aboutData.sections.map((section, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                {section.heading}
              </h3>
              <p className="text-gray-600">{section.content}</p>
            </div>
          ))}
        </section>
        {/* Banner */}
        <BenefitsSection />
      </main>
    </div>
  );
};

export default AboutUsPage;
