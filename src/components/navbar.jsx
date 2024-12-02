import React from 'react';
import Link from 'next/link';

const Navbar = () => (
  <nav className="bg-gray-800 text-white p-4">
    <div className="container mx-auto flex justify-between">
      <Link href="/tasks" className="text-lg">Tasks</Link>
      <Link href="/groups" className="text-lg">Groups</Link>
      <Link href="/" className="text-lg">Logout</Link>
    </div>
  </nav>
);

export default Navbar;
