import Link from 'next/link';

export default function Sidebar() {
  return (
    <div className='flex flex-col gap-2 pt-2'>
      <SidebarItem href='/posts'>Posts</SidebarItem>
      <SidebarItem href='/projects'>Projects</SidebarItem>
      <SidebarItem href='/dashboard'>Dashboard</SidebarItem>
    </div>
  );
}

function SidebarItem({
  href,
  children,
}: Readonly<{ href: string; children: React.ReactNode }>) {
  return (
    <Link
      href={href}
      className='p-2 mx-2 bg-white rounded-md border border-black dark:bg-slate-700 hover:bg-slate-400 hover:dark:bg-slate-600 transition-colors duration-150'
    >
      {children}
    </Link>
  );
}
