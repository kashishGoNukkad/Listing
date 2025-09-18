import React from "react";
import { Link } from "react-router-dom";
import { Users, DollarSign, ShoppingBag } from "lucide-react";

// Chart.js imports
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// Register components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Bar Chart Data
const revenueBarData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Revenue ($)",
      data: [4000, 3000, 5000, 7000, 6000, 8000],
      backgroundColor: "rgba(59, 130, 246, 0.6)",
      borderRadius: 8,
    },
  ],
};

// Doughnut Chart Data (Orders by Status)
const orderStatusData = {
  labels: ["Completed", "Pending", "Cancelled"],
  datasets: [
    {
      label: "Orders",
      data: [320, 150, 97],
      backgroundColor: ["#22c55e", "#eab308", "#ef4444"], // green, yellow, red
      borderWidth: 1,
    },
  ],
};

const AdminDashboard = () => {
  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-6">
          <h3 className="text-lg font-semibold text-gray-700">Total Users</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">1,234</p>
        </div>
        <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-6">
          <h3 className="text-lg font-semibold text-gray-700">Revenue</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">$458</p>
        </div>
        <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-6">
          <h3 className="text-lg font-semibold text-gray-700">Orders</h3>
          <p className="text-3xl font-bold text-purple-600 mt-2">567</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Bar Chart */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Monthly Revenue
          </h3>
          <Bar data={revenueBarData} options={{ responsive: true }} />
        </div>

        {/* Doughnut Chart */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Orders by Status
          </h3>
          <Doughnut data={orderStatusData} options={{ responsive: true }} />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Quick Actions
        </h3>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/dashboard/users"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
          >
            Manage Users
          </Link>
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors">
            View Reports
          </button>
          <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md transition-colors">
            System Settings
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
