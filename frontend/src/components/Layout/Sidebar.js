import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ChevronDown } from "lucide-react";
import { LayoutDashboard,CircleUserRound,Settings,ChartLine,FolderOpen} from "lucide-react";


const Sidebar = ({ isSidebarOpen, setIsSidebarOpen, isMobile }) => {
  const { user } = useAuth();
  const location = useLocation();
  const [activeDropdown, setActiveDropdown] = useState(null);

  console.log('User in Sidebar:', user);
  // Static links for admin
  const adminLinks = [
    { name: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard color="#645e5e" size={20} /> },
    { name: 'Users', href: '/dashboard/users', icon: <CircleUserRound color="#645e5e" />, submenu: [
      { name: 'All Users', href: '/dashboard/users/all'},
      { name: 'Add User', href: '/dashboard/users/add-user'},
      { name: 'Permissions', href: '/dashboard/users/permissions'}
    ] },
    { name: 'Categories', href: '/dashboard/categories', icon: <FolderOpen color="#645e5e"  />, submenu: [
      { name: 'All Categories', href: '/dashboard/categories/all'},
      { name: 'Add Category', href: '/dashboard/categories/add-category'},
      { name: 'All Products', href: '/dashboard/categories/all-products'},
      { name: 'Permissions', href: '/dashboard/categories/permissions'}
    ] },
    { name: 'Settings', href: '/dashboard/settings', icon: <Settings color="#645e5e" />, submenu: [
      { name: 'General', href: '/dashboard/settings/general' },
      { name: 'Security', href: '/dashboard/settings/security' },
      { name: 'Notifications', href: '/dashboard/settings/notifications' }
    ] },
    { name: 'Reports', href: '/dashboard/reports', icon: <ChartLine color="#645e5e" />, submenu: [
      { name: 'Sales', href: '/dashboard/reports/sales' },
      { name: 'Users', href: '/dashboard/reports/users' },
      { name: 'System', href: '/dashboard/reports/system' }
    ] }
  ];

  const userLinks = [
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    { name: 'Profile', href: '/dashboard/profile', icon: '👤' },
    { name: 'Orders', href: '/dashboard/orders', icon: '🛒' },
    { name: 'Settings', href: '/dashboard/settings', icon: '⚙️' }
  ];

  // Icon mapping for dynamic features
  const iconMap = {
    dashboard: <LayoutDashboard color="#645e5e" size={20} />,
    users: <CircleUserRound color="#645e5e" size={20} />,
    products: <FolderOpen color="#645e5e" size={20} />,
    orders: <FolderOpen color="#645e5e" size={20} />,
    analytics: <ChartLine color="#645e5e" size={20} />,
    inventory: <FolderOpen color="#645e5e" size={20} />,
    promotions: <FolderOpen color="#645e5e" size={20} />,
    payments: <FolderOpen color="#645e5e" size={20} />,
    shipping: <FolderOpen color="#645e5e" size={20} />,
    settings: <Settings color="#645e5e" size={20} />,
  };

  // Dynamic links
  const getDynamicLinks = (features) => {
    if (!features || typeof features !== 'object') return [];
    return Object.entries(features).map(([feature, value]) => {
      const iconKey = value.iconKey;
      const nested = value.nested;
      return {
        name: feature,
        href: `/dashboard/${feature.toLowerCase().replace(/\s+/g, '-')}`,
        icon: iconMap[iconKey] || <FolderOpen color="#645e5e" size={20} />,
        submenu: Array.isArray(nested) && nested.length > 0
          ? nested.map(n => ({
              name: n,
              href: `/dashboard/${feature.toLowerCase().replace(/\s+/g, '-')}/${n.toLowerCase().replace(/\s+/g, '-')}`
            }))
          : undefined
      };
    });
  };

  let links;
  if (user?.role === 'admin') {
    links = adminLinks;
  } else if (user?.role === 'merchant') {
    links = getDynamicLinks(user?.features);
  } else if(user?.role === 'user'){ 
       links = userLinks;
  } else {
    links = [];
  }

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const isActiveLink = (href) => location.pathname === href;
  const isActiveParent = (menu) => menu.submenu && menu.submenu.some(item => location.pathname.startsWith(item.href));

  return (
    <div className={`sidebar fixed md:relative z-40 md:z-auto bg-white w-64 min-h-screen px-4 py-6 shadow-md transition-all duration-300 ${isSidebarOpen ? 'left-0' : '-left-64 md:left-0 md:w-20'}`}>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        {isSidebarOpen ? (
          <h2 className="text-xl font-semibold text-blue-600 tracking-wide">Navigation</h2>
        ) : (
          <div className='mb-6'></div>
        )}
      </div>

      {/* Navigation */}
      <nav>
        <ul className="space-y-1">
          {links.map((link) => (
            <li className='pb-3' key={link.name}>
              {link.submenu ? (
                <>
                  <button
                    onClick={() => toggleDropdown(link.name)}
                    className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${(activeDropdown === link.name || isActiveParent(link)) ? 'bg-indigo-50 text-indigo-600' : 'hover:bg-gray-50 hover:text-indigo-500'}`}
                  >
                    <span title={link.name} className="mr-3 text-base">{link.icon}</span>
                    {isSidebarOpen && (
                      <>
                        <span className="flex-grow text-left">{link.name}</span>
                        <ChevronDown className={`w-4 h-4 ml-2 transform transition-transform duration-300 ${
                        activeDropdown === link.name ? "rotate-180 text-indigo-600" : "text-gray-500"
                        }`} />

                      </>
                    )}
                  </button>
                  {isSidebarOpen && activeDropdown === link.name && (
                    <ul className="ml-8 mt-1 space-y-1 border-l border-gray-200 pl-3 py-1">
                      {link.submenu.map((subItem) => (
                        <li key={subItem.name}>
                          <Link
                            to={subItem.href}
                            className={`block px-3 py-1.5 rounded-md text-sm transition-colors duration-200 ${isActiveLink(subItem.href) ? 'bg-indigo-50 text-indigo-600 font-medium' : 'hover:bg-gray-50 hover:text-indigo-500'}`}
                            onClick={() => { if (isMobile) setIsSidebarOpen(false); }}
                          >
                            {subItem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link
                  to={link.href}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${isActiveLink(link.href) ? 'bg-indigo-50 text-indigo-600' : 'hover:bg-gray-50 hover:text-indigo-500'}`}
                  onClick={() => { if (isMobile) setIsSidebarOpen(false); }}
                >
                  <span title={link.name} className="mr-3 text-base">{link.icon}</span>
                  {isSidebarOpen && <span>{link.name}</span>}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      {isSidebarOpen && (
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white to-indigo-100">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold mr-3">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{user?.name || 'User'}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role || 'User'}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
