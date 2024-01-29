import Sidebar from '@/components/Sidebar';

export default function SidebarLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className='flex'>
      <div className='w-1/4'>
        <Sidebar />
      </div>
      <div className='w-3/4'>{children}</div>
    </div>
  );
}
