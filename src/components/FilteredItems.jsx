import React from "react";
import itemData from "./FilteredData";

const FilteredItems = () => {
  return (
    <main className="wrapper flex justify-center">
  <div className="w-full overflow-x-auto">
    <div className="w-max mx-auto grid grid-flow-col auto-cols-[250px] px-10 md:px-0 gap-14 xl:gap-28 mt-9 sm:grid-cols-3 lg:grid-cols-5">
      {itemData.map((items) => (
        <div key={items.id} className="flex flex-col items-center">
          <div className="relative group ">
            <img
              src={items.imgSrc}
              alt={items.name}
              className="rounded-md w-[250px] xl:w-[200px] mx-auto transition-transform duration-300 ease-in-out group-hover:scale-105 shadow-md"
            />
          </div>
          <span className="mt-2 text-center">{items.name}</span>
        </div>
      ))}
    </div>
  </div>
</main>

  );
};

export default FilteredItems;
