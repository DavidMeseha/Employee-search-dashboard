"use client";

import React from "react";
import Header from "./Header";
import ProvideQueryClient from "@/providers/ProvideQueryClient";

type Props = { children: React.ReactNode };

export default function MainLayout({ children }: Props) {
  return (
    <>
      <Header />
      <ProvideQueryClient>
        <div className="py-4">{children}</div>
      </ProvideQueryClient>
      ;
    </>
  );
}
