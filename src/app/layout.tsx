import type { Metadata } from "next";
import { Epilogue } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import React from "react";
import ProvideQueryClient from "@/providers/ProvideQueryClient";
import "react-loading-skeleton/dist/skeleton.css";

const epilogue = Epilogue({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={epilogue.className}>
        <ProvideQueryClient>
          <Header />
          <div className="py-4">{children}</div>
        </ProvideQueryClient>
      </body>
    </html>
  );
}
