"use client";

import Image from 'next/image';
import { Button } from './components/button';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-10 bg-slate-300">
      <div className="flex flex-col items-center mt-10">
        <Image
          src="/vercel.svg" // Change to your university logo
          alt="University Logo"
          width={200}
          height={100}
          priority
        />
        <div className="text-center mt-12">
          <h1 className="text-4xl font-bold text-gray-800">Welcome to the University Management System</h1>
          <p className="mt-2 text-lg text-gray-600">Access all your academic and administrative tools in one place.</p>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 md:gap-8 w-full max-w-4xl">
            <Button variant="solid" color="blue-600 hover:bg-blue-700 focus:ring-blue-500">Enrollments</Button>
            <Button variant="solid" color="rounded-lg px-4 py-2 bg-green-600 hover:bg-green-700 duration-500">Course Catalog</Button>
            <Button variant="solid" color="rounded-lg px-4 py-2 bg-teal-600 hover:bg-teal-700 focus:ring-teal-500">Faculty Directory</Button>
            <Button variant="solid" color="rounded-lg px-4 py-2 bg-amber-600 hover:bg-amber-700 focus:ring-amber-500">Student Records</Button>
        </div>

      </div>
    </main>
  );
}
