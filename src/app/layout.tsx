import "@/style/globals.css";
import { Poppins } from "next/font/google";
import type { Metadata } from "next";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Warung Sumber Rezeki - Aplikasi Kasir & Pembukuan",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="w-full bg-neutral-800">
        <main className="h-dvh w-full bg-neutral-50 max-w-[430px] mx-auto">{children}</main>
      </body>
    </html>
  );
}
