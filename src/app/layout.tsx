import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "[Master] Steam",
  description: "STADVDB-MCO2",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Header Section */}
        <header className="bg-gray-800 text-white p-4">
          <nav className="flex justify-between items-center">
            <div className="text-lg font-bold"><a href="/" className="hover:text-gray-400">Steam Games</a></div>
            <ul className="flex space-x-6">
              <li>
                <a href="/about" className="hover:text-gray-400">Master Node</a>
              </li>
              <li>
                <a href="/services" className="hover:text-gray-400">Node 2</a>
              </li>
              <li>
                <a href="/contact" className="hover:text-gray-400">Node 3</a>
              </li>
            </ul>
          </nav>
        </header>

        {/* Main Content */}
        <main className="container mx-auto p-6">
          {children}
        </main>

      </body>
    </html>
  );
}
