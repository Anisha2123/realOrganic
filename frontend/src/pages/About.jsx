import React from 'react';
import { Leaf, Award, Users, Sprout, ArrowRight, Truck, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-25 lg:pb-28 overflow-hidden bg-emerald-900">
                <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=2574&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>
                <div className="container mx-auto px-6 lg:px-12 relative z-10 text-center">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-800 text-emerald-100 text-sm font-semibold mb-6 border border-emerald-700">
                        Since 2024
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                        Cultivating a <br />
                        <span className="text-emerald-400">Healthier Future</span>
                    </h1>
                    <p className="text-xl text-emerald-100 max-w-2xl mx-auto mb-10 leading-relaxed">
                        We bridge the gap between conscientious organic farmers and mindful consumers who refuse to compromise on quality.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/shop" className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-full transition-all shadow-lg hover:shadow-emerald-500/30 flex items-center justify-center gap-2">
                            Start Shopping <ArrowRight size={18} />
                        </Link>
                        <button className="px-8 py-4 bg-transparent border border-emerald-700 text-emerald-100 hover:bg-emerald-800 font-bold rounded-full transition-all">
                            Our Story
                        </button>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 bg-emerald-50 border-b border-emerald-100">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div className="p-4">
                            <h3 className="text-4xl font-bold text-emerald-800 mb-1">50+</h3>
                            <p className="text-emerald-600 font-medium">Partner Farms</p>
                        </div>
                        <div className="p-4">
                            <h3 className="text-4xl font-bold text-emerald-800 mb-1">10k+</h3>
                            <p className="text-emerald-600 font-medium">Happy Customers</p>
                        </div>
                        <div className="p-4">
                            <h3 className="text-4xl font-bold text-emerald-800 mb-1">100%</h3>
                            <p className="text-emerald-600 font-medium">Organic Quality</p>
                        </div>
                        <div className="p-4">
                            <h3 className="text-4xl font-bold text-emerald-800 mb-1">24hr</h3>
                            <p className="text-emerald-600 font-medium">Farm to Table</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Values */}
            <section className="py-24">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="text-center mb-16">
                        <span className="text-emerald-600 font-bold uppercase tracking-wider text-sm">Why Choose Us</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Purity in Every Package</h2>
                        <div className="w-20 h-1 bg-emerald-500 mx-auto mt-4 rounded-full" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[
                            {
                                icon: <Leaf size={32} />,
                                title: "100% Certified Organic",
                                desc: "Every product is certified organic, grown without synthetic pesticides, herbicides, or GMOs. Just pure nature."
                            },
                            {
                                icon: <Users size={32} />,
                                title: "Community Driven",
                                desc: "We support over 50 local family farms, ensuring fair wages and sustainable farming practices for future generations."
                            },
                            {
                                icon: <Award size={32} />,
                                title: "Quality Guarantee",
                                desc: "If you're not 100% satisfied with the freshness of your delivery, we'll replace it instantly. No questions asked."
                            }
                        ].map((item, index) => (
                            <div key={index} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-6">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Story / Timeline */}
            <section className="py-24 bg-gray-50 overflow-hidden">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="lg:w-1/2">
                            <div className="relative">
                                <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-200 rounded-full blur-3xl opacity-50"></div>
                                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-amber-200 rounded-full blur-3xl opacity-50"></div>
                                <img
                                    src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=2672&auto=format&fit=crop"
                                    alt="Farmer holding produce"
                                    className="rounded-[2rem] shadow-2xl relative z-10 w-full transform rotate-2 hover:rotate-0 transition-all duration-500"
                                />
                            </div>
                        </div>
                        <div className="lg:w-1/2">
                            <span className="text-emerald-600 font-bold uppercase tracking-wider text-sm">Our Journey</span>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-8">From a Small Garden to a Movement</h2>

                            <div className="space-y-8 pl-4 border-l-2 border-emerald-200">
                                <div className="relative">
                                    <span className="absolute -left-[25px] top-1 w-4 h-4 rounded-full bg-emerald-500 border-4 border-white shadow-sm"></span>
                                    <h4 className="text-lg font-bold text-gray-900">2024 - The Beginning</h4>
                                    <p className="text-gray-600 mt-1">Started as a small community garden project with just 5 families.</p>
                                </div>
                                <div className="relative">
                                    <span className="absolute -left-[25px] top-1 w-4 h-4 rounded-full bg-emerald-500 border-4 border-white shadow-sm"></span>
                                    <h4 className="text-lg font-bold text-gray-900">2025 - First Expansion</h4>
                                    <p className="text-gray-600 mt-1">Partnered with 20 local farms and launched our first home delivery service.</p>
                                </div>
                                <div className="relative">
                                    <span className="absolute -left-[25px] top-1 w-4 h-4 rounded-full bg-emerald-500 border-4 border-white shadow-sm"></span>
                                    <h4 className="text-lg font-bold text-gray-900">Today - Growing Strong</h4>
                                    <p className="text-gray-600 mt-1">Serving thousands of happy customers with a network of over 50 organic producers.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Meet the Team (Simulated) */}
            <section className="py-24">
                <div className="container mx-auto px-6 lg:px-12 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">Meet the Growers</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { name: "Sarah Jenkins", role: "Head Farmer", img: "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?mx=100&q=80&w=300&auto=format&fit=crop" },
                            { name: "Michael Chen", role: "Sustainability Lead", img: "https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?mx=100&q=80&w=300&auto=format&fit=crop" },
                            { name: "Jessica Alverez", role: "Quality Control", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?mx=100&q=80&w=300&auto=format&fit=crop" },
                            { name: "David Ross", role: "Logistics", img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?mx=100&q=80&w=300&auto=format&fit=crop" },
                        ].map((member, idx) => (
                            <div key={idx} className="group">
                                <div className="h-64 w-full rounded-2xl overflow-hidden mb-4 bg-gray-100">
                                    <img src={member.img} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                                <p className="text-emerald-600 text-sm font-medium">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-emerald-900 text-center px-6">
                <div className="max-w-3xl mx-auto">
                    <Sprout size={48} className="text-emerald-400 mx-auto mb-6" />
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to Taste the Difference?</h2>
                    <p className="text-emerald-100 text-lg mb-10">Join thousands of others who haven chosen a healthier, more sustainable lifestyle.</p>
                    <Link to="/shop" className="inline-block px-10 py-5 bg-white text-emerald-900 font-bold text-lg rounded-full hover:bg-emerald-50 transition-colors shadow-2xl">
                        Shop Fresh Produce
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default About;
