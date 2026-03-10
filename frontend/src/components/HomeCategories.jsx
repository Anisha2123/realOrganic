import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const categories = [
  {
    name: "Ayurvedic Products",
    image: "/products/images/Grammina/GRA-Massage Oil.png",
    accent: "#F59E0B",
    bg: "#FEF3C7",
    tag: "Wellness",
  },
  {
    name: "Millets",
    image: "/products/images/Kothavalasa and Coir Products/KOT  - Bellam avakai pickle.jpg",
    accent: "#10B981",
    bg: "#D1FAE5",
    tag: "Organic",
  },
  {
    name: "Coir",
    image: "/products/images/Kothavalasa and Coir Products/Coir/Elephant.jfif",
    accent: "#F97316",
    bg: "#FFEDD5",
    tag: "Eco-friendly",
  },
  {
    name: "Herbals",
    image: "/products/images/Grammina/Gra - Neem Oil.jpg",
    accent: "#14B8A6",
    bg: "#CCFBF1",
    tag: "Natural",
  },
];

const HomeCategories = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-white py-4 sm:py-6">
      {/* Header */}
      <div className="flex items-center justify-between px-4 sm:px-6 mb-3 sm:mb-4">
        <div>
          <h2
            style={{ fontFamily: "'Poppins', sans-serif", letterSpacing: "-0.5px" }}
            className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 leading-tight"
          >
            Shop by Category
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-0.5">Fresh picks, every day</p>
        </div>
        <button
          onClick={() => navigate("/shop")}
          className="flex items-center gap-1 text-sm font-semibold"
          style={{ color: "#0C831F" }}
        >
          See all <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* 2-col on mobile, 4-col on lg */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 px-4 sm:px-6">
        {categories.map((cat, i) => (
          <div
            key={i}
            onClick={() => navigate(`/shop?category=${cat.name}`)}
            className="cursor-pointer rounded-2xl overflow-hidden flex flex-col cat-card"
            style={{ backgroundColor: cat.bg }}
          >
            {/* Text */}
            <div className="px-3 pt-3 pb-2 sm:px-4 sm:pt-4">
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded-full inline-block mb-1"
                style={{ backgroundColor: cat.accent + "30", color: cat.accent }}
              >
                {cat.tag}
              </span>
              <h3
                style={{ fontFamily: "'Poppins', sans-serif", color: "#1a1a1a" }}
                className="text-sm sm:text-base font-bold leading-tight"
              >
                {cat.name}
              </h3>
            </div>

            {/* Image — fixed height, never full screen */}
            <div className="relative overflow-hidden" style={{ height: "120px" }}>
              <img
                src={cat.image}
                alt={cat.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
                loading="lazy"
              />
              {/* CTA overlay */}
              <div
                className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-3 py-2"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)" }}
              >
                <span className="text-white text-xs font-semibold">Shop Now</span>
                <div className="rounded-full p-1" style={{ backgroundColor: cat.accent }}>
                  <ChevronRight className="w-3 h-3 text-white" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&display=swap');
        .cat-card { transition: transform 0.15s ease, box-shadow 0.15s ease; }
        .cat-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.10); }
        .cat-card:active { transform: scale(0.97); }

        @media (min-width: 640px) {
          .cat-card .cat-img { height: 150px !important; }
        }
        @media (min-width: 1024px) {
          .cat-card .cat-img { height: 180px !important; }
        }
      `}</style>
    </section>
  );
};

export default HomeCategories;