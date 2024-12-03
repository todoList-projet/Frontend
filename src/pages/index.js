import Login from './login.js';
import Head from 'next/head';

export default function Home() {
  return (
      <>
          <Head>
              <title>Hoppy Tasks</title>
          </Head>
          <Login/>
      </>
  );
}