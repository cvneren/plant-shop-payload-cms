import { Noto_Serif, Manrope } from 'next/font/google'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import FloatingAdminButton from '@/components/ui/FloatingAdminButton'
import { CartProvider } from '@/providers/CartProvider'
import './globals.css'
import 'material-symbols/outlined.css'

const notoSerif = Noto_Serif({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata = {
  title: 'Rooted Boutique | Premium Plant Shop',
  description: 'High-end botanical boutique with curated indoor plants.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${notoSerif.variable} ${manrope.variable}`}>
      <body className="flex flex-col min-h-screen bg-surface">
        <CartProvider>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <FloatingAdminButton />
        </CartProvider>
      </body>
    </html>
  )
}
