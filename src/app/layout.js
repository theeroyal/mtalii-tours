import './globals.css'

export const metadata = {
  title: 'Mtalii Tours & Adventures',
  description: 'Luxury African travel experiences that create memories for a lifetime',
  icons: {
    icon: '/ChatGPT Image Jun 10, 2026, 12_20_29 AM.png',
    apple: '/ChatGPT Image Jun 10, 2026, 12_20_29 AM.png',
    shortcut: '/ChatGPT Image Jun 10, 2026, 12_20_29 AM.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
