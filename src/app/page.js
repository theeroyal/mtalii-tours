'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Button from '@/components/Button';
import Card from '@/components/Card';
import AnimatedSection from '@/components/AnimatedSection';
import { tourPackages as defaultPackages, destinations as defaultDestinations, testimonials, blogPosts as defaultBlogPosts } from '@/lib/data';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [tourPackages, setTourPackages] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    let storedPackages = JSON.parse(localStorage.getItem('mtalii_packages'));
    if (!storedPackages) {
      storedPackages = defaultPackages;
    }
    setTourPackages(storedPackages);

    let storedDestinations = JSON.parse(localStorage.getItem('mtalii_destinations'));
    if (!storedDestinations) {
      storedDestinations = defaultDestinations;
    }
    setDestinations(storedDestinations);

    let storedBlogPosts = JSON.parse(localStorage.getItem('mtalii_blog_posts'));
    if (!storedBlogPosts) {
      storedBlogPosts = defaultBlogPosts;
    }
    setBlogPosts(storedBlogPosts);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1920&q=80"
            alt="African Safari"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-primary/30 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold font-manrope text-white mb-6 animate-pulse">
              Explore. Discover. <span className="text-sand-light">Live.</span>
            </h1>
            <p className="text-xl text-sand-light mb-8">
              Luxury African travel experiences that create memories for a lifetime. Discover the wild beauty of Kenya with Mtalii Tours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/tours">
                <Button size="lg">Explore Tours</Button>
              </Link>
              <Link href="/booking">
                <Button variant="secondary" size="lg" className="bg-white/10 border-white text-white hover:bg-white/20">
                  Book Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Search/CTA Section */}
      <AnimatedSection className="py-12 bg-white shadow-lg -mt-12 relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 rounded-2xl mx-4 sm:mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-charcoal-text mb-2">Destination</label>
            <input
              type="text"
              placeholder="Where to?"
              className="w-full px-4 py-3 border border-warm-stone rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal-text mb-2">Check In</label>
            <input
              type="date"
              className="w-full px-4 py-3 border border-warm-stone rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal-text mb-2">Guests</label>
            <select className="w-full px-4 py-3 border border-warm-stone rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20">
              <option>1 Guest</option>
              <option>2 Guests</option>
              <option>3 Guests</option>
              <option>4+ Guests</option>
            </select>
          </div>
          <div>
            <Button className="w-full">Search Tours</Button>
          </div>
        </div>
      </AnimatedSection>

      {/* Featured Packages */}
      <AnimatedSection className="py-20 md:py-32" delay={100}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-manrope text-charcoal-text mb-4">
              Featured Tour Packages
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Handcrafted experiences designed for the discerning traveler
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tourPackages.map((pkg, idx) => (
              <AnimatedSection key={pkg.id} delay={idx * 100}>
                <Link href={`/tours/${pkg.id}`}>
                  <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer">
                    <div className="relative h-56 overflow-hidden">
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
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {pkg.duration}
                      </div>
                      <h3 className="text-xl font-semibold font-manrope text-charcoal-text mb-2">{pkg.title}</h3>
                      <p className="text-gray-600 mb-4 text-sm">{pkg.description}</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-primary font-bold text-2xl">${pkg.price}</span>
                          <span className="text-gray-500 text-sm">/person</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </AnimatedSection>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/tours">
              <Button variant="secondary">View All Tours</Button>
            </Link>
          </div>
        </div>
      </AnimatedSection>

      {/* Popular Destinations */}
      <AnimatedSection className="py-20 md:py-32 bg-sand-light/30" delay={200}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-manrope text-charcoal-text mb-4">
              Popular Destinations
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the most breathtaking locations Kenya has to offer
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((dest, idx) => (
              <AnimatedSection key={dest.id} delay={idx * 100}>
                <Link href="/destinations">
                  <div className="relative h-80 rounded-2xl overflow-hidden group cursor-pointer">
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-2xl font-bold font-manrope text-white mb-2">{dest.name}</h3>
                      <p className="text-sand-light text-sm">{dest.description}</p>
                      <p className="text-sand-light text-sm mt-2">
                        <span className="font-medium">Best Time: </span>{dest.bestTime}
                      </p>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Why Choose Us */}
      <AnimatedSection className="py-20 md:py-32" delay={300}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-manrope text-charcoal-text mb-4">
              Why Travel With Mtalii
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: 'OK',
                title: 'Safe & Secure',
                description: 'Your safety is our top priority with experienced guides and comprehensive travel insurance.',
              },
              {
                icon: 'A+',
                title: 'Premium Quality',
                description: 'Luxury accommodations and personalized service for an unforgettable experience.',
              },
              {
                icon: 'EX',
                title: 'Expert Guides',
                description: 'Local experts with deep knowledge of Kenya\'s wildlife, culture, and hidden gems.',
              },
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 100}>
                <Card className="p-8 text-center">
                  <div className="text-5xl mb-6">{item.icon}</div>
                  <h3 className="text-xl font-semibold font-manrope text-charcoal-text mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Testimonials */}
      <AnimatedSection className="py-20 md:py-32 bg-primary text-white" delay={400}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-manrope mb-4">
              What Our Travelers Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <AnimatedSection key={testimonial.id} delay={idx * 100}>
                <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
                  <div className="flex items-center gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sand-light mb-6 italic">&quot;{testimonial.text}&quot;</p>
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sand-light text-sm">{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Blog Preview */}
      <AnimatedSection className="py-20 md:py-32" delay={500}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-manrope text-charcoal-text mb-4">
              Travel Insights
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tips, guides, and stories from our adventures
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts.map((post, idx) => (
              <AnimatedSection key={post.id} delay={idx * 100}>
                <div>
                  <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden flex flex-col md:flex-row">
                    <div className="md:w-1/2 h-56 md:h-auto relative overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6 md:w-1/2 flex flex-col justify-center">
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <span>{post.date}</span>
                        <span>&bull;</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="text-xl font-semibold font-manrope text-charcoal-text mb-3 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{post.excerpt}</p>
                      <Link href={`/blog/${post.id}`} className="text-primary font-medium hover:underline">
                        Read More &rarr;
                      </Link>
                    </div>
                  </Card>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/blog">
              <Button variant="secondary">Read More Articles</Button>
            </Link>
          </div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection className="py-20 md:py-32 bg-accent" delay={600}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold font-manrope text-white mb-6">
            Ready for Your Next Adventure?
          </h2>
          <p className="text-xl text-sand-light mb-8 max-w-2xl mx-auto">
            Let us help you plan the perfect journey. Contact us today to get started.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking">
              <Button className="bg-white text-accent hover:bg-sand-light">Book Now</Button>
            </Link>
            <Link href="/contact">
              <Button variant="secondary" className="border-white text-white hover:bg-white/10">Contact Us</Button>
            </Link>
          </div>
        </div>
      </AnimatedSection>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
