
import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Pencil, Trash2 } from "lucide-react";
import DataTable from "react-data-table-component";

// Feature list as in AddUsers.js
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
  { name: "Settings", nested: ["General", "Security", "Notifications"] },
];


const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [editForm, setEditForm] = useState({ username: '', email: '', role: '', features: '' });
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState("");
  const axiosPrivate = useAxiosPrivate();


  const fetchUsers = async () => {
      try {
        const response = await axiosPrivate.get("/users");
        let userList = Array.isArray(response.data.data)
          ? response.data.data
          : [];
        userList = userList.filter(u => u.deleted !== true);
        setUsers(userList);
        console.log("Fetched users:", userList);
      } catch (err) {
        setError("Failed to fetch users");
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };
  useEffect(() => {
    

    fetchUsers();
  }, [axiosPrivate]);

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );


  // Helper: deep clone
  const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

  // Open edit modal with features as object
  const handleEditClick = (user) => {
    setEditUser(user);
    setEditForm({
      username: user.username || '',
      email: user.email || '',
      role: user.role || '',
      features: user.features ? deepClone(user.features) : {},
    });
    setEditError("");
    setEditModalOpen(true);
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFeatureChange = (feature) => {
    setEditForm((prev) => ({
      ...prev,
      features: {
        ...prev.features,
        [feature]: prev.features[feature] ? undefined : [],
      },
    }));
  };

  const handleNestedFeatureChange = (feature, nested) => {
    setEditForm((prev) => ({
      ...prev,
      features: {
        ...prev.features,
        [feature]: prev.features[feature]?.includes(nested)
          ? prev.features[feature].filter((n) => n !== nested)
          : [...(prev.features[feature] || []), nested],
      },
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setEditLoading(true);
    setEditError("");
    try {
      const payload = {
        username: editForm.username,
        email: editForm.email,
        role: editForm.role,
        features: editForm.features,
      };
      await axiosPrivate.put(`/edituser/${editUser._id}`, payload);
      setUsers((prev) => prev.map((u) => (u._id === editUser._id ? { ...u, ...payload } : u)));
      setEditModalOpen(false);
    } catch (err) {
      setEditError(err?.response?.data?.message || "Failed to update user");
    } finally {
      setEditLoading(false);
    }
  };
  // Delete user handler
  const handleDeleteUser = async (user) => {
    if (!window.confirm(`Are you sure you want to remove all access for ${user.username}?`)) return;
    try {
      await axiosPrivate.delete(`/deleteuser/${user._id}`);
      
      // setUsers((prev) => prev.map((u) =>
      //   u._id === user._id
      //     ? { ...u, password: '', features: {}, role: '', refreshToken: '' }
      //     : u
      // ));
      fetchUsers();
    } catch (err) {
      alert(err?.response?.data?.message || 'Failed to delete user');
    }
  };

  const columns = [
    {
      name: "Username",
      selector: (row) => row.username,
      sortable: true,
      cell: (row) => (
        <span className="font-semibold text-gray-800">{row.username}</span>
      ),
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      cell: (row) => <span className="text-gray-600">{row.email}</span>,
    },
    {
      name: "Role",
      selector: (row) => row.role,
      sortable: true,
      cell: (row) => (
        <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold">
          {row.role}
        </span>
      ),
    },
    {
  name: "Actions",
  cell: (row) => (
    <div className="flex items-center space-x-4">
      {/* Edit */}
      <button
        onClick={() => handleEditClick(row)}
        className="text-indigo-500 hover:text-indigo-700 transform hover:scale-110 transition-all duration-200"
        title="Edit"
      >
        <Pencil className="w-5 h-5" />
      </button>

      {/* Delete */}
      <button
        onClick={() => handleDeleteUser(row)}
        className="text-red-500 hover:text-red-700 transform hover:scale-110 transition-all duration-200"
        title="Delete"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  ),
}

  ];

  const customStyles = {
    table: {
      style: {
        backgroundColor: "white",
        borderRadius: "0.75rem",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        overflow: "hidden",
      },
    },
    headRow: {
      style: {
        backgroundColor: "#f1f5f9",
        borderBottom: "2px solid #e5e7eb",
        fontWeight: "600",
        fontSize: "13px",
        color: "#374151",
      },
    },
    rows: {
      style: {
        fontSize: "14px",
        color: "#374151",
        "&:hover": {
          backgroundColor: "#f9fafb",
        },
      },
    },
    pagination: {
      style: {
        borderTop: "1px solid #e5e7eb",
        backgroundColor: "#fafafa",
      },
    },
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
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

  return (
    <div className="p-2">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
          User Management
        </h1>
        <div className="w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-400 text-sm"
          />
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filteredUsers}
        pagination
        highlightOnHover
        striped
        selectableRows
        persistTableHead
        responsive
        customStyles={customStyles}
        noDataComponent={
          <div className="text-gray-500 text-sm py-6">No users found</div>
        }
      />

      {/* Edit User Modal */}
{editModalOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm overflow-y-auto">
    <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-6 mx-4 md:mx-0 max-h-[90vh] overflow-y-auto animate-fadeIn">
      
      {/* Close Button */}
      <button
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors text-2xl"
        onClick={() => setEditModalOpen(false)}
      >
        &times;
      </button>

      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
        ✏️ Edit User
      </h2>

      {/* Form */}
      <form onSubmit={handleEditSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={editForm.username}
              onChange={handleEditFormChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={editForm.email}
              onChange={handleEditFormChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              required
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Role
            </label>
            <select
              name="role"
              value={editForm.role}
              onChange={handleEditFormChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              required
            >
              <option value="">Select role</option>
              <option value="admin">Admin</option>
              <option value="merchant">Merchant</option>
              <option value="user">User</option>
            </select>
          </div>
        </div>

        {/* Features for Merchant */}
        {editForm.features &&
          Object.keys(editForm.features).length >= 0 &&
          editForm.role === "merchant" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Feature Permissions
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {featureList.map((featureObj) => {
                  const feature = featureObj.name;
                  const nested = featureObj.nested || [];
                  return (
                    <div
                      key={feature}
                      className="border border-gray-200 rounded-xl p-3 bg-gray-50 hover:border-indigo-400 hover:shadow-md transition"
                    >
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={!!editForm.features[feature]}
                          onChange={() => handleFeatureChange(feature)}
                          className="h-4 w-4 rounded border-gray-400 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="text-gray-800 font-medium text-sm">
                          {feature}
                        </span>
                      </label>

                      {!!editForm.features[feature] && nested.length > 0 && (
                        <div className="ml-5 mt-1 space-y-1">
                          {nested.map((nestedItem) => (
                            <label
                              key={nestedItem}
                              className="flex items-center gap-2 cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                checked={editForm.features[feature]?.includes(
                                  nestedItem
                                )}
                                onChange={() =>
                                  handleNestedFeatureChange(feature, nestedItem)
                                }
                                className="h-4 w-4 rounded border-gray-400 text-indigo-600 focus:ring-indigo-500"
                              />
                              <span className="text-gray-600 text-xs">
                                {nestedItem}
                              </span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        {/* Error */}
        {editError && (
          <div className="text-red-500 text-sm font-medium">{editError}</div>
        )}

        {/* Buttons */}
        <div className="flex justify-end space-x-3 pt-3 border-t">
          <button
            type="button"
            className="px-4 py-2 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition font-medium"
            onClick={() => setEditModalOpen(false)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 shadow-md transition font-medium disabled:opacity-50"
            disabled={editLoading}
          >
            {editLoading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  </div>
)}


    </div>
  );
};

export default Users;
