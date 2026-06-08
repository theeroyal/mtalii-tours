'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Card from '@/components/Card';
import { isLoggedIn } from '@/lib/auth';

export default function BlogManager() {
  const router = useRouter();
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push('/admin');
    }
  }, [router]);

  useEffect(() => {
    let storedPosts = JSON.parse(localStorage.getItem('mtalii_blog_posts'));
    if (!storedPosts) {
      const { blogPosts: defaultPosts } = require('@/lib/data');
      localStorage.setItem('mtalii_blog_posts', JSON.stringify(defaultPosts));
      storedPosts = defaultPosts;
    }
    setBlogPosts(storedPosts);
  }, []);

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      const updatedPosts = blogPosts.filter(p => p.id !== id);
      localStorage.setItem('mtalii_blog_posts', JSON.stringify(updatedPosts));
      setBlogPosts(updatedPosts);
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
              <h1 className="text-2xl font-bold font-manrope text-charcoal-text">Manage Blog</h1>
            </div>
            <Link href="/admin/dashboard/blog/new">
              <button className="px-6 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors">
                + Add New Post
              </button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {blogPosts.length === 0 ? (
          <Card className="text-center p-12">
            <p className="text-gray-500 mb-6">No blog posts found</p>
            <Link href="/admin/dashboard/blog/new">
              <button className="px-6 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors">
                Create Your First Post
              </button>
            </Link>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogPosts.map((post) => (
              <Card key={post.id} className="p-0 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:grid md:grid-cols-3 gap-0">
                  <div className="h-48 md:h-auto overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="col-span-2 p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <span>{post.date}</span>
                      <span>&bull;</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-semibold font-manrope text-charcoal-text mb-2 line-clamp-1">{post.title}</h3>
                    <p className="text-gray-600 mb-6 line-clamp-3">{post.excerpt}</p>
                    <div className="flex gap-2 flex-wrap">
                      <Link href={`/admin/dashboard/blog/${post.id}/view`}>
                        <button className="px-4 py-2 bg-blue-100 text-blue-700 font-medium rounded-lg hover:bg-blue-200 transition-colors text-sm">
                          View Full Post
                        </button>
                      </Link>
                      <Link href={`/admin/dashboard/blog/${post.id}/edit`}>
                        <button className="px-4 py-2 bg-gray-100 text-charcoal-text font-medium rounded-lg hover:bg-gray-200 transition-colors text-sm">
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="px-4 py-2 text-red-600 bg-red-50 font-medium rounded-lg hover:bg-red-100 transition-colors text-sm"
                      >
                        Delete
                      </button>
                    </div>
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
