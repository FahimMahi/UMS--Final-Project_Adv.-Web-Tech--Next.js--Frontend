// pages/contact.js
import Head from 'next/head';

export default function Contact() {
  return (
    <div>
      <Head>
        <title>Contact Us - University Name</title>
      </Head>
      <main className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-50">
        <div className="max-w-4xl w-full text-center px-4">
          <h1 className="text-4xl font-bold mt-6 mb-4">Contact Us</h1>
          <p className="text-lg leading-7 mb-6">
            We’d love to hear from you! Whether you have a question about our programs, admissions, or anything else, our team is ready to answer all your questions.
          </p>
          <form className="w-full max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Your name" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Your email" />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                Message
              </label>
              <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="message" placeholder="Your message" ></textarea>
            </div>
            <div className="flex items-center justify-between">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
