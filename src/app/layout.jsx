import "./globals.css";
import { Metadata } from "next"

export const metadata = {
  title: 'PRODDEC CEC'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
