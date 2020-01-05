import React from 'react'
import Head from 'next/head'
import '../styles/index.css';

const Home = () => (
  <div>
    <Head>
      <title>Garage Manager</title>
    </Head>

    <header className="h-full bg-white">
      <div className="container mx-auto py-4">
        <h1 className="text-2xl text-center uppercase"><strong>Garage</strong><span className="font-thin">Manager</span></h1>
      </div>
    </header>
  </div>
)

export default Home
