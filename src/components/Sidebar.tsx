import Link from 'next/link';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import { CodeBracketSquareIcon } from '@heroicons/react/24/outline';
import { BuildingStorefrontIcon } from '@heroicons/react/24/outline';
import { ChatBubbleBottomCenterIcon } from '@heroicons/react/24/outline';
import { ComputerDesktopIcon } from '@heroicons/react/24/outline';

export default function Sidebar() {
  return (
    <div className='flex flex-col gap-2 pt-2'>
      <SidebarItem href='/posts'>
        <ChatBubbleBottomCenterIcon className='w-6 h-6' />
        Posts
      </SidebarItem>
      <SidebarItem href='/projects'>
        <ComputerDesktopIcon className='w-6 h-6' />
        Projects
      </SidebarItem>
      <SidebarItem href='/dashboard'>
        <CodeBracketSquareIcon className='w-6 h-6' />
        Dashboard
      </SidebarItem>
      <SidebarItem href='/organizations'>
        <BuildingStorefrontIcon className='w-6 h-6' />
        Organizations
      </SidebarItem>
      <SidebarItem href='/dashboard/settings'>
        <AdjustmentsHorizontalIcon className='w-6 h-6' />
        Settings
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
      className='p-2 mx-2 bg-white rounded-md border border-black dark:bg-slate-700 hover:bg-slate-400 hover:dark:bg-slate-600 transition-colors duration-150'
    >
      <div className='flex items-center gap-2'>{children}</div>
    </Link>
  );
}
