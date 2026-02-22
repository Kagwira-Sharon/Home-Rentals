import  { useState} from "react";
import { Link } from "react-router-dom";
import { MdFilterList } from "react-icons/md";
import { HiLocationMarker, HiOutlineSortAscending } from "react-icons/hi";

export default function Filter() {
  const [amenities, setAmenities] = useState([]);
  const [sortOption, setSortOption] = useState("");
  

  const toggleAmenity = (amenity) => {
    setAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  return (
    <div className="w-full bg-gray-100 shadow-md rounded-xl p-4">

      {/* Filter icon + Country + City */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <MdFilterList className="w-5 h-5 text-blue-600" />
        <span className="font-semibold text-sm text-gray-700">Filter By</span>

        {/* Country picker */}
        <div  className="relative w-28">
          <label className="absolute -top-2 left-3 text-xs text-gray-500 bg-gray-100 px-1">
            Country
          </label>
          <input
            type="text"
            
            className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none w-full"
          />
       
        </div>

       

        {/* City input */}
        <div className="flex flex-1 min-w-[50px] relative">
          <label className="absolute -top-2 left-3 text-xs text-gray-500 bg-gray-100 px-1">
            City / County
          </label>
          <input
            type="text"           
            className="flex-1 border rounded-l-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 rounded-r-lg flex items-center"
          >
            <HiLocationMarker className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Second row: Rooms, Bedrooms, Price, Sort */}
      <div className="flex flex-wrap items-end gap-2 mb-3">
        <div className="relative w-20">
          <label className="absolute -top-2 left-2 text-xs text-gray-500 bg-gray-100 px-1">
            Rooms
          </label>
          <input
            type="number"
            className="border rounded-lg px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 outline-none w-full"
          />
        </div>

        <div className="relative w-20">
          <label className="absolute -top-2 left-2 text-xs text-gray-500 bg-gray-100 px-1">
            Bedrooms
          </label>
          <input
            type="number"
          
            className="border rounded-lg px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 outline-none w-full"
          />
        </div>

        <div className="relative w-24">
          <label className="absolute -top-2 left-2 text-xs text-gray-500 bg-gray-100 px-1">
            Min Price
          </label>
          <input
            type="number"
            className="border rounded-lg px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 outline-none w-full"
          />
        </div>

        <div className="relative w-24">
          <label className="absolute -top-2 left-2 text-xs text-gray-500 bg-gray-100 px-1">
            Max Price
          </label>
          <input
            type="number"
            className="border rounded-lg px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 outline-none w-full"
          />
        </div>

        <div className="relative w-42">
          <label className="absolute -top-2 left-2 text-xs text-gray-500 bg-gray-100 px-1">
            Sort By
          </label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border rounded-lg px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 outline-none w-full"
          >
           
            <option value="priceLow">Price Low → High</option>
            <option value="priceHigh">Price High → Low</option>
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>

      {/* Third row: Amenities + Apply */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex flex-wrap gap-1">
          {[
            "WiFi",
            "Parking",
            "Pool",
            "Balcony",
            "Token",
            "CCTV",
            "Furnished",
            "Garden",
            "Playground",
          ].map((amenity) => (
            <label
              key={amenity}
              className="flex items-center gap-1 text-xs bg-blue-50 px-2 py-1 rounded-full"
            >
              <input
                type="checkbox"
                checked={amenities.includes(amenity)}
                onChange={() => toggleAmenity(amenity)}
                className="accent-blue-600"
              />
              {amenity}
            </label>
          ))}
        </div>

        <button className="bg-black text-white text-sm px-3 py-1 rounded-lg hover:bg-gray-800 transition ml-auto">
          Apply
        </button>
      </div>
    </div>
  );
}