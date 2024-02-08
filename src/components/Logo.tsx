import Image from 'next/image';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link
      href='/'
      className='hover:opacity-75 transition-opacity flex items-center gap-2 text-black font-semibold text-xl dark:text-white'
    >
      <Image src='/logo.svg' alt='logo' width={30} height={30} />
      Jiro
    </Link>
  );
};

export default Logo;
