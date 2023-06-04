import Sidebar from '@/components/Sidebar'
import './globals.css'
import { Space_Grotesk } from 'next/font/google'
import { Figtree } from 'next/font/google'
import { Inter } from 'next/font/google'
import SupabaseProvider from '@/providers/SupabaseProvider'
import UserProvider from '@/providers/UserProvider'

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] })
const figtree = Figtree({ subsets: ['latin'] })
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Music',
  description: 'Listen',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={spaceGrotesk.className}>
        <SupabaseProvider>
          <UserProvider>
          <Sidebar>
            {children}
          </Sidebar>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}
