'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { destinations } from '@/lib/data';
import Link from 'next/link';

export default function Destinations() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-manrope mb-4">Destinations</h1>
          <p className="text-xl text-sand-light max-w-2xl mx-auto">
            Discover the breathtaking beauty of Kenya
          </p>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {destinations.map((dest) => (
              <Link key={dest.id} href="/tours" className="group">
                <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 via-primary-dark/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h3 className="text-3xl font-bold font-manrope text-white mb-3">{dest.name}</h3>
                    <p className="text-sand-light text-lg mb-4">{dest.description}</p>
                    <div className="flex items-center gap-2 text-sand-light">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="font-medium">Best Time to Visit: </span>
                      <span>{dest.bestTime}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* More Destinations CTA */}
      <section className="py-20 bg-sand-light/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold font-manrope text-charcoal-text mb-4">
            Can&apos;t Find Your Dream Destination?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            We create custom itineraries tailored to your preferences. Contact us to design your perfect adventure.
          </p>
          <Link href="/contact">
            <button className="bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-dark transition-colors">
              Get in Touch
            </button>
          </Link>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
