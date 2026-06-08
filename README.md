# Mtalii Tours and Adventures

A premium travel website for Mtalii Tours and Adventures, offering luxury safari and adventure experiences in Kenya.

## Tech Stack

- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **JavaScript** - Programming language

## Features

### Frontend
- ✅ Responsive mobile-first design
- ✅ Home page with hero, featured tours, destinations, testimonials
- ✅ About page with company story and team
- ✅ Tour packages with filtering and detailed views
- ✅ Destinations showcase
- ✅ Multi-step booking flow
- ✅ Blog section
- ✅ Contact page with form and map
- ✅ WhatsApp floating button
- ✅ Newsletter subscription

### Admin Dashboard
- ✅ Login page
- ✅ Dashboard overview with statistics
- ✅ Bookings management
- ✅ Tour packages management
- ✅ Inquiries management
- ✅ Gallery management

### Design System
- ✅ Earthy premium color palette (military green, earth brown, sand beige)
- ✅ Manrope and Plus Jakarta Sans fonts
- ✅ Modern safari luxury aesthetic

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

## Project Structure

```
mtalii-tours/
├── src/
│   ├── app/                      # App Router pages
│   │   ├── about/                # About page
│   │   ├── admin/                # Admin section
│   │   │   ├── dashboard/        # Admin dashboard
│   │   │   └── page.js           # Admin login
│   │   ├── blog/                 # Blog page
│   │   ├── booking/              # Booking flow
│   │   ├── contact/              # Contact page
│   │   ├── destinations/         # Destinations page
│   │   ├── tours/                # Tours listing
│   │   │   └── [id]/             # Tour detail page
│   │   ├── globals.css           # Global styles
│   │   ├── layout.js             # Root layout
│   │   └── page.js               # Home page
│   ├── components/               # Reusable components
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx
│   │   └── WhatsAppButton.jsx
│   └── lib/                      # Utility functions and data
│       └── data.js               # Sample data
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── next.config.js
```

## Brand Guidelines

### Colors
- **Primary (Military Green):** #4B5D3A - main brand color
- **Primary Dark:** #2F4F2F - darker shade of primary
- **Accent (Earth Brown):** #7A5A3A - accent color
- **Sand Beige:** #D8C3A5 - neutral background
- **Sand Light:** #F2E8DA - lighter neutral
- **Warm Stone:** #B8A48C - borders and dividers

### Typography
- **Headings:** Manrope (bold, structured)
- **Body:** Plus Jakarta Sans (clean, readable)

## Customization

### Updating Content
All sample content is located in `src/lib/data.js`. You can update:
- Tour packages
- Destinations
- Team members
- Testimonials
- Blog posts
- FAQ items

### Styling
Global styles and Tailwind configuration:
- `src/app/globals.css` - global styles and font imports
- `tailwind.config.js` - Tailwind customizations (colors, fonts, etc.)

## Deployment

The project is ready to deploy on Vercel:

1. Push your code to GitHub
2. Import the project on Vercel
3. Deploy!

Alternatively, you can deploy to any Node.js hosting provider.

## Next Steps for Production

For a complete production implementation, consider adding:

1. **Backend & Database**
   - Database integration (PostgreSQL, MongoDB, etc.)
   - User authentication
   - Payment processing (Stripe, M-Pesa, etc.)
   - Email notifications

2. **CMS Integration**
   - Sanity, Contentful, or Strapi for content management
   - Dynamic tour and blog management

3. **SEO & Analytics**
   - Meta tags and structured data
   - Google Analytics
   - Sitemap generation

4. **Performance**
   - Image optimization
   - Lazy loading
   - Caching strategies

## Contact

Mtalii Tours and Adventures
- Phone: +254 710 751 411
- Email: mtaliitoursandadventures@gmail.com

## License

All rights reserved.
