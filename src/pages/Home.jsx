import React from "react";
import hero from "../assets/home.jpeg";
import FilteredItems from "../components/FilteredItems";
import About from "./About";
import Product from "../components/Product";
import Review from "./Review";

const Home = () => {
  return (
    <>
      <div>
        <main
          style={{ backgroundImage: `url(${hero})` }}
          className="bg-cover bg-center h-[92vh] w-full md:h-[80vh] lg:h-[90vh]"
        >
          <div className="bg-black bg-opacity-50 h-full w-full flex flex-col justify-center items-center">
            <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold text-center">
              Design Your Dream Home
            </h1>
            <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold text-center">
              with Timeless Pieces
            </h2>
          </div>
        </main>
        <FilteredItems />
        <About />
        <Review />
        <Product />
      </div>
    </>
  );
};

export default Home;
