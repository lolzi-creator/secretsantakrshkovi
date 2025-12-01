import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Secret Santa',
  description: 'Wähle dein Geschenk aus!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body className="bg-winter-bg min-h-screen text-winter-text">
        {children}
      </body>
    </html>
  )
}

