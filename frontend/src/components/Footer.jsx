import React from 'react';
import { Leaf, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-emerald-950 text-white pt-20 pb-10">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-emerald-800/50 pb-16">

          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-emerald-600 p-2 rounded-xl text-white">
                <Leaf size={24} fill="currentColor" />
              </div>
              <span className="text-2xl font-bold tracking-tight">
                Real<span className="text-emerald-400">Organic</span>
              </span>
            </Link>
            <p className="text-emerald-200/60 leading-relaxed">
              We provide fresh, organic, and locally sourced vegetables and fruits directly from farmers to your doorstep. Eat healthy, live better.
            </p>
            <div className="flex items-center gap-4">
              <SocialLink icon={<Facebook size={18} />} />
              <SocialLink icon={<Twitter size={18} />} />
              <SocialLink icon={<Instagram size={18} />} />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <FooterLink to="/" text="Home" />
              <FooterLink to="/shop" text="Shop" />
              <FooterLink to="/about" text="About Us" />
              <FooterLink to="/contact" text="Contact" />
              <FooterLink to="/blog" text="Blog" />
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-bold mb-6">Categories</h4>
            <ul className="space-y-4">
              <FooterLink to="/shop?cat=vegetables" text="Vegetables" />
              <FooterLink to="/shop?cat=fruits" text="Fresh Fruits" />
              <FooterLink to="/shop?cat=drinks" text="Organic Drinks" />
              <FooterLink to="/shop?cat=bakery" text="Bakery" />
              <FooterLink to="/shop?cat=spices" text="Spices" />
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-6">Contact Us</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 text-emerald-200/80 hover:text-white transition-colors">
                <MapPin className="shrink-0 text-emerald-500" size={20} />
                <span>123 Organic Lane, Green City, Earth 10101</span>
              </li>
              <li className="flex items-center gap-4 text-emerald-200/80 hover:text-white transition-colors">
                <Phone className="shrink-0 text-emerald-500" size={20} />
                <span>+1 (234) 567-890</span>
              </li>
              <li className="flex items-center gap-4 text-emerald-200/80 hover:text-white transition-colors">
                <Mail className="shrink-0 text-emerald-500" size={20} />
                <span>support@realorganic.com</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-emerald-200/40">
          <p>© 2024 RealOrganic. All rights reserved.</p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({ icon }) => (
  <a href="#" className="w-10 h-10 rounded-full bg-emerald-900 flex items-center justify-center text-emerald-400 hover:bg-emerald-600 hover:text-white transition-all duration-300">
    {icon}
  </a>
);

const FooterLink = ({ to, text }) => (
  <li>
    <Link to={to} className="text-emerald-200/60 hover:text-emerald-400 hover:pl-2 transition-all duration-300 block">
      {text}
    </Link>
  </li>
);

export default Footer;