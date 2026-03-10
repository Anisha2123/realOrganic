import React from 'react';
import { Leaf, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-emerald-950 text-white pt-20 max-md:pt-12 max-sm:pt-8 pb-10 max-sm:pb-6">
      <div className="container mx-auto px-6 max-sm:px-4 lg:px-12">
        <div className="grid grid-cols-4 max-lg:grid-cols-1 max-sm:grid-cols-2 gap-12 max-md:gap-8 max-sm:gap-6 border-b border-emerald-800/50 pb-16 max-md:pb-10 max-sm:pb-8">

          {/* Brand */}
          <div className="space-y-6 max-sm:space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-emerald-600 p-2 rounded-xl text-white">
                <Leaf size={24} fill="currentColor" />
              </div>
              <span className="text-2xl max-sm:text-xl font-bold tracking-tight">
                Real<span className="text-emerald-400">Organic</span>
              </span>
            </Link>
            <p className="text-emerald-200/60 leading-relaxed text-sm max-sm:text-xs">
              We provide fresh, organic, and locally sourced vegetables and fruits directly from farmers to your doorstep. Eat healthy, live better.
            </p>
            <div className="flex items-center gap-4 max-sm:gap-3">
              <SocialLink icon={<Facebook size={18} />} />
              <SocialLink icon={<Twitter size={18} />} />
              <SocialLink icon={<Instagram size={18} />} />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg max-sm:text-base max-sm:mt-2 font-bold mb-6 max-sm:mb-4">Quick Links</h4>
            <ul className="space-y-4 max-sm:space-y-3">
              <FooterLink to="/" text="Home" />
              <FooterLink to="/shop" text="Shop" />
              <FooterLink to="/about" text="About Us" />
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg max-sm:text-base font-bold mb-6 max-sm:mb-4">Categories</h4>
            <ul className="space-y-4 max-sm:space-y-3">
              <FooterLink to="/shop?category=Ayurvedicproducts" text="Ayurvedic products" />
              <FooterLink to="/shop?category=Millets" text="Millets" />
              <FooterLink to="/shop?category=Coir" text="Coir" />
              <FooterLink to="/shop?category=Herbals" text="Herbals" />
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg max-sm:text-base font-bold mb-6 max-sm:mb-4">Contact Us</h4>
            <ul className="space-y-6 max-md:space-y-4 max-sm:space-y-3">

              {/* Address */}
              <li className="flex items-start gap-4 max-sm:gap-3 text-emerald-200/80 hover:text-white transition-colors">
                <MapPin className="shrink-0 text-emerald-500 max-sm:w-4 max-sm:h-4" size={20} />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=G95P+G5V+Nizampet+Hyderabad+Telangana+500085"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-sm max-sm:text-xs leading-relaxed"
                >
                  G95P+G5V, Nizampet Rd, E Block, Nizampet, Hyderabad, Telangana 500085
                </a>
              </li>

              {/* Phone */}
              <li className="flex items-center gap-4 max-sm:gap-3 text-emerald-200/80 hover:text-white transition-colors">
                <Phone className="shrink-0 text-emerald-500 max-sm:w-4 max-sm:h-4" size={20} />
                <a href="tel:+918179988139" className="hover:underline text-sm max-sm:text-xs">
                  +91 8179988139
                </a>
              </li>

              {/* Email */}
              <li className="flex items-center gap-4 max-sm:gap-3 text-emerald-200/80 hover:text-white transition-colors">
                <Mail className="shrink-0 text-emerald-500 max-sm:w-4 max-sm:h-4" size={20} />
                <a href="mailto:realorganic567@gmail.com" className="hover:underline text-sm max-sm:text-xs break-all">
                  realorganic567@gmail.com
                </a>
              </li>

            </ul>
          </div>

        </div>

        <div className="pt-8 max-sm:pt-5 flex flex-col md:flex-row max-md:flex-col items-center justify-between text-sm max-sm:text-xs text-emerald-200/40 gap-4 max-sm:gap-2">
          <p>© 2024 RealOrganic. All rights reserved.</p>
          <div className="flex items-center gap-6 max-sm:gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({ icon }) => (
  <a href="#" className="w-10 h-10 max-sm:w-8 max-sm:h-8 rounded-full bg-emerald-900 flex items-center justify-center text-emerald-400 hover:bg-emerald-600 hover:text-white transition-all duration-300">
    {icon}
  </a>
);

const FooterLink = ({ to, text }) => (
  <li>
    <Link to={to} className="text-emerald-200/60 hover:text-emerald-400 hover:pl-2 transition-all duration-300 block text-sm max-sm:text-xs">
      {text}
    </Link>
  </li>
);

export default Footer;