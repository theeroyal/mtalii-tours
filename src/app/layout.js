import './globals.css'

export const metadata = {
  title: 'Mtalii Tours & Adventures',
  description: 'Luxury African travel experiences that create memories for a lifetime',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
