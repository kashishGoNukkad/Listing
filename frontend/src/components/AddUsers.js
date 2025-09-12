// import React, { useState } from 'react'
// import axios from '../utils/api';

// const roles = ["merchant", "user"];
// const featureList = [
//   { name: "Dashboard" },
//   { name: "Users", nested: ["All", "Add User", "Permissions"] },
//   { name: "Products", nested: ["All Products", "Add Product", "Categories"] },
//   { name: "Orders", nested: ["Recent Orders", "Completed", "Returns"] },
//   { name: "Analytics", nested: ["Sales", "Traffic", "Conversion"] },
//   { name: "Inventory", nested: ["Stock", "Low Stock", "Out of Stock"] },
//   { name: "Promotions", nested: ["Active", "Upcoming", "Expired"] },
//   { name: "Payments", nested: ["Received", "Pending", "Refunds"] },
//   { name: "Shipping", nested: ["In Transit", "Delivered", "Delayed"] },
//   { name: "Settings", nested: ["General", "Security", "Notifications"] }
// ];

// const AddUsers = () => {
//   const [form, setForm] = useState({
//     username: '',
//     email: '',
//     password: '',
//     roles: [],
//     features: {},
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleRoleChange = (role) => {
//     setForm((prev) => ({
//       ...prev,
//       roles: prev.roles.includes(role)
//         ? prev.roles.filter((r) => r !== role)
//         : [...prev.roles, role],
//     }));
//   };

//   const handleFeatureChange = (feature) => {
//     setForm((prev) => ({
//       ...prev,
//       features: {
//         ...prev.features,
//         [feature]: prev.features[feature]
//           ? undefined
//           : [],
//       },
//     }));
//   };

//   const handleNestedFeatureChange = (feature, nested) => {
//     setForm((prev) => ({
//       ...prev,
//       features: {
//         ...prev.features,
//         [feature]: prev.features[feature]?.includes(nested)
//           ? prev.features[feature].filter((n) => n !== nested)
//           : [...(prev.features[feature] || []), nested],
//       },
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//     setSuccess('');
//     try {
//       const payload = {
//         username: form.username,
//         email: form.email,
//         password: form.password,
//         role: form.roles[0] || '', // Only one role allowed for backend
//         features: form.features
//       };
//       const res = await axios.post('/adduser', payload);
//       setSuccess(res.data.message || 'User added successfully');
//       setForm({ username: '', email: '', password: '', roles: [], features: {} });
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to add user');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 w-full max-w-xl">
//         <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Add User</h2>
//         {error && <div className="mb-4 text-red-600 text-center">{error}</div>}
//         {success && <div className="mb-4 text-green-600 text-center">{success}</div>}
//         <div className="mb-4">
//           <label className="block text-gray-700 font-medium mb-2">Username</label>
//           <input name="username" value={form.username} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 font-medium mb-2">Email</label>
//           <input name="email" type="email" value={form.email} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 font-medium mb-2">Password</label>
//           <input name="password" type="password" value={form.password} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 font-medium mb-2">Role</label>
//           <div className="flex gap-4">
//             {roles.map((role) => (
//               <label key={role} className="flex items-center gap-2 cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={form.roles.includes(role)}
//                   onChange={() => handleRoleChange(role)}
//                   className="accent-blue-500 w-4 h-4"
//                 />
//                 <span className="text-gray-600">{role}</span>
//               </label>
//             ))}
//           </div>
//         </div>
//         <div className="mb-6">
//           <label className="block text-gray-700 font-medium mb-2">Features</label>
//           <div className="grid grid-cols-2 gap-4">
//             {featureList.map((featureObj) => {
//               const feature = featureObj.name;
//               const nested = featureObj.nested || [];
//               return (
//                 <div key={feature} className="bg-gray-50 p-3 rounded-lg shadow-sm">
//                   <label className="flex items-center gap-2 cursor-pointer">
//                     <input
//                       type="checkbox"
//                       checked={!!form.features[feature]}
//                       onChange={() => handleFeatureChange(feature)}
//                       className="accent-blue-500 w-4 h-4"
//                     />
//                     <span className="text-gray-600 font-medium">{feature}</span>
//                   </label>
//                   {!!form.features[feature] && nested.length > 0 && (
//                     <div className="ml-6 mt-2 flex flex-wrap gap-2">
//                       {nested.map((nestedItem) => (
//                         <label key={nestedItem} className="flex items-center gap-1 cursor-pointer">
//                           <input
//                             type="checkbox"
//                             checked={form.features[feature]?.includes(nestedItem)}
//                             onChange={() => handleNestedFeatureChange(feature, nestedItem)}
//                             className="accent-blue-500 w-3 h-3"
//                           />
//                           <span className="text-gray-500 text-xs">{nestedItem}</span>
//                         </label>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//         <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition duration-200" disabled={loading}>
//           {loading ? 'Adding...' : 'Add User'}
//         </button>
//       </form>
//     </div>
//   );
// }

// export default AddUsers;
import React, { useState } from 'react';
import axios from '../utils/api';

const roles = ["merchant", "user"];
const featureList = [
  { name: "Dashboard" },
  { name: "Users", nested: ["All", "Add User", "Permissions"] },
  { name: "Products", nested: ["All Products", "Add Product", "Categories"] },
  { name: "Orders", nested: ["Recent Orders", "Completed", "Returns"] },
  { name: "Analytics", nested: ["Sales", "Traffic", "Conversion"] },
  { name: "Inventory", nested: ["Stock", "Low Stock", "Out of Stock"] },
  { name: "Promotions", nested: ["Active", "Upcoming", "Expired"] },
  { name: "Payments", nested: ["Received", "Pending", "Refunds"] },
  { name: "Shipping", nested: ["In Transit", "Delivered", "Delayed"] },
  { name: "Settings", nested: ["General", "Security", "Notifications"] }
];

const AddUsers = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    roles: [],
    features: {},
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (role) => {
    setForm((prev) => ({
      ...prev,
      roles: prev.roles.includes(role)
        ? prev.roles.filter((r) => r !== role)
        : [...prev.roles, role],
    }));
  };

  const handleFeatureChange = (feature) => {
    setForm((prev) => ({
      ...prev,
      features: {
        ...prev.features,
        [feature]: prev.features[feature]
          ? undefined
          : [],
      },
    }));
  };

  const handleNestedFeatureChange = (feature, nested) => {
    setForm((prev) => ({
      ...prev,
      features: {
        ...prev.features,
        [feature]: prev.features[feature]?.includes(nested)
          ? prev.features[feature].filter((n) => n !== nested)
          : [...(prev.features[feature] || []), nested],
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const payload = {
        username: form.username,
        email: form.email,
        password: form.password,
        role: form.roles[0] || '', // Only one role allowed for backend
        features: form.features
      };
      const res = await axios.post('/adduser', payload);
      setSuccess(res.data.message || 'User added successfully');
      setForm({ username: '', email: '', password: '', roles: [], features: {} });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3 bg-gradient-to-b from-blue-600 to-indigo-700 p-8 text-white">
              <h1 className="text-2xl font-bold mb-2">User Management</h1>
              <p className="text-blue-100 opacity-90 mb-6">
                Create new users and assign specific roles and permissions to control access to system features.
              </p>
              <div className="hidden md:block">
                <div className="mt-16">
                  <div className="h-2 w-24 bg-blue-400 rounded-full mb-2"></div>
                  <div className="h-2 w-32 bg-blue-400 rounded-full opacity-80 mb-2"></div>
                  <div className="h-2 w-28 bg-blue-400 rounded-full opacity-60"></div>
                </div>
                <svg className="mt-8 w-64 mx-auto" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                  <path fill="currentColor" d="M45,-74.3C58.5,-69.2,69.2,-58.5,76.2,-45.2C83.2,-31.8,86.5,-15.9,85.9,-0.3C85.3,15.3,80.8,30.6,72.1,42.9C63.4,55.2,50.5,64.5,36.3,71.2C22.1,77.9,6.6,81.9,-7.3,80.5C-21.2,79.1,-33.5,72.2,-44.3,62.5C-55.1,52.8,-64.4,40.3,-71.5,26.1C-78.6,11.9,-83.5,-4.1,-82.1,-19.7C-80.7,-35.3,-73.1,-50.6,-61.7,-56.7C-50.3,-62.8,-35.1,-59.8,-21.9,-65.1C-8.6,-70.4,2.7,-84,15.4,-85.8C28.1,-87.6,41.1,-77.6,52.7,-66.2C64.3,-54.8,74.5,-42,79.7,-27.8C84.9,-13.6,85.1,1.9,81.3,16.2C77.5,30.5,69.7,43.6,59.3,53.9C48.9,64.2,35.9,71.7,22.3,76.3C8.7,80.9,-5.5,82.6,-18.8,80.5C-32.1,78.4,-44.5,72.5,-53.9,63.1C-63.3,53.7,-69.7,40.8,-74.2,27.3C-78.7,13.8,-81.3,-0.3,-79.7,-13.7C-78.1,-27.1,-72.3,-39.8,-63.3,-49.9C-54.3,-60,-42.1,-67.5,-29.2,-73.2C-16.3,-78.8,-2.7,-82.7,10.1,-83.3C22.9,-83.9,35.8,-81.3,47.3,-76.4C58.8,-71.5,68.9,-64.4,76.2,-55.1C83.5,-45.8,88,-34.4,89.4,-22.7C90.8,-11,89.2,1.1,85.1,12.6C81,24.1,74.5,35.1,66,44.4C57.5,53.7,47.1,61.4,35.7,66.8C24.3,72.2,12.2,75.4,-0.2,75.8C-12.6,76.3,-25.2,74.1,-36.4,69.1C-47.6,64.1,-57.4,56.4,-65.2,46.9C-73,37.5,-78.8,26.4,-81.3,14.6C-83.8,2.7,-83.1,-9.9,-79.4,-21.7C-75.7,-33.6,-69.1,-44.8,-60.2,-54.1C-51.3,-63.4,-40.2,-70.8,-28.2,-76.2C-16.2,-81.6,-3.3,-85.1,9.1,-85.4C21.5,-85.7,33.8,-82.9,45,-78.1Z" transform="translate(100 100)" />
                </svg>
              </div>
            </div>
            
            <div className="md:w-2/3 p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Create New User</h2>
              <p className="text-gray-600 mb-8">Fill in the details below to add a new user to the system</p>
              
              {error && (
                <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  {error}
                </div>
              )}
              
              {success && (
                <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg border border-green-200 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {success}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">Username</label>
                    <input 
                      name="username" 
                      value={form.username} 
                      onChange={handleChange} 
                      required 
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 outline-none" 
                      placeholder="Enter username"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
                    <input 
                      name="email" 
                      type="email" 
                      value={form.email} 
                      onChange={handleChange} 
                      required 
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 outline-none" 
                      placeholder="user@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">Password</label>
                    <input 
                      name="password" 
                      type="password" 
                      value={form.password} 
                      onChange={handleChange} 
                      required 
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 outline-none" 
                      placeholder="Enter password"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">Role</label>
                    <div className="flex gap-6">
                      {roles.map((role) => (
                        <label key={role} className="flex items-center gap-2 cursor-pointer group">
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={form.roles.includes(role)}
                              onChange={() => handleRoleChange(role)}
                              className="sr-only"
                            />
                            <div className={`h-6 w-6 rounded border-2 flex items-center justify-center transition-all duration-200 ${form.roles.includes(role) ? 'bg-blue-500 border-blue-500' : 'border-gray-300 group-hover:border-blue-400'}`}>
                              {form.roles.includes(role) && (
                                <svg className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              )}
                            </div>
                          </div>
                          <span className="text-gray-600 capitalize group-hover:text-gray-800 transition-colors duration-200">{role}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mb-8">
                  <label className="block text-gray-700 text-sm font-medium mb-4">Feature Permissions</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {featureList.map((featureObj) => {
                      const feature = featureObj.name;
                      const nested = featureObj.nested || [];
                      return (
                        <div key={feature} className="bg-gray-50 p-4 rounded-lg border border-gray-200 transition-all duration-200 hover:shadow-sm">
                          <label className="flex items-center gap-3 cursor-pointer group">
                            <div className="relative">
                              <input
                                type="checkbox"
                                checked={!!form.features[feature]}
                                onChange={() => handleFeatureChange(feature)}
                                className="sr-only"
                              />
                              <div className={`h-5 w-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${!!form.features[feature] ? 'bg-blue-500 border-blue-500' : 'border-gray-400 group-hover:border-blue-400'}`}>
                                {!!form.features[feature] && (
                                  <svg className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                )}
                              </div>
                            </div>
                            <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors duration-200">{feature}</span>
                          </label>
                          {!!form.features[feature] && nested.length > 0 && (
                            <div className="ml-8 mt-3 flex flex-wrap gap-3">
                              {nested.map((nestedItem) => (
                                <label key={nestedItem} className="flex items-center gap-2 cursor-pointer group/nested">
                                  <div className="relative">
                                    <input
                                      type="checkbox"
                                      checked={form.features[feature]?.includes(nestedItem)}
                                      onChange={() => handleNestedFeatureChange(feature, nestedItem)}
                                      className="sr-only"
                                    />
                                    <div className={`h-4 w-4 rounded border flex items-center justify-center transition-all duration-200 ${form.features[feature]?.includes(nestedItem) ? 'bg-blue-400 border-blue-400' : 'border-gray-300 group-hover/nested:border-blue-300'}`}>
                                      {form.features[feature]?.includes(nestedItem) && (
                                        <svg className="h-2 w-2 text-white" viewBox="0 0 20 20" fill="currentColor">
                                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                      )}
                                    </div>
                                  </div>
                                  <span className="text-gray-600 text-sm group-hover/nested:text-gray-800 transition-colors duration-200">{nestedItem}</span>
                                </label>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Adding User...
                    </>
                  ) : (
                    'Add User'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddUsers;