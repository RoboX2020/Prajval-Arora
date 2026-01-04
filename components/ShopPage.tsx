import React from 'react';
import { ArrowLeft, ShoppingBag, ExternalLink, Star, Briefcase, Mail, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SHOP_ITEMS } from '../constants_shop';

export const ShopPage: React.FC = () => {
    return (
        <div className="h-screen w-full bg-[#050505] text-white font-nunito selection:bg-amber-500/30 overflow-y-auto relative">
            {/* Background Texture */}
            <div
                className="fixed inset-0 pointer-events-none opacity-10"
                style={{
                    backgroundImage: 'radial-gradient(#444 1px, transparent 1px)',
                    backgroundSize: '30px 30px',
                }}
            ></div>

            {/* Header */}
            <header className="sticky top-0 z-50 bg-[#050505]/90 backdrop-blur-md border-b border-gray-800/50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-amber-500 transition-colors group">
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="font-mono text-sm uppercase tracking-wider">Back to Base</span>
                    </Link>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></div>
                        <h1 className="font-display text-lg font-bold tracking-widest text-gray-200">
                            MY INTERNET <span className="text-amber-500">GARAGE</span>
                        </h1>
                    </div>
                    <div className="w-24"></div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 pb-24 relative z-10">

                {/* Hero Banner */}
                <div className="w-full h-48 md:h-64 rounded-2xl mt-8 mb-12 overflow-hidden border border-gray-800 shadow-2xl relative group">
                    <img
                        src="/garage_banner.png"
                        alt="Internet Garage"
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700 hover:scale-105 transform"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
                    <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
                        <h2 className="text-4xl md:text-6xl font-black font-display text-white tracking-tighter drop-shadow-lg mb-2">
                            PRAJVAL'S <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">WORKSHOP</span>
                        </h2>
                        <p className="font-mono text-sm md:text-base text-gray-300 max-w-xl bg-black/50 backdrop-blur p-2 rounded border-l-2 border-amber-500">
                            // Prototyping, Automation, and Chaos Engineering.
                        </p>
                    </div>
                </div>

                {/* Consulting / Pain Point Section */}
                <div className="mb-16 bg-gradient-to-br from-[#111] to-[#0a0a0a] border border-gray-800 rounded-xl p-8 md:p-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-32 bg-amber-500/5 blur-[100px] rounded-full pointer-events-none"></div>

                    <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                        <div>
                            <h3 className="text-2xl md:text-3xl font-bold font-display text-white mb-4">
                                Have a pain point in your workforce? <br />
                                <span className="text-gray-400">Need a prototype or automation for your startup?</span>
                            </h3>
                            <p className="text-gray-400 mb-6 max-w-2xl text-sm leading-relaxed">
                                I specialize in building rapid prototypes, custom robotics, and AI automation tools that solve real problems.
                                Stop guessing and start building.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <a
                                    href="mailto:prajval@example.com" // Replace with actual if known, or generic
                                    className="px-6 py-3 bg-white text-black font-bold rounded hover:bg-gray-200 transition-all flex items-center gap-2 cursor-pointer"
                                >
                                    <Mail size={18} />
                                    <span>Email Me</span>
                                </a>
                                <a
                                    href="https://calendly.com/prajval-2029/30min"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-6 py-3 bg-transparent border border-gray-600 text-white font-bold rounded hover:border-amber-500 hover:text-amber-500 transition-all flex items-center gap-2"
                                >
                                    <Calendar size={18} />
                                    <span>Schedule a Call</span>
                                </a>
                            </div>
                        </div>

                        <div className="hidden md:block">
                            <Briefcase size={80} className="text-gray-800" />
                        </div>
                    </div>
                </div>

                {/* Filter / Title */}
                <div className="flex items-center gap-4 mb-8">
                    <div className="h-px flex-1 bg-gray-800"></div>
                    <span className="font-mono text-xs text-gray-500 uppercase tracking-widest">Available Projects & Research</span>
                    <div className="h-px flex-1 bg-gray-800"></div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {SHOP_ITEMS.map((item) => (
                        <div key={item.id} className="group flex flex-col bg-[#0a0a0a] border border-gray-800/60 rounded-lg overflow-hidden hover:border-amber-500/40 transition-all duration-300 hover:shadow-[0_0_20px_rgba(245,158,11,0.05)]">
                            {/* Top Bar */}
                            <div className="h-1 w-full bg-gradient-to-r from-transparent via-gray-700 to-transparent group-hover:via-amber-600 transition-all"></div>

                            {/* Image Area - Updated for Banner */}
                            <div className="h-40 bg-[#151515] relative overflow-hidden group-hover:bg-[#121212] transition-colors border-b border-gray-800">
                                <img
                                    src={item.banner || "/garage_banner.png"}
                                    alt={item.title}
                                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-500 hover:scale-110 filter grayscale group-hover:grayscale-0"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-80"></div>

                                {/* Floating Icon */}
                                <div className="absolute bottom-4 left-4 text-4xl drop-shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                                    {item.image}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-5 flex-1 flex flex-col">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex flex-col items-start gap-1">
                                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded border mb-1 ${item.isPopular ? 'bg-amber-900/20 text-amber-500 border-amber-900/50' : 'bg-transparent text-gray-500 border-transparent'}`}>
                                            {item.isPopular ? '★ POPULAR' : ''}
                                        </span>
                                        <span className="font-bold text-sm text-gray-300">{item.price}</span>
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold font-display text-gray-100 mb-2 group-hover:text-amber-500 transition-colors">
                                    {item.title}
                                </h3>

                                <p className="text-xs text-gray-400 leading-relaxed mb-6 line-clamp-3">
                                    {item.description}
                                </p>

                                <div className="mt-auto">
                                    <div className="flex flex-wrap gap-1.5 mb-4">
                                        {item.tags.map(tag => (
                                            <span key={tag} className="text-[9px] uppercase tracking-wider font-mono text-gray-600 bg-gray-900/50 px-1.5 py-0.5 rounded border border-gray-800/50">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <a
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full py-2 bg-gray-900 hover:bg-gray-800 text-gray-300 text-center rounded text-xs font-bold transition-all flex items-center justify-center gap-2 border border-gray-800 group-hover:border-gray-600"
                                    >
                                        <span>ACCESS PROJECT</span>
                                        <ExternalLink size={12} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <footer className="mt-20 text-center border-t border-gray-900 pt-8">
                    <p className="text-gray-700 font-mono text-[10px] uppercase tracking-widest">
                        My Internet Garage • Est. 2020 • Global Shipping
                    </p>
                </footer>
            </main>
        </div>
    );
};
