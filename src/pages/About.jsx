import React from "react";
import about1 from "../assets/about1.jpeg"
import about2 from "../assets/about2.jpeg"

const About = () => {
  return (
    <section className="bg-gray-100 py-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
          Welcome to Okway Home Decore
        </h2>
        
        {/* Description */}
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          At Okway Home Decore, we believe that your home should reflect your personality, comfort, and style. We provide premium home decor products, handpicked for quality and design. Whether you're looking to refresh your living space or completely transform your home, we have everything you need to make it happen.
        </p>
        
        {/* Image and Text Sections */}
        <div className="md:flex md:justify-center md:space-x-12">
          {/* Mission Section */}
          <div className="mb-8 md:mb-0 md:w-1/3">
            <img
              src={about1}
              alt="A beautifully styled living room showcasing artistic decor"
              className="w-full h-56 object-cover mb-4 rounded-lg shadow-md"
            />
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Our Mission
            </h3>
            <p className="text-gray-600">
              Our mission is to bring the beauty of artistic decor into every home, providing inspiration and elegance to each space. We aim to combine functionality and style to help you create a living environment that is truly your own.
            </p>
          </div>

          {/* Why Choose Us Section */}
          <div className="md:w-1/3">
            <img
              src={about2}
              alt="A selection of curated home decor items showcasing various styles"
              className="w-full h-56 object-cover mb-4 rounded-lg shadow-md"
            />
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Why Choose Us?
            </h3>
            <p className="text-gray-600">
              We offer a carefully curated selection of home decor items, ensuring that each piece not only looks beautiful but is also of the highest quality. From modern minimalism to classic elegance, we have styles to suit every taste.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
