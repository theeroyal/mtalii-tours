'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import Card from '@/components/Card';
import { isLoggedIn } from '@/lib/auth';

export default function BlogForm() {
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
    title: '',
    excerpt: '',
    content: '',
    image: '',
    date: new Date().toISOString().split('T')[0],
    readTime: '5 min read'
  });

  const [loading, setLoading] = useState(isEdit);

  useEffect(() => {
    if (isEdit && id) {
      let storedPosts = JSON.parse(localStorage.getItem('mtalii_blog_posts'));
      if (!storedPosts) {
        const { blogPosts: defaultPosts } = require('@/lib/data');
        storedPosts = defaultPosts;
      }
      const post = storedPosts.find(p => p.id === parseInt(id));
      if (post) {
        setFormData({
          title: post.title,
          excerpt: post.excerpt,
          content: post.content || '',
          image: post.image,
          date: post.date,
          readTime: post.readTime
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

    let storedPosts = JSON.parse(localStorage.getItem('mtalii_blog_posts'));
    if (!storedPosts) {
      const { blogPosts: defaultPosts } = require('@/lib/data');
      storedPosts = defaultPosts;
    }

    if (isEdit) {
      storedPosts = storedPosts.map(p => {
        if (p.id === parseInt(id)) {
          return { ...p, ...formData };
        }
        return p;
      });
    } else {
      const newPost = {
        id: Date.now(),
        ...formData
      };
      storedPosts.push(newPost);
    }

    localStorage.setItem('mtalii_blog_posts', JSON.stringify(storedPosts));
    router.push('/admin/dashboard/blog');
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
          <Link href="/admin/dashboard/blog" className="text-primary hover:underline">
            Back to Blog
          </Link>
          <h1 className="text-2xl font-bold font-manrope text-charcoal-text">
            {isEdit ? 'Edit Blog Post' : 'Add New Blog Post'}
          </h1>
        </div>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-charcoal-text mb-2">Post Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., The Ultimate Guide to Planning Your Safari"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal-text mb-2">Excerpt</label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                rows={4}
                placeholder="A brief summary of the blog post..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal-text mb-2">Full Blog Content</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows={15}
                placeholder="Write your full blog post here. You can use line breaks for paragraphs..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal-text mb-2">Featured Image URL</label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-charcoal-text mb-2">Publication Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal-text mb-2">Read Time</label>
                <input
                  type="text"
                  name="readTime"
                  value={formData.readTime}
                  onChange={handleChange}
                  placeholder="e.g., 8 min read"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  required
                />
              </div>
            </div>

            <div className="flex gap-4 justify-end pt-4">
              <Link href="/admin/dashboard/blog">
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
                {isEdit ? 'Update Post' : 'Save Post'}
              </button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
