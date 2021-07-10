import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="w-full h-12 p-2 bg-blue-300">
      <div className="w-9/12 flex items-center m-auto text-gray-900 select-none">
        <Link to="/analysis/price-area" className="cursor-pointer">
          最新數據
        </Link>
        <Link to="/analysis/price-area" className="cursor-pointer ml-4">
          歷史數據
        </Link>
      </div>
    </header>
  );
};

export default Header;
