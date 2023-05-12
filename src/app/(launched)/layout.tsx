'use client';
import dynamic from 'next/dynamic';

const RootLayout = dynamic(()=>{
  return import('./rootLayout');
}, {ssr:false})

function Layout({ children }: any) {
  return <RootLayout>{children}</RootLayout>;
}
export default Layout;
