import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const inter = localFont({
    src: "../public/fonts/inter.woff2",
    variable: "--font-inter",
});

export const metadata: Metadata = {
    title: "Photon Panel",
    description: "Fast and modern server management panel",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${inter.variable} h-full bg-interface-background antialiased`}
        >
            <body className="flex h-dvh flex-col gap-lg p-lg">{children}</body>
        </html>
    );
}
