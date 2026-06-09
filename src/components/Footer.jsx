import Link from 'next/link';

export default function Footer() {
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'mtaliitoursandadventures@gmail.com';
  const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL || '#';
  const tiktokUrl = process.env.NEXT_PUBLIC_TIKTOK_URL || '#';
  const facebookUrl = process.env.NEXT_PUBLIC_FACEBOOK_URL || '#';
  const xUrl = process.env.NEXT_PUBLIC_X_URL || '#';

  return (
    <footer className="bg-primary-dark text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold font-manrope mb-4">
              Mtalii <span className="text-sand">Tours</span>
            </h3>
            <p className="text-sand-light opacity-90 mb-6 max-w-md">
              Explore. Discover. Live. Luxury African travel experiences that create memories for a lifetime.
            </p>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-4">
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7.75 2h8.5C19.55 2 22 4.45 22 7.75v8.5C22 19.55 19.55 22 16.25 22h-8.5C4.45 22 2 19.55 2 16.25v-8.5C2 4.45 4.45 2 7.75 2Zm8.5 1.5h-8.5C5.06 3.5 3.5 5.06 3.5 7.75v8.5c0 2.69 1.56 4.25 4.25 4.25h8.5c2.69 0 4.25-1.56 4.25-4.25v-8.5c0-2.69-1.56-4.25-4.25-4.25Zm-4.25 3.25a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11Zm0 1.5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm5.5-.25a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z" />
                </svg>
              </a>
              <a href={tiktokUrl} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.53 2.02h2.14c.07 0 .16.01.23.02v6.07c0 2.77 1.56 4.8 4.1 5.35v1.85c-1.23-.34-2.18-1.05-2.9-2.01-.86-1.15-1.25-2.54-1.25-4.22v-2.66h-1.68c-2.2 0-4 1.78-4 3.98 0 1.39.7 2.64 1.8 3.36.5.33 1.06.57 1.65.72v2.03c-.76-.29-1.45-.71-2.05-1.24-1.4-1.15-2.25-2.85-2.25-4.79 0-3.33 2.7-6.03 6.03-6.03Z" />
                </svg>
              </a>
              <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13.5 22V13.9h2.48l.37-2.88H13.5V8.48c0-.83.23-1.4 1.43-1.4h1.53V4.02c-.27-.03-1.2-.12-2.28-.12-2.26 0-3.8 1.38-3.8 3.92v2.18H7.5v2.88h2.35V22h2.65Z" />
                </svg>
              </a>
              <a href={xUrl} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.47 6.45c.38-.7.26-1.55-.34-2.08-.6-.52-1.47-.53-2.05-.01l-5.18 4.03-4.77-4.03c-.58-.51-1.47-.5-2.05.02-.59.52-.7 1.35-.29 2.05l3.39 5.56-4.01 3.3c-.58.48-.72 1.35-.33 2.03.38.68 1.16 1.06 1.95 1.06.38 0 .77-.1 1.11-.32l5.55-3.1 4.47 3.5c.2.15.44.22.68.22.34 0 .67-.14.92-.4.6-.57.71-1.48.26-2.15l-3.03-5.24 3.52-2.74Z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sand-light hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/tours" className="text-sand-light hover:text-white transition-colors">Tour Packages</Link></li>
              <li><Link href="/destinations" className="text-sand-light hover:text-white transition-colors">Destinations</Link></li>
              <li><Link href="/blog" className="text-sand-light hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="text-sand-light hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Contact</h4>
            <ul className="space-y-2 text-sand-light">
              <li>{contactEmail}</li>
              <li>+254742932438</li>
              <li>Nairobi, Kenya</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8 text-center text-sand-light">
          <p>&copy; {new Date().getFullYear()} Mtalii Tours and Adventures. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
