import React, { useState, useEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { Pencil, Trash2 } from "lucide-react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); 
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosPrivate.get('/users');
        const userList = Array.isArray(response.data.data) ? response.data.data : [];
        setUsers(userList);
      } catch (err) {
        setError('Failed to fetch users');
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [axiosPrivate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }


  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
          User Management
        </h1>

        <div className="w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-indigo-300 text-sm"
          />
        </div>
      </div>

      <div className="bg-gradient-to-br from-white to-gray-50 shadow-xl rounded-2xl overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm table-auto border-collapse">
            <thead className="bg-gray-900">
              <tr>
                <th className="px-6 py-3"></th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider align-middle">
                  Username
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider align-middle">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider align-middle">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider align-middle">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-100">
              {filteredUsers.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-indigo-50 transition-colors duration-200 align-middle"
                >
                  <td className="px-6 py-3 whitespace-nowrap text-left align-middle">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-left align-middle">
                    <div className="text-sm font-semibold text-gray-900">
                      {user.username}
                    </div>
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-left align-middle">
                    <div className="text-sm text-gray-600">{user.email}</div>
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-left align-middle">
                    <span className="px-3 py-1 inline-flex text-xs font-semibold rounded-full bg-indigo-100 text-indigo-700">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-3 whitespace-nowrap text-left text-sm font-medium align-middle">
                    <div className="inline-flex gap-3">
                      <button className="p-2 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-500">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
