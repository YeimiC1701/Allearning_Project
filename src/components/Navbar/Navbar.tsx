import React from 'react';
import Image from 'next/image';

const Navbar: React.FC = () => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <div className="flex items-center">
        <div className="flex items-center justify-center h-20">
          <Image src="/logo.png" alt="Logo" width={50} height={50} />
        </div>
      </div>
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 rounded-md"
        />
        <Image src="/profile.jpg" alt="Profile" width={40} height={40} className="rounded-full ml-4" />
      </div>
    </div>
  );
};

export default Navbar;
