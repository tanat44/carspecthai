import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Geist, Geist_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "carspecthai เปรียบเทียบสเปกรถทุกรุ่นขายในเมืองไทย",
  description:
    "เดต้าเบสรถในเมืองไทย สามารถเปรียบเทียบรุ่นรถคนละค่าย จัดอันดับตามราคา ขนาดความยาว ความสูงใต้ท้อง ปริมาตรห้องโดยสาร อัตราเร่ง0-100 ระยะทางต่อการชาร์จ WLTP",
  keywords: [
    "เปรียบเทียบรถ",
    "จัดอันดับรถอีีวี",
    "เปรียบเทียบรถอีวี",
    "tesla model 3 vs model y",
  ],
  authors: [{ name: "tanat44", url: "https://github.com/tanat44/carspecthai" }],
  creator: "tanat44",
  icons: ["favicon.ico", "icon.png"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={cn(
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        ibmPlexSans.variable,
      )}
    >
      <body>{children}</body>
    </html>
  );
}
