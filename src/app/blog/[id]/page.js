'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Card from '@/components/Card';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { blogPosts as defaultBlogPosts } from '@/lib/data';

export default function BlogPostDetail() {
  const params = useParams();
  const id = params.id;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      let storedPosts = JSON.parse(localStorage.getItem('mtalii_blog_posts'));
      if (!storedPosts) {
        storedPosts = defaultBlogPosts;
      }
      const foundPost = storedPosts.find(p => p.id === parseInt(id));
      setPost(foundPost);
      setLoading(false);
    }
  }, [id]);

  const renderContent = (content) => {
    if (!content) return null;
    return content.split('\n').map((line, index) => {
      if (line.startsWith('## ')) {
        return (
          <h2 key={index} className="text-2xl font-bold font-manrope text-charcoal-text mt-8 mb-4">
            {line.substring(3)}
          </h2>
        );
      }
      if (line.trim() === '') {
        return <br key={index} />;
      }
      return (
        <p key={index} className="text-gray-600 mb-4 leading-relaxed">
          {line}
        </p>
      );
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-charcoal-text mb-4">Post not found</h2>
          <Link href="/blog" className="text-primary hover:underline">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="text-sand-light hover:text-white mb-6 inline-block">
            Back to Blog
          </Link>
          <h1 className="text-3xl md:text-5xl font-bold font-manrope mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sand-light">
            <span>{post.date}</span>
            <span>&bull;</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {post.image && (
            <div className="mb-12 rounded-2xl overflow-hidden shadow-lg">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-80 object-cover"
              />
            </div>
          )}

          <Card className="p-8 md:p-12">
            <div className="text-gray-600 mb-8 text-lg leading-relaxed">
              {post.excerpt}
            </div>

            <div className="border-t border-gray-200 pt-8">
              {renderContent(post.content)}
            </div>
          </Card>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
