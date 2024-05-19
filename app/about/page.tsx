// pages/about.js
import Head from 'next/head';

export default function About() {
  return (
    <div>
      <Head>
        <title>About Us</title>
      </Head>
      <main className="flex flex-col items-center justify-center min-h-screen py-2">
        <div className="max-w-4xl w-full text-center px-4">
          <h1 className="text-4xl font-bold mt-6 mb-4">About US</h1>
          <p className="text-lg leading-7 mb-6">
            Welcome to University Name, a place of learning, growth, and innovation. Our institution has been at the forefront of education since its inception, providing top-notch education and fostering an environment of academic excellence.
          </p>
          <p className="text-lg leading-7 mb-6">
            At University Name, we are committed to creating a diverse and inclusive community where students can thrive both academically and personally. Our dedicated faculty and state-of-the-art facilities ensure that our students are well-prepared for the future.
          </p>
          <p className="text-lg leading-7 mb-6">
            With a wide range of programs and a rich history of success, University Name stands out as a leader in higher education. We invite you to explore our campus, engage with our community, and become a part of our story.
          </p>
        </div>
      </main>
    </div>
  );
}
