import type { Metadata } from "next";
import "./globals.css";



export const metadata: Metadata = {
  title: "Cripsy - Your E-commerce Site",
  description: "Discover amazing products at Cripsy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        
      >
        {children}
      </body>
    </html>
  );
}
