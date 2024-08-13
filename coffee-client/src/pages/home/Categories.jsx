import React from "react";
const categoryItems = [
  {
    id: 1,
    title: "Americano",
    des: "Espresso",
    image: "/images/home/category/americano.png",
  },
  {
    id: 2,
    title: "Cappuccino",
    des: "Espresso",
    // yo nam lamo bhayera alikati phattoo aako xa mero
    image: "/images/home/category/cappuccino.png",
  },
  {
    id: 3,
    title: "Espresso",
    des: "loz",
    image: "/images/home/category/espresso.png",
  },
  //   {
  //     id: 4,
  //     title: "latte",
  //     des: "Espresso",
  //     image: "/images/home/category/latte.png",
  //   },
];

const Categories = () => {
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 py-16">
      <div className="text-center">
        <p className="subtitle">Customer Favourites</p>
        <h2 className="title">Popular Categories</h2>
      </div>
      {/* category part */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-around items-center mt-12">
        {categoryItems.map((item, i) => (
          <div
            key={i}
            className="shadow-lg rounded-md bg-white py-6 px-5 w-72 mx-auto text-center cursor-pointer hover:-translate-y-4 transition-all duration-300 z-10"
          >
            <div className="flex w-full mx-auto items-center justify-center">
              <img
                src={item.image} // Remove curly braces here
                alt=""
                className="bg-[#d3ad7f] p-5 rounded-full w-28 h-28"
              />
            </div>
            <div className="mt-5 space-y-1">
              <h5 className="text-[#1E1E1E] font-semibold">{item.title}</h5>
              <p className="text-secondary text-sm">{item.des}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
