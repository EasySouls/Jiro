import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Posts | Jiro',
};

export default function PostLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
