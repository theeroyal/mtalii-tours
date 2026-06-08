'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import { login, isLoggedIn, getRemainingAttempts, initializeAuth } from '@/lib/auth';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState({ remaining: 3, lockout: false, seconds: 0 });
  const [countdown, setCountdown] = useState(0);
  const router = useRouter();

  const updateAttempts = useCallback(() => {
    const status = getRemainingAttempts();
    setAttempts(status);
    setCountdown(status.lockout ? status.seconds : 0);
  }, []);

  useEffect(() => {
    initializeAuth();
    if (isLoggedIn()) {
      router.push('/admin/dashboard');
    }
    updateAttempts();
  }, [router, updateAttempts]);

  useEffect(() => {
    if (!attempts.lockout) return undefined;
    if (countdown <= 0) {
      updateAttempts();
      return undefined;
    }

    const interval = setInterval(() => {
      setCountdown(prev => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [attempts.lockout, countdown, updateAttempts]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const result = login(email, password);
    if (result.success) {
      router.push('/admin/dashboard');
    } else {
      setError(result.error);
      updateAttempts();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-primary-dark">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-manrope text-charcoal-text">Mtalii Tours</h1>
          <p className="text-gray-600 mt-2">Admin Dashboard Login</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {attempts.lockout ? (
          <div className="text-center py-12">
            <div className="text-5xl mb-4" aria-hidden="true">!</div>
            <h3 className="text-xl font-bold text-charcoal-text mb-2">Account Locked</h3>
            <p className="text-gray-600">Too many login attempts! Please wait {countdown} seconds.</p>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-charcoal-text mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter admin email"
                  className="w-full px-4 py-3 border border-warm-stone rounded-lg focus:outline-none focus:border-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal-text mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full px-4 py-3 border border-warm-stone rounded-lg focus:outline-none focus:border-primary"
                  required
                />
              </div>

              <div className="text-sm text-gray-500">
                {attempts.remaining > 0 ? (
                  <span>Attempts remaining: {attempts.remaining}</span>
                ) : null}
              </div>

              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>

            <div className="mt-6 text-center">
              <a href="/" className="text-primary hover:underline text-sm">
                Back to Website
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
