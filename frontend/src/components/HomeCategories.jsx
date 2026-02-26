import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
const categories = [
{
name: "Ayurvedic products",
image: "/products/images/Grammina/GRA-Massage Oil.png",
path: "/category/Ayurvedic products",
bgColor: "bg-gradient-to-br from-yellow-400 to-orange-400",
description: "Premium massage & wellness oils",
},
{
name: "Millets",
image: "/products/images/Kothavalasa and Coir Products/KOT  - Bellam avakai pickle.jpg",
path: "/category/Kothavalasa",
bgColor: "bg-gradient-to-br from-green-400 to-emerald-500",
description: "Organic millets & healthy grains",
},
{
name: "Coir",
image: "/products/images/Kothavalasa and Coir Products/Coir/Elephant.jfif",
path: "/category/Coir",
bgColor: "bg-gradient-to-br from-orange-400 to-red-400",
description: "Eco-friendly coir items",
},
{
name: "Herbals",
image: "/products/images/Grammina/Gra - Neem Oil.jpg",
path: "/category/Oils",
bgColor: "bg-gradient-to-br from-emerald-400 to-teal-500",
description: "Natural herbal oils & remedies",
},
];

const HomeCategories = () => {
  const navigate = useNavigate();

  return (
    <section className="px-6 py-10 bg-gray-50">
      <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>

      {/* Categories Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
      {categories.map((category, index) => (
        <div
          key={index}
          className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2"
          onClick={() => navigate(`/shop?category=${category.name}`)}
        >
          {/* Background Color Layer */}
          <div className={`absolute inset-0 ${category.bgColor} opacity-20`} />

          {/* Image Container */}
          <div className="relative h-72 sm:h-80 lg:h-96 overflow-hidden">
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </div>

          {/* Content Overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
            <h3 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold mb-3 leading-tight">
              {category.name}
            </h3>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/shop?category=${category.name}`);
              }}
              className="bg-white text-gray-900 text-sm sm:text-base font-semibold px-6 py-3 rounded-full w-fit hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
            >
              Shop Now
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

          {/* Shine Effect on Hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
          </div>
        </div>
      ))}
    </div>

</section>
 
  );
};

export default HomeCategories;