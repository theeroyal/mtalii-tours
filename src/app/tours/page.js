'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { tourPackages as defaultPackages } from '@/lib/data';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Tours() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState('All');
  const [tourPackages, setTourPackages] = useState([]);

  useEffect(() => {
    // Load packages from localStorage or use default data
    let storedPackages = JSON.parse(localStorage.getItem('mtalii_packages'));
    if (!storedPackages) {
      storedPackages = defaultPackages;
    }
    setTourPackages(storedPackages);
  }, []);

  const categories = ['All', 'Safari', 'Trekking', 'Beach', 'Cultural'];
  const priceRanges = [
    { label: 'All', min: 0, max: Infinity },
    { label: 'Under $1500', min: 0, max: 1500 },
    { label: '$1500 - $2000', min: 1500, max: 2000 },
    { label: 'Over $2000', min: 2000, max: Infinity },
  ];

  const filteredPackages = tourPackages.filter((pkg) => {
    const categoryMatch = selectedCategory === 'All' || pkg.category === selectedCategory;
    const range = priceRanges.find(r => r.label === priceRange);
    const priceMatch = pkg.price >= range.min && pkg.price < range.max;
    return categoryMatch && priceMatch;
  });

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-manrope mb-4">Tour Packages</h1>
          <p className="text-xl text-sand-light max-w-2xl mx-auto">
            Explore our handcrafted adventures across Kenya
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="flex flex-wrap gap-3">
              <span className="text-charcoal-text font-medium self-center">Filter by:</span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === cat
                      ? 'bg-primary text-white'
                      : 'bg-sand-light text-charcoal-text hover:bg-sand'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="px-4 py-2 border border-warm-stone rounded-lg focus:outline-none focus:border-primary"
            >
              {priceRanges.map((range) => (
                <option key={range.label} value={range.label}>{range.label}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPackages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPackages.map((pkg) => (
                <Link key={pkg.id} href={`/tours/${pkg.id}`}>
                  <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={pkg.image}
                        alt={pkg.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-sand-light text-primary text-sm font-semibold rounded-full">
                          {pkg.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {pkg.duration}
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold font-manrope text-charcoal-text mb-2">{pkg.title}</h3>
                      <p className="text-gray-600 mb-4 text-sm">{pkg.description}</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-primary font-bold text-2xl">${pkg.price}</span>
                          <span className="text-gray-500 text-sm">/person</span>
                        </div>
                        <Button size="sm">View Details</Button>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-gray-600">No tours found matching your criteria.</p>
              <Button
                className="mt-4"
                onClick={() => {
                  setSelectedCategory('All');
                  setPriceRange('All');
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
