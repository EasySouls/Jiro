import Image from "next/image";

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center min-h-full py-2'>
      <Image
        src='/vercel.svg'
        alt='Vercel Logo'
        className='h-1/4 w-1/4'
        width={300}
        height={300}
      />
      <h1 className='text-4xl font-bold mt-10'>Welcome to Jiro</h1>
    </div>
  );
}

