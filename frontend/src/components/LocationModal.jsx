import React, { useState } from 'react';
import { X, MapPin, Navigation, Search, ChevronRight, Loader2 } from 'lucide-react';

const LocationModal = ({ isOpen, onClose, onSelect }) => {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;

      try {
        // Replace YOUR_API_KEY with your actual Google API Key
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YOUR_API_KEY`
        );
        const data = await response.json();

        if (data.status === 'OK') {
          const address = data.results[0].formatted_address;
          // Logic to find the neighborhood/city name from Google results
          const shortAddress = data.results[0].address_components.find(c => 
            c.types.includes("sublocality") || c.types.includes("locality")
          )?.long_name || "Unknown Location";
          
          // Pass data back to Navbar
          onSelect({ 
            full: address, 
            short: shortAddress, 
            lat: latitude, 
            lng: longitude 
          });
          onClose();
        } else {
          alert("Could not fetch address. Please check your API key.");
        }
      } catch (error) {
        console.error("Error fetching location:", error);
        alert("Location search failed. Please try again.");
      } finally {
        setLoading(false);
      }
    }, (error) => {
        setLoading(false);
        alert("Please enable location permissions in your browser.");
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />
      
      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black text-gray-900 tracking-tight">Delivery Location</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Search Input (Placeholder for Google Places Autocomplete) */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text"
              placeholder="Search for area, street name..."
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none"
            />
          </div>

          {/* Current Location Button */}
          <button 
            onClick={handleGetCurrentLocation}
            disabled={loading}
            className="flex items-center justify-between w-full p-5 border border-emerald-100 bg-emerald-50/30 rounded-2xl text-emerald-700 hover:bg-emerald-100/50 transition-all group disabled:opacity-70"
          >
            <div className="flex items-center gap-4">
              <div className="bg-emerald-600 p-2.5 rounded-xl text-white shadow-lg shadow-emerald-200 group-active:scale-90 transition-transform">
                {loading ? <Loader2 size={18} className="animate-spin" /> : <Navigation size={18} fill="currentColor" />}
              </div>
              <div className="text-left">
                <span className="block font-extrabold text-sm tracking-tight">
                    {loading ? "Detecting location..." : "Use Current Location"}
                </span>
                <span className="block text-[10px] text-emerald-600/70 font-bold uppercase tracking-widest">Powered by GPS</span>
              </div>
            </div>
            {!loading && <ChevronRight size={18} />}
          </button>

          {/* Recent Searches / Static Examples */}
          <div className="mt-8 space-y-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Popular Areas</h3>
            
            <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-2xl cursor-pointer transition-colors group">
              <div className="bg-gray-100 p-2 rounded-lg text-gray-400 group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-colors">
                <MapPin size={18} />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">HSR Layout</p>
                <p className="text-xs text-gray-500">Sector 7, Bengaluru, Karnataka</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationModal;