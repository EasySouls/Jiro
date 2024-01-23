import Link from "next/link";

const Header = () => {
  return (
    <header className='flex justify-between items-center p-4 bg-slate-600'>
      <h1 className='text-2xl font-semibold'>Jiro</h1>
      <nav className='flex gap-4 hover:[&>*]:underline'>
        <Link href='/'>Home</Link>
        <Link href='/todos'>Todos</Link>
        <Link href='/projects'>Projects</Link>
      </nav>
    </header>
  );
};

export default Header;
