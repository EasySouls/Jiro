import Sidebar from '@/components/Sidebar';

export default function SidebarLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className='flex'>
      <div className='h-full w-fit md:w-1/4 lg:w-1/5 2xl:w-1/6'>
        <Sidebar />
      </div>
      <div className='w-full md:w-3/4 lg:w-4/5 2xl:w-5/6'>{children}</div>
    </div>
  );
}
