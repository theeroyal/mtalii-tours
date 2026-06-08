'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Card from '@/components/Card';
import { isLoggedIn } from '@/lib/auth';

export default function BlogPostView() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push('/admin');
    }
  }, [router]);

  useEffect(() => {
    if (id) {
      let storedPosts = JSON.parse(localStorage.getItem('mtalii_blog_posts'));
      if (!storedPosts) {
        const { blogPosts: defaultPosts } = require('@/lib/data');
        storedPosts = defaultPosts;
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-charcoal-text mb-4">Post not found</h2>
          <Link href="/admin/dashboard/blog" className="text-primary hover:underline">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b mb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/admin/dashboard/blog" className="text-primary hover:underline">
              Back to Blog
            </Link>
            <Link href={`/admin/dashboard/blog/${id}/edit`}>
              <button className="px-6 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors">
                Edit Post
              </button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <Card className="p-8">
          {post.image && (
            <div className="mb-8 rounded-lg overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-64 object-cover"
              />
            </div>
          )}
          
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            <span>{post.date}</span>
            <span>&bull;</span>
            <span>{post.readTime}</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold font-manrope text-charcoal-text mb-6">
            {post.title}
          </h1>

          <div className="text-gray-600 mb-8 text-lg">
            {post.excerpt}
          </div>

          <div className="border-t border-gray-200 pt-8">
            {renderContent(post.content)}
          </div>
        </Card>
      </div>
    </div>
  );
}
