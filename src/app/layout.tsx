import './globals.css'
import type { Metadata } from 'next'
import { Roboto as FontSans } from 'next/font/google'
import { cn } from '@/lib/utils'
import { Header } from '@/components/Header'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: '400',
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body
        className={cn(
          'flex min-h-screen flex-col bg-foreground font-sans text-background antialiased',
          fontSans.variable,
        )}
      >
        <Header />
        {children}
      </body>
    </html>
  )
}
