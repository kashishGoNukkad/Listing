import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const TopNavbar = ({ onMenuClick }) => {
  const { user, logout } = useAuth()

  return (
    <nav className="z-10 bg-gradient-to-r from-blue-50 to-indigo-100 shadow-md px-4 md:px-8 py-3 flex items-center justify-between sticky top-0 z-30">

      <div className="flex items-center space-x-3 pl-10">
        <span className="text-2xl font-extrabold text-blue-700 tracking-tight select-none"></span>
      </div>

      <div className="flex items-center space-x-2 md:space-x-4">
        <div className="hidden sm:flex flex-col items-end mr-2">
          <span className="text-gray-700 font-medium text-sm">Welcome, {user?.username || 'User'}</span>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded mt-1 capitalize w-fit">{user?.role}</span>
        </div>
    {/* <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded mt-1 capitalize w-fit">
              {Array.isArray(user?.role)
                ? user.role.join(', ')
                : user?.role}
            </span> */}
        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow mr-2">
          {user?.username?.charAt(0)?.toUpperCase() || 'U'}
        </div>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-semibold shadow transition-colors text-sm"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default TopNavbar;