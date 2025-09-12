// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../../contexts/AuthContext';

// const Sidebar = () => {
//   const { user } = useAuth();

//   const adminLinks = [
//     { name: 'Dashboard', href: '/dashboard', icon: '📊' },
//     { name: 'Users', href: '/dashboard/users', icon: '👥' },
//     { name: 'Settings', href: '/dashboard/settings', icon: '⚙️' },
//     { name: 'Reports', href: '/dashboard/reports', icon: '📈' }
//   ];

//   const merchantLinks = [
//     { name: 'Dashboard', href: '/dashboard', icon: '📊' },
//     { name: 'Products', href: '/dashboard/products', icon: '📦' },
//     { name: 'Orders', href: '/dashboard/orders', icon: '🛒' },
//     { name: 'Analytics', href: '/dashboard/analytics', icon: '📈' }
//   ];

//   const userLinks = [
//     { name: 'Dashboard', href: '/dashboard', icon: '📊' },
//     { name: 'Profile', href: '/dashboard/profile', icon: '👤' },
//     { name: 'Orders', href: '/dashboard/orders', icon: '🛒' },
//     { name: 'Settings', href: '/dashboard/settings', icon: '⚙️' }
//   ];

//   const links = user?.role === 'admin' 
//     ? adminLinks 
//     : user?.role === 'merchant' 
//       ? merchantLinks 
//       : userLinks;

//   return (
//     <div className="bg-gray-800 text-white w-64 min-h-screen p-4">
//       <div className="mb-8">
//         <h2 className="text-xl font-bold">Navigation</h2>
//       </div>
      
//       <nav>
//         <ul className="space-y-2">
//           {links.map((link) => (
//             <li key={link.name}>
//               <Link
//                 to={link.href}
//                 className="flex items-center p-2 rounded-md hover:bg-gray-700 transition-colors"
//               >
//                 <span className="mr-3">{link.icon}</span>
//                 {link.name}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';


const Sidebar = ({ isSidebarOpen, setIsSidebarOpen, isMobile }) => {
  const { user } = useAuth();
  const location = useLocation();
  const [activeDropdown, setActiveDropdown] = useState(null);

  // console.log('User in Sidebar:', user);
  // Static links for admin
  const adminLinks = [
    { name: 'Dashboard', href: '/dashboard', icon: '📊' },
    { name: 'Users', href: '/dashboard/users', icon: '👥', submenu: [
      { name: 'All Users', href: '/dashboard/users/all'},
      { name: 'Add User', href: '/dashboard/users/add-user'},
      { name: 'Permissions', href: '/dashboard/users/permissions'}
    ] },
    { name: 'Categories', href: '/dashboard/categories', icon: '�', submenu: [
      { name: 'All Categories', href: '/dashboard/categories/all'},
      { name: 'Add Category', href: '/dashboard/categories/add-category'},
      { name: 'All Products', href: '/dashboard/categories/all-products'},
      { name: 'Permissions', href: '/dashboard/categories/permissions'}
    ] },
    { name: 'Settings', href: '/dashboard/settings', icon: '⚙️', submenu: [
      { name: 'General', href: '/dashboard/settings/general' },
      { name: 'Security', href: '/dashboard/settings/security' },
      { name: 'Notifications', href: '/dashboard/settings/notifications' }
    ] },
    { name: 'Reports', href: '/dashboard/reports', icon: '📈', submenu: [
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
  
  // Dynamic links for merchant/user based on features
  const getDynamicLinks = (features) => {
    if (!features || typeof features !== 'object') return [];
    return Object.entries(features).map(([feature, nested]) => ({
      name: feature,
      href: `/dashboard/${feature.toLowerCase().replace(/\s+/g, '-')}`,
      icon: '🔗',
      submenu: Array.isArray(nested) && nested.length > 0
        ? nested.map(n => ({
            name: n,
            href: `/dashboard/${feature.toLowerCase().replace(/\s+/g, '-')}/${n.toLowerCase().replace(/\s+/g, '-')}`
          }))
        : undefined
    }));
  };

  // let links;
  // if (user?.role === 'admin') {
  //   links = adminLinks;
  // } else if (user?.role === 'merchant' || user?.role === 'user') {
  //   links = getDynamicLinks(user?.features);
  // } else {
  //   links = [];
  // }


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
    <div className={`sidebar fixed md:relative z-40 md:z-auto bg-gradient-to-b from-blue-50 to-indigo-50 text-gray-800 w-64 min-h-screen px-4 py-6 shadow-lg transition-all duration-300 ${isSidebarOpen ? 'left-0' : '-left-64 md:left-0 md:w-20'}`}>
      <div className="mb-8 flex items-center justify-between">
        {isSidebarOpen ? (
          <h2 className="text-xl font-bold text-blue-600">Navigation</h2>
        ) : (
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold mx-auto">N</div>
        )}
      </div>
      <nav>
        <ul className="space-y-1">
          {links.map((link) => (
            <li key={link.name}>
              {link.submenu ? (
                <>
                  <button
                    onClick={() => toggleDropdown(link.name)}
                    className={`w-full flex items-center p-3 rounded-md transition-all duration-200 ${(activeDropdown === link.name || isActiveParent(link)) ? 'bg-blue-100 text-blue-600' : 'hover:bg-blue-50 hover:text-blue-500'}`}
                  >
                    {isSidebarOpen ? (
                      <span className="mr-3 text-lg">{link.icon}</span>
                    ) : (
                      <span title={link.name} className="mr-3 text-lg">{link.icon}</span>
                    )}
                    {isSidebarOpen && (
                      <>
                        <span className="flex-grow text-left">{link.name}</span>
                        <span className={`transform transition-transform ${activeDropdown === link.name ? 'rotate-180' : ''}`}>▼</span>
                      </>
                    )}
                  </button>
                  {isSidebarOpen && activeDropdown === link.name && (
                    <ul className="ml-8 mt-1 space-y-1 border-l-2 border-blue-200 pl-3 py-1">
                      {link.submenu.map((subItem) => (
                        <li key={subItem.name}>
                          <Link
                            to={subItem.href}
                            className={`block p-2 rounded-md text-sm transition-all duration-200 ${isActiveLink(subItem.href) ? 'text-blue-600 font-medium' : 'hover:text-blue-500'}`}
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
                  className={`flex items-center p-3 rounded-md transition-all duration-200 ${isActiveLink(link.href) ? 'bg-blue-100 text-blue-600' : 'hover:bg-blue-50 hover:text-blue-500'}`}
                  onClick={() => { if (isMobile) setIsSidebarOpen(false); }}
                >
                  <span title={link.name} className="mr-3 text-lg">{link.icon}</span>
                  {isSidebarOpen && <span>{link.name}</span>}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
      {isSidebarOpen && (
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-blue-100 bg-white">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold mr-3">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div>
              <p className="text-sm font-medium">{user?.name || 'User'}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role || 'User'}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;