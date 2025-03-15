import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import NavbarWrapper from './components/NavbarWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mav360 - Your Premier Event Venue',
  description: 'A state-of-the-art venue for sports, concerts, trade shows, and community events',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavbarWrapper />
        {children}
      </body>
    </html>
  );
}
