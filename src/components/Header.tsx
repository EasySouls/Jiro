import Link from "next/link";

const Header = () => {
    return (
        <header className='flex justify-between p-4'>
            <h1>Jiro</h1>
            <nav className='flex gap-2'>
                <Link href='/'>Home</Link>
                <Link href='/todos'>Todos</Link>
                <Link href='/projects'>Projects</Link>
            </nav>
        </header>
    );
};

export default Header;
