'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import Card from '@/components/Card';
import { isLoggedIn } from '@/lib/auth';

export default function DestinationForm() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;
  const isEdit = Boolean(id) && id !== 'new';

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push('/admin');
    }
  }, [router]);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    bestTime: ''
  });

  const [loading, setLoading] = useState(isEdit);

  useEffect(() => {
    if (isEdit && id) {
      let storedDestinations = JSON.parse(localStorage.getItem('mtalii_destinations'));
      if (!storedDestinations) {
        const { destinations: defaultDestinations } = require('@/lib/data');
        storedDestinations = defaultDestinations;
      }
      const destination = storedDestinations.find(d => d.id === parseInt(id));
      if (destination) {
        setFormData({
          name: destination.name,
          description: destination.description,
          image: destination.image,
          bestTime: destination.bestTime
        });
      }
      setLoading(false);
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let storedDestinations = JSON.parse(localStorage.getItem('mtalii_destinations'));
    if (!storedDestinations) {
      const { destinations: defaultDestinations } = require('@/lib/data');
      storedDestinations = defaultDestinations;
    }

    if (isEdit) {
      storedDestinations = storedDestinations.map(d => {
        if (d.id === parseInt(id)) {
          return { ...d, ...formData };
        }
        return d;
      });
    } else {
      const newDestination = {
        id: Date.now(),
        ...formData
      };
      storedDestinations.push(newDestination);
    }

    localStorage.setItem('mtalii_destinations', JSON.stringify(storedDestinations));
    router.push('/admin/dashboard/destinations');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <Link href="/admin/dashboard/destinations" className="text-primary hover:underline">
            Back to Destinations
          </Link>
          <h1 className="text-2xl font-bold font-manrope text-charcoal-text">
            {isEdit ? 'Edit Destination' : 'Add New Destination'}
          </h1>
        </div>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-charcoal-text mb-2">Destination Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Maasai Mara"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal-text mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                placeholder="Describe this destination..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal-text mb-2">Image URL</label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal-text mb-2">Best Time to Visit</label>
              <input
                type="text"
                name="bestTime"
                value={formData.bestTime}
                onChange={handleChange}
                placeholder="e.g., July - October"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>

            <div className="flex gap-4 justify-end pt-4">
              <Link href="/admin/dashboard/destinations">
                <button
                  type="button"
                  className="px-6 py-3 bg-gray-100 text-charcoal-text font-medium rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              </Link>
              <button
                type="submit"
                className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors"
              >
                {isEdit ? 'Update Destination' : 'Save Destination'}
              </button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
