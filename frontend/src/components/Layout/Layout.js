import React from 'react';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';
import { SquareChevronLeft, SquareChevronRight } from "lucide-react";
import { BetweenHorizontalEnd, BetweenHorizontalStart, ChevronDown } from "lucide-react";



const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(window.innerWidth >= 768);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsSidebarOpen(!mobile);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobile && isSidebarOpen && !event.target.closest('.sidebar') && !event.target.closest('.sidebar-toggle')) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, isSidebarOpen]);

  return (
    <div className="flex h-screen bg-gray-50 z-[100]">
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} isMobile={isMobile} />
      
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <button
          className={`sidebar-toggle fixed z-[100] top-[10px]
            ${isMobile ? (isSidebarOpen ? 'left-60 -translate-x-1/2' : 'left-4') : (isSidebarOpen ? 'md:left-[230px]' : 'md:left-4')}
            p-3 w-12 h-12 flex items-center justify-center rounded-md  text-blue-600  transition-all duration-300 hover:bg-gray-300`}
          style={isMobile && isSidebarOpen ? { transform: 'translateX(-50%)' } : undefined}
          onClick={e => {
            e.stopPropagation();
            setIsSidebarOpen(!isSidebarOpen);
          }}
          aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
        >
        {isSidebarOpen ? (
        <BetweenHorizontalEnd color="#403f3f" size={28} className="text-blue-600 transition-transform duration-300" />
        ) : (
        <BetweenHorizontalStart color="#403f3f" size={28} className="text-blue-600 transition-transform duration-300" />
        )}
        </button>
        
        <TopNavbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;