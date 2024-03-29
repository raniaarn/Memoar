import Head from "next/head";
import { Navbar, Footer } from '@/components/elements'
import React from 'react';
import { LayoutProps } from "../types/layoutProps";

export const Layout: React.FC<LayoutProps> = ({ children, metaTitle, metaDescription }) => {
  return (
    <>
      <Head>
        <title>{`Memoar - ${metaTitle}`}</title>
        <meta
          name="description"
          content={metaDescription || "Memoar"}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}
