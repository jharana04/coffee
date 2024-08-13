import React, { useEffect, useState } from "react";
import Cards from "../../components/Cards";
import { FaFilter } from "react-icons/fa";
const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); // Number of items to display per page

  // loading data
  useEffect(() => {
    //fetching data from the backend
    const fetchData = async () => {
      try {
        // Send a GET request to fetch data from the server
        const response = await fetch("http://localhost:1000/menu");

        // Parse the JSON response
        const data = await response.json();

        // Log the fetched data
        console.log("fetched data", response);
        // saving data to the menu section
        setMenu(data);
        setFilteredItems(data);
      } catch (error) {
        console.log("error etching data", error);
      }
    };
    //call the function
    fetchData();
  }, []);

  //filtering data based on category
  const filterItems = (category) => {
    const filtered =
      category === "all"
        ? menu
        : menu.filter((items) => items.category === category);
    setFilteredItems(filtered);
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  //show all data
  const showAll = () => {
    setFilteredItems(menu);
    setSelectedCategory("all");
    setCurrentPage(1);
  };

  // sorting based on A-Z, Z-A, low- high
  const handleSortChange = (option) => {
    setSortOption(option);

    // Logic for sorting based on the selected option
    let sortedItems = [...filteredItems];

    switch (option) {
      case "A-Z":
        sortedItems.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z-A":
        sortedItems.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "low-to-high":
        sortedItems.sort((a, b) => a.price - b.price);
        break;
      case "high-to-low":
        sortedItems.sort((a, b) => b.price - a.price);
        break;
      default:
        // Do nothing for the "default" case
        break;
    }

    setFilteredItems(sortedItems);
    setCurrentPage(1);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {/* mennu banner */}
      <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
        <div className="py-48 flex flex-col  justify-center items-center ">
          {/* text md=medium device; navaye paxadi ko default value use hunxa, */}
          <div className="text-center px-4 space-y-7">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              Explore Outstanding{" "}
              <span className="text-lightbrown">COFFEE</span>
            </h2>
            <p className="text-xl md:w-4/5 mx-auto text-#4A4A4A">
              Indulge in the exquisite flavors of our finest blends, relishing
              the exceptional taste of our premium coffee at unbeatable prices.
              Experience the convenience of having your coffee delivered fresh,
              right to your doorstep.
            </p>
            <button className="btn bg-brown px8 px-3 font-semibold text-white rounded-full">
              Order Now
            </button>
          </div>
        </div>
      </div>

      {/* menu shop section */}
      <div className="section-container">
        {/* filtering and sorting */}
        <div className="flex flex-col md:flex-row flex-wrap md:justify-between items-center space-y-3 mb-8">
          <div className="flex flex-row justify-start md:items-center md:gap-8 gap-4  flex-wrap">
            {/*  all category btns */}
            <button
              onClick={showAll}
              className={selectedCategory === "all" ? "active" : ""}
            >
              All
            </button>
            <button
              onClick={() => filterItems("Coffee Accessories")}
              className={
                selectedCategory === "Coffee Accessories" ? "active" : ""
              }
            >
              Coffee Accessories
            </button>
            <button
              onClick={() => filterItems("Coffee Beans")}
              className={selectedCategory === "Coffee Beans" ? "active" : ""}
            >
              Coffee Beans
            </button>

            <button
              onClick={() => filterItems("Tea & Herbal infusion")}
              className={
                selectedCategory === "Tea & Herbal infusion" ? "active" : ""
              }
            >
              Tea & Herbal infusion
            </button>
            <button
              onClick={() => filterItems("Sweet Treat")}
              className={selectedCategory === "Sweet Treat" ? "active" : ""}
            >
              Sweet Treat
            </button>
          </div>
          {/* sorting filter data */}
          <div className="flex justify-end mb-4 rounded-sm">
            <div className="bg-brown p-2 ">
              <FaFilter className="text-white h-4 w-4" />
            </div>
            {/* sorting option */}
            <select
              name="sort"
              id="sort"
              onChange={(e) => {
                handleSortChange(e.target.value);
              }}
              value={sortOption}
              className="bg-brown text-white px-2 py-1 rounded-sm"
            >
              <option value="default">Default</option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
              <option value="low-to-high">low-to-high</option>
              <option value="high-to-low">high-to-low</option>
            </select>
          </div>
        </div>

        {/* products cards */}
        <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 ">
          {currentItems.map((item, index) => (
            <Cards key={index} item={item} />
          ))}
        </div>
      </div>

      {/* pagination */}
      <div className="flex justify-center my-8">
        {Array.from({
          length: Math.ceil(filteredItems.length / itemsPerPage),
        }).map((_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 rounded-full ${
              currentPage === index + 1
                ? "bg-lightbrown text-white"
                : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Menu;
