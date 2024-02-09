import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Jiro Dashboard',
    default: 'Jiro Dashboard',
  },
  description: 'The dashboard for managing your projects, posts and more.',
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
