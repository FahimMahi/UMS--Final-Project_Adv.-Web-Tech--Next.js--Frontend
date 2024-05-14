"use client";

import Image from 'next/image';

export default function AboutUs() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-10 bg-blue-50">
      <div className="flex flex-col items-center mt-10">
        <Image
          src="/vercel.svg" // Change to your university logo
          alt="University Logo"
          width={200}
          height={100}
          priority
        />
        <div className="text-center mt-12">
          <h1 className="text-5xl font-bold text-gray-900">About Us</h1>
          <p className="mt-4 text-xl text-gray-700">
            Welcome to our University Management System, a comprehensive platform designed to streamline your academic and administrative tasks. Our mission is to provide an integrated solution for students, faculty, and staff to manage their daily activities efficiently and effectively.
          </p>
        </div>
        <div className="mt-12 w-full max-w-4xl text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Our Vision & Mission</h2>
          <p className="text-lg text-gray-600 mb-8">
            We envision a world where technology empowers education, fostering a seamless experience for everyone involved. Our mission is to leverage cutting-edge technology to deliver an exceptional user experience, enabling users to focus on what truly matters – education.
          </p>
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Our Team</h2>
          <p className="text-lg text-gray-600 mb-8">
            Our team comprises dedicated professionals with expertise in technology and education. We are committed to continuously improving our platform to meet the evolving needs of our users.
          </p>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 border rounded-lg shadow-lg bg-blue-100">
              <h3 className="text-2xl font-bold text-blue-600 mb-4">Why Choose Us?</h3>
              <p className="text-gray-700">
                We offer a user-friendly interface, robust features, and exceptional support to ensure that you have the best possible experience. Our platform is designed to simplify your tasks and enhance productivity.
              </p>
            </div>
            <div className="p-6 border rounded-lg shadow-lg bg-green-100">
              <h3 className="text-2xl font-bold text-green-600 mb-4">Get In Touch</h3>
              <p className="text-gray-700">
                We value your feedback and are here to assist you with any questions or concerns. Feel free to reach out to us anytime, and we will be happy to help.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
