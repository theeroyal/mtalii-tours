import Link from 'next/link';

export default function Footer() {
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'mtaliitoursandadventures@gmail.com';
  const facebookUrl = process.env.NEXT_PUBLIC_FACEBOOK_URL || '#';
  const tiktokUrl = process.env.NEXT_PUBLIC_TIKTOK_URL || '#';
  const linkedinUrl = process.env.NEXT_PUBLIC_LINKEDIN_URL || '#';

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
            <div className="flex space-x-4">
              <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a href={tiktokUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
              <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2V9zm2-4a2 2 0 110 4 2 2 0 010-4z" />
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
