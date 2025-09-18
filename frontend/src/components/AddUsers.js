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
<div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6">
  <div className="max-w-6xl mx-auto">
    <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
      <div className="flex flex-col md:flex-row">
        
        {/* Sidebar */}
        <div className="w-full md:w-1/3 bg-gray-900 text-white p-6 sm:p-10">
          <h1 className="text-2xl font-bold mb-4">User Management</h1>
          <p className="text-gray-300 text-sm">
            Create and manage users, assign roles, and control feature access with precision.
          </p>
          <div className="mt-8 hidden md:block">
            <div className="space-y-2">
              <div className="h-2 w-24 bg-gray-700 rounded"></div>
              <div className="h-2 w-32 bg-gray-700 rounded"></div>
              <div className="h-2 w-16 bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="w-full md:w-2/3 p-6 sm:p-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Create New User</h2>
          <p className="text-gray-500 mb-6 text-sm">Fill in user details below</p>

          {/* Alerts */}
          {error && (
            <div className="mb-4 p-3 sm:p-4 bg-red-100 text-red-700 border border-red-300 rounded-md text-sm sm:text-base">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 sm:p-4 bg-green-100 text-green-700 border border-green-300 rounded-md text-sm sm:text-base">
              {success}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">

            {/* Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {["username", "email", "password"].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2 capitalize">
                    {field}
                  </label>
                  <input
                    name={field}
                    type={field === "password" ? "password" : field === "email" ? "email" : "text"}
                    value={form[field]}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm sm:text-base"
                    placeholder={`Enter ${field}`}
                  />
                </div>
              ))}

              {/* Roles */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Roles</label>
                <div className="space-y-2 sm:space-y-3">
                  {roles.map((role) => (
                    <label key={role} className="flex items-center gap-2 sm:gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.roles.includes(role)}
                        onChange={() => handleRoleChange(role)}
                        className="h-4 w-4 rounded border-gray-400 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="text-gray-700 text-sm sm:text-base">{role}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Features */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Feature Permissions</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {featureList.map((featureObj) => {
                  const feature = featureObj.name;
                  const nested = featureObj.nested || [];
                  return (
                    <div
                      key={feature}
                      className="border border-gray-200 rounded-lg p-3 sm:p-4 bg-gray-50 hover:border-indigo-400 hover:shadow-sm transition"
                    >
                      <label className="flex items-center gap-2 sm:gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={!!form.features[feature]}
                          onChange={() => handleFeatureChange(feature)}
                          className="h-4 w-4 rounded border-gray-400 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="text-gray-800 font-medium text-sm sm:text-base">{feature}</span>
                      </label>

                      {!!form.features[feature] && nested.length > 0 && (
                        <div className="ml-6 mt-2 sm:mt-3 space-y-1 sm:space-y-2">
                          {nested.map((nestedItem) => (
                            <label key={nestedItem} className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={form.features[feature]?.includes(nestedItem)}
                                onChange={() => handleNestedFeatureChange(feature, nestedItem)}
                                className="h-4 w-4 rounded border-gray-400 text-indigo-600 focus:ring-indigo-500"
                              />
                              <span className="text-gray-600 text-xs sm:text-sm">{nestedItem}</span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 sm:py-3 px-4 rounded-lg font-medium text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-indigo-300 transition flex items-center justify-center text-sm sm:text-base"
            >
              {loading ? "Adding User..." : "Add User"}
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