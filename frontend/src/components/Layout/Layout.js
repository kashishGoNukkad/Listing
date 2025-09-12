import React from 'react';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';

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
            p-3 w-12 h-12 flex items-center justify-center rounded-md bg-blue-100 text-blue-600 shadow-md transition-all duration-300 hover:bg-blue-200`}
          style={isMobile && isSidebarOpen ? { transform: 'translateX(-50%)' } : undefined}
          onClick={e => {
            e.stopPropagation();
            setIsSidebarOpen(!isSidebarOpen);
          }}
          aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
        >
          {isSidebarOpen ? (
            // <span className="text-2xl">✕</span>
            <img src="/sidebar-2.png" alt="Open sidebar" className="w-7 h-7 object-contain" />
          ) : (
            <img src="/sidebar.png" alt="Open sidebar" className="w-7 h-7 object-contain" />
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