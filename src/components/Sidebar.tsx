import Link from 'next/link';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import { CodeBracketSquareIcon } from '@heroicons/react/24/outline';
import { BuildingStorefrontIcon } from '@heroicons/react/24/outline';
import { ChatBubbleBottomCenterIcon } from '@heroicons/react/24/outline';
import { ComputerDesktopIcon } from '@heroicons/react/24/outline';

export default function Sidebar() {
  return (
    <div className='h-full flex flex-col gap-2 py-2 bg-slate-300 dark:bg-slate-600  border-r shadow-lg'>
      <SidebarItem href='/posts'>
        <ChatBubbleBottomCenterIcon className='w-6 h-6' />
        <span className='hidden md:block'>Posts</span>
      </SidebarItem>
      <SidebarItem href='/projects'>
        <ComputerDesktopIcon className='w-6 h-6' />
        <span className='hidden md:block'>Projects</span>
      </SidebarItem>
      <SidebarItem href='/dashboard'>
        <CodeBracketSquareIcon className='w-6 h-6' />
        <span className='hidden md:block'>Dashboard</span>
      </SidebarItem>
      <SidebarItem href='/organizations'>
        <BuildingStorefrontIcon className='w-6 h-6' />
        <span className='hidden md:block'>Organizations</span>
      </SidebarItem>
      <SidebarItem href='/dashboard/settings'>
        <AdjustmentsHorizontalIcon className='w-6 h-6' />
        <span className='hidden md:block'>Settings</span>
      </SidebarItem>
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
      className='p-2 mx-2 bg-slate-200 rounded-md border border-black dark:bg-slate-800 hover:bg-slate-300 hover:dark:bg-slate-700 transition-colors duration-150'
    >
      <div className='flex items-center gap-2'>{children}</div>
    </Link>
  );
}
