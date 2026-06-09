'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { tourPackages as defaultPackages } from '@/lib/data';
import { formatPrice } from '@/lib/currency';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function TourDetail({ params }) {
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviewerName, setReviewerName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP || '254742932438';
  const whatsappLinkNumber = whatsappNumber.replace(/^\+/, '');

  const getAverageRating = (reviews = []) => {
    if (!reviews || !reviews.length) return 0;
    return reviews.reduce((sum, review) => sum + (review.rating || 0), 0) / reviews.length;
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!pkg) return;

    const newReview = {
      id: Date.now(),
      name: reviewerName.trim() || 'Guest',
      rating: parseInt(reviewRating, 10),
      comment: reviewComment.trim(),
      date: new Date().toISOString(),
    };

    const storedPackages = JSON.parse(localStorage.getItem('mtalii_packages')) || defaultPackages;
    const updatedPackages = storedPackages.map((p) => {
      if (p.id === pkg.id) {
        return {
          ...p,
          reviews: [...(p.reviews || []), newReview],
        };
      }
      return p;
    });

    localStorage.setItem('mtalii_packages', JSON.stringify(updatedPackages));
    setPkg((prev) => ({
      ...prev,
      reviews: [...(prev?.reviews || []), newReview],
    }));
    setReviewerName('');
    setReviewRating(5);
    setReviewComment('');
  };

  useEffect(() => {
    if (params.id) {
      let packages = JSON.parse(localStorage.getItem('mtalii_packages'));
      if (!packages) {
        packages = defaultPackages;
      }
      const found = packages.find(p => p.id === parseInt(params.id));
      setPkg(found);
      setLoading(false);
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-charcoal-text mb-4">Tour not found</h2>
          <Link href="/tours" className="text-primary hover:underline">
            Back to Tours
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="absolute inset-0 z-0">
          <img
            src={pkg.image}
            alt={pkg.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-primary/40 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="max-w-3xl">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-block px-4 py-2 bg-sand-light text-primary text-sm font-semibold rounded-full">
                {pkg.category}
              </span>
              {pkg.subcategory && (
                <span className="inline-block px-4 py-2 bg-white/90 text-slate-700 text-sm font-semibold rounded-full">
                  {pkg.subcategory}
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-manrope text-white mb-4">{pkg.title}</h1>
            <div className="flex flex-wrap items-center gap-3 text-sand-light mb-4">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <svg
                    key={index}
                    className={`w-4 h-4 ${index < Math.round(getAverageRating(pkg.reviews)) ? 'text-yellow-300' : 'text-sand-light/70'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.955a1 1 0 00.95.69h4.158c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.955c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.955a1 1 0 00-.364-1.118L2.057 9.382c-.783-.57-.38-1.81.588-1.81h4.158a1 1 0 00.95-.69L9.05 2.927z" />
                  </svg>
                ))}
              </div>
              <span>{pkg.reviews?.length ? `${getAverageRating(pkg.reviews).toFixed(1)} / 5 • ${pkg.reviews.length} reviews` : 'Be the first to review this package'}</span>
            </div>
            <p className="text-xl text-sand-light mb-6">{pkg.description}</p>
            <div className="flex flex-wrap gap-6 text-sand-light">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {pkg.duration}
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Group Size: 4-12
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Overview */}
              <div>
                <h2 className="text-2xl font-bold font-manrope text-charcoal-text mb-6">Overview</h2>
                <p className="text-gray-600 text-lg mb-4">
                  Experience the magic of Kenya with this unforgettable journey. This tour has been carefully crafted to showcase the very best of {pkg.title}, combining breathtaking wildlife encounters, stunning landscapes, and authentic cultural experiences.
                </p>
                <p className="text-gray-600 text-lg">
                  Our expert guides will ensure you have a safe, comfortable, and truly memorable adventure from start to finish.
                </p>
              </div>

              {/* Highlights */}
              <div>
                <h2 className="text-2xl font-bold font-manrope text-charcoal-text mb-6">Tour Highlights</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pkg.highlights.map((highlight, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inclusions */}
              <div>
                <h2 className="text-2xl font-bold font-manrope text-charcoal-text mb-6">What&apos;s Included</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pkg.inclusions.map((inclusion, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{inclusion}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews */}
              <div>
                <h2 className="text-2xl font-bold font-manrope text-charcoal-text mb-6">Reviews</h2>
                {pkg.reviews?.length ? (
                  <div className="space-y-6">
                    {pkg.reviews.slice().reverse().map((review) => (
                      <div key={review.id} className="p-6 border border-slate-200 rounded-2xl bg-slate-50">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="font-semibold text-charcoal-text">{review.name}</p>
                            <p className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
                          </div>
                          <span className="text-yellow-500 font-semibold">{review.rating} / 5</span>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No reviews yet. Be the first to share your experience!</p>
                )}
              </div>

              {/* Review Form */}
              <div className="pt-6 border-t border-slate-200">
                <h2 className="text-2xl font-bold font-manrope text-charcoal-text mb-6">Leave a review</h2>
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-charcoal-text mb-2">Your name</label>
                    <input
                      type="text"
                      value={reviewerName}
                      onChange={(e) => setReviewerName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full px-4 py-3 border border-warm-stone rounded-lg focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal-text mb-2">Rating</label>
                    <select
                      value={reviewRating}
                      onChange={(e) => setReviewRating(e.target.value)}
                      className="w-full px-4 py-3 border border-warm-stone rounded-lg focus:outline-none focus:border-primary"
                    >
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <option key={rating} value={rating}>{rating} stars</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal-text mb-2">Review</label>
                    <textarea
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      rows={4}
                      placeholder="Write a few words about your experience"
                      className="w-full px-4 py-3 border border-warm-stone rounded-lg focus:outline-none focus:border-primary"
                      required
                    />
                  </div>
                  <Button type="submit">Submit Review</Button>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-28 p-6">
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold font-manrope text-primary mb-1">{formatPrice(pkg.price, pkg.currency)}</div>
                  <div className="text-gray-500">per person</div>
                </div>
                <hr className="mb-6" />
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-medium">{pkg.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type</span>
                    <span className="font-medium">{pkg.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Group Size</span>
                    <span className="font-medium">4-12 people</span>
                  </div>
                </div>
                <Link href="/booking">
                  <Button className="w-full mb-3">Book Now</Button>
                </Link>
                <a href={`https://wa.me/${whatsappLinkNumber}?text=${encodeURIComponent('Hello Mtalii Tours and Adventures! I would like to inquire about this tour.')}`} target="_blank" rel="noopener noreferrer">
                  <Button variant="secondary" className="w-full">Inquire on WhatsApp</Button>
                </a>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
