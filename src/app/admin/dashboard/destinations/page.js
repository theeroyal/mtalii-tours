'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Card from '@/components/Card';
import { isLoggedIn } from '@/lib/auth';

export default function DestinationsManager() {
  const router = useRouter();
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push('/admin');
    }
  }, [router]);

  useEffect(() => {
    let storedDestinations = JSON.parse(localStorage.getItem('mtalii_destinations'));
    if (!storedDestinations) {
      const { destinations: defaultDestinations } = require('@/lib/data');
      localStorage.setItem('mtalii_destinations', JSON.stringify(defaultDestinations));
      storedDestinations = defaultDestinations;
    }
    setDestinations(storedDestinations);
  }, []);

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this destination?')) {
      const updatedDestinations = destinations.filter(d => d.id !== id);
      localStorage.setItem('mtalii_destinations', JSON.stringify(updatedDestinations));
      setDestinations(updatedDestinations);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin/dashboard" className="text-primary hover:underline">
                Back to Dashboard
              </Link>
              <h1 className="text-2xl font-bold font-manrope text-charcoal-text">Manage Destinations</h1>
            </div>
            <Link href="/admin/dashboard/destinations/new">
              <button className="px-6 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors">
                + Add New Destination
              </button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {destinations.length === 0 ? (
          <Card className="text-center p-12">
            <p className="text-gray-500 mb-6">No destinations found</p>
            <Link href="/admin/dashboard/destinations/new">
              <button className="px-6 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors">
                Create Your First Destination
              </button>
            </Link>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((destination) => (
              <Card key={destination.id} className="p-0 overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold font-manrope text-charcoal-text">{destination.name}</h3>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-2">{destination.description}</p>
                  <div className="flex items-center gap-2 mb-6 text-sm text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Best time to visit: {destination.bestTime}</span>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/admin/dashboard/destinations/${destination.id}/edit`}>
                      <button className="flex-1 px-4 py-2 bg-gray-100 text-charcoal-text font-medium rounded-lg hover:bg-gray-200 transition-colors text-sm">
                        Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(destination.id)}
                      className="px-4 py-2 text-red-600 bg-red-50 font-medium rounded-lg hover:bg-red-100 transition-colors text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
