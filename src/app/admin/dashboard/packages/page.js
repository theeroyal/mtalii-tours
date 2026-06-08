'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { isLoggedIn } from '@/lib/auth';

export default function PackagesManager() {
  const router = useRouter();
  const [packages, setPackages] = useState([]);

  const formatPrice = (pkg) => {
    const currency = pkg.currency || 'USD';
    const prefix = currency === 'KES' ? 'KSh ' : '$';
    return `${prefix}${Number(pkg.price || 0).toLocaleString()}`;
  };

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push('/admin');
    }
  }, [router]);

  useEffect(() => {
    // Load packages from localStorage or use default data
    let storedPackages = JSON.parse(localStorage.getItem('mtalii_packages'));
    if (!storedPackages) {
      const { tourPackages } = require('@/lib/data');
      localStorage.setItem('mtalii_packages', JSON.stringify(tourPackages));
      storedPackages = tourPackages;
    }
    setPackages(storedPackages);
  }, []);

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this package?')) {
      const updatedPackages = packages.filter(pkg => pkg.id !== id);
      localStorage.setItem('mtalii_packages', JSON.stringify(updatedPackages));
      setPackages(updatedPackages);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin/dashboard" className="text-primary hover:underline">
                Back to Dashboard
              </Link>
              <h1 className="text-2xl font-bold font-manrope text-charcoal-text">Manage Packages</h1>
            </div>
            <Link href="/admin/dashboard/packages/new">
              <Button>
                + Add New Package
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-4">
          {packages.length === 0 ? (
            <Card className="text-center p-12">
              <p className="text-gray-500 mb-4">No packages found</p>
              <Link href="/admin/dashboard/packages/new">
                <Button>Create Your First Package</Button>
              </Link>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {packages.map((pkg) => (
                <Card key={pkg.id} className="p-0 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gray-200 overflow-hidden">
                    {pkg.image ? (
                      <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-semibold font-manrope text-charcoal-text">{pkg.title}</h3>
                        <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                          {pkg.category}
                        </span>
                      </div>
                      <span className="text-2xl font-bold text-primary">{formatPrice(pkg)}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{pkg.description}</p>
                    <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {pkg.duration}
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/admin/dashboard/packages/${pkg.id}/edit`} className="flex-1">
                        <Button variant="secondary" className="w-full text-sm">
                          Edit
                        </Button>
                      </Link>
                      <button
                        onClick={() => handleDelete(pkg.id)}
                        className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
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
    </div>
  );
}
