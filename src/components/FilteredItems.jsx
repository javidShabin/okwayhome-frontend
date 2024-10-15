import React from "react";
import itemData from "./FilteredData";

const FilteredItems = () => {
  return (
    <main className="wrapper bg-gray-100">
      {itemData.length === 0 ? (
        <p className="text-center pt-5 text-lg">No items available</p>
      ) : (
        <>
          <h2 className="text-[18px] sm:text-[20px] text-center font-semibold pt-5">
            What's on your mind
          </h2>
          <div className="flex justify-center">
            <div className="w-full overflow-x-auto">
              <div className="w-max mx-auto grid grid-flow-col auto-cols-[250px] px-10 md:px-0 gap-14 xl:gap-28 mt-9 sm:grid-cols-3 lg:grid-cols-5">
                {itemData.map((item, index) => (
                  <div key={item.id || index} className="flex flex-col items-center">
                    <div className="relative group">
                      <img
                        src={item.imgSrc}
                        alt={item.name}
                        className="rounded-md w-[250px] xl:w-[200px] mx-auto transition-transform duration-300 ease-in-out group-hover:scale-105 shadow-md"
                      />
                    </div>
                    <span className="mt-2 text-center">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default FilteredItems;
