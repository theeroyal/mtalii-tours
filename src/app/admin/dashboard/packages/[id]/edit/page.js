'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { isLoggedIn } from '@/lib/auth';
import { packageCategories } from '@/lib/data';

export default function EditPackage() {
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push('/admin');
    }
  }, [router]);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    currency: 'USD',
    duration: '',
    image: '',
    category: 'Safaris',
    subcategory: packageCategories['Safaris'][0],
    inclusions: '',
    highlights: ''
  });
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      // Load packages from localStorage or use default data
      let packages = JSON.parse(localStorage.getItem('mtalii_packages'));
      if (!packages) {
        const { tourPackages } = require('@/lib/data');
        packages = tourPackages;
      }
      
      const pkg = packages.find(p => p.id === parseInt(id));
      if (pkg) {
        setFormData({
          title: pkg.title,
          description: pkg.description,
          price: pkg.price.toString(),
          currency: pkg.currency || 'USD',
          duration: pkg.duration,
          image: pkg.image || '',
          category: pkg.category,
          subcategory: pkg.subcategory || packageCategories[pkg.category]?.[0] || '',
          inclusions: pkg.inclusions.join(', '),
          highlights: pkg.highlights.join(', ')
        });
      }
      setLoading(false);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: value,
      };
      if (name === 'category') {
        updated.subcategory = packageCategories[value]?.[0] || '';
      }
      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Parse inclusions and highlights from comma-separated strings
    const inclusionsArray = formData.inclusions.split(',').map(item => item.trim()).filter(item => item);
    const highlightsArray = formData.highlights.split(',').map(item => item.trim()).filter(item => item);

    // Get current packages
    let packages = JSON.parse(localStorage.getItem('mtalii_packages')) || [];
    
    // Update existing package
    packages = packages.map(pkg => {
      if (pkg.id === parseInt(id)) {
        return {
          ...pkg,
          title: formData.title,
          description: formData.description,
          price: parseInt(formData.price),
          currency: formData.currency,
          duration: formData.duration,
          image: formData.image || 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80',
          category: formData.category,
          subcategory: formData.subcategory,
          inclusions: inclusionsArray,
          highlights: highlightsArray
        };
      }
      return pkg;
    });

    // Save to localStorage
    localStorage.setItem('mtalii_packages', JSON.stringify(packages));

    // Redirect back to packages list
    router.push('/admin/dashboard/packages');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <Link href="/admin/dashboard/packages" className="text-primary hover:underline">
            Back to Packages
          </Link>
          <h1 className="text-2xl font-bold font-manrope text-charcoal-text">Edit Package</h1>
        </div>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-charcoal-text mb-2">Package Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Maasai Mara Safari"
                  className="w-full px-4 py-3 border border-warm-stone rounded-lg focus:outline-none focus:border-primary"
                  required
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-charcoal-text mb-2">Price</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder={formData.currency === 'KES' ? '250000' : '2499'}
                    className="w-full px-4 py-3 border border-warm-stone rounded-lg focus:outline-none focus:border-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal-text mb-2">Currency</label>
                  <select
                    name="currency"
                    value={formData.currency}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-warm-stone rounded-lg focus:outline-none focus:border-primary"
                    required
                  >
                    <option value="USD">USD</option>
                    <option value="KES">KES</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-charcoal-text mb-2">Duration</label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="7 days"
                  className="w-full px-4 py-3 border border-warm-stone rounded-lg focus:outline-none focus:border-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal-text mb-2">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-warm-stone rounded-lg focus:outline-none focus:border-primary"
                  required
                >
                  {Object.keys(packageCategories).map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal-text mb-2">Subcategory</label>
              <select
                name="subcategory"
                value={formData.subcategory}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-warm-stone rounded-lg focus:outline-none focus:border-primary"
                required
              >
                {packageCategories[formData.category].map((sub) => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal-text mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                placeholder="Enter package description..."
                className="w-full px-4 py-3 border border-warm-stone rounded-lg focus:outline-none focus:border-primary"
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
                className="w-full px-4 py-3 border border-warm-stone rounded-lg focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal-text mb-2">Inclusions (comma-separated)</label>
              <textarea
                name="inclusions"
                value={formData.inclusions}
                onChange={handleChange}
                rows={3}
                placeholder="Luxury tented accommodation, Game drives, All meals, Park fees, Professional guide"
                className="w-full px-4 py-3 border border-warm-stone rounded-lg focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal-text mb-2">Highlights (comma-separated)</label>
              <textarea
                name="highlights"
                value={formData.highlights}
                onChange={handleChange}
                rows={3}
                placeholder="Witness the Great Migration, Meet the Maasai community, Hot air balloon safari"
                className="w-full px-4 py-3 border border-warm-stone rounded-lg focus:outline-none focus:border-primary"
              />
            </div>

            <div className="flex gap-4 justify-end">
              <Link href="/admin/dashboard/packages">
                <Button variant="secondary">Cancel</Button>
              </Link>
              <Button type="submit">Update Package</Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
