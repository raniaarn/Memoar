import Head from "next/head";
import { Navbar, Footer } from '@/components/elements'
import React, { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
  metaTitle?: string;
  metaDescription?: string;
};

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
      <div className="mx-auto my-auto h-screen flex flex-col justify-center items-center">
        {children}
      </div>
      <Footer />
    </>
  );
};