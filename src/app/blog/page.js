'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Card from '@/components/Card';
import AnimatedSection from '@/components/AnimatedSection';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { blogPosts as defaultBlogPosts } from '@/lib/data';

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    let storedPosts = JSON.parse(localStorage.getItem('mtalii_blog_posts'));
    if (!storedPosts) {
      storedPosts = defaultBlogPosts;
    }
    setBlogPosts(storedPosts);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <AnimatedSection className="pt-32 pb-20 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-manrope mb-4">Travel Insights</h1>
          <p className="text-xl text-sand-light">Tips, guides, and stories from our adventures</p>
        </div>
      </AnimatedSection>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {blogPosts.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold text-charcoal-text mb-4">No blog posts yet</h2>
              <p className="text-gray-600">Check back soon for exciting travel stories!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {blogPosts.map((post, idx) => (
                <AnimatedSection key={post.id} delay={idx * 100}>
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
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
