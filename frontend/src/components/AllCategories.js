import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import axios from '../utils/api';
import { FaEdit, FaEye, FaPlus } from 'react-icons/fa';
import { FaTimes, FaSave } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllCategories = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [filterPlatform, setFilterPlatform] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showCreateProductModal, setShowCreateProductModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  // Toast helpers
  const showSuccess = (msg) => toast.success(msg, { position: 'top-right' });
  const showError = (msg) => toast.error(msg, { position: 'top-right' });

  // Fetch all categories
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    setLoading(true);
    axios.get('/all-categories')
      .then(response => {
        setCategories(response.data.data);
        setFilteredCategories(response.data.data);
        setLoading(false);
        showSuccess('Categories loaded successfully!');
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
        showError('Error fetching categories!');
      });
  };

  // Apply filters
  useEffect(() => {
    let result = categories;
    
    if (filterName) {
      result = result.filter(category => 
        category.name.toLowerCase().includes(filterName.toLowerCase())
      );
    }
    
    if (filterPlatform) {
      result = result.filter(category => 
        category.platform.toLowerCase().includes(filterPlatform.toLowerCase())
      );
    }
    
    setFilteredCategories(result);
  }, [filterName, filterPlatform, categories]);

  // Handle edit
  const handleEdit = (category) => {
    setSelectedCategory(category);
    setShowEditModal(true);
  };

  // Handle view
  const handleView = (category) => {
    setSelectedCategory(category);
    setShowViewModal(true);
  };

  // Handle create product
  const handleCreateProduct = (category) => {
    setSelectedCategory(category);
    setShowCreateProductModal(true);
  };

  // Handle save (edit)
  const handleSave = (updatedCategory) => {
    axios.put(`/category/${updatedCategory._id}`, updatedCategory)
      .then(response => {
        if (response.data.success) {
          setShowEditModal(false);
          fetchCategories(); // Refresh the list
          showSuccess('Category updated successfully!');
        }
      })
      .catch(error => {
        console.error('Error updating category:', error);
        showError('Error updating category!');
      });
  };

  const handleCreateProductSubmit = (productData) => {
    console.log("Creating product with data:", productData);
    axios.post('/create-products', productData)
      .then(response => {
        if (response.data.success) {
          setShowCreateProductModal(false);
          showSuccess('Product created successfully!');
        }
      })
      .catch(error => {
        console.error('Error creating product:', error);
        showError('Error creating product. Please try again.');
      });
  };

  // Table columns
  const columns = [
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Platform',
      selector: row => row.platform,
      sortable: true,
    },
    {
      name: 'Created By',
      selector: row => row.CreatedBy,
      sortable: true,
    },
    {
      name: 'Creator Email',
      selector: row => row.CreatorEmail,
      sortable: true,
    },
    {
      name: 'Creator Role',
      selector: row => row.CreatorRole,
      sortable: true,
    },
    
{
  name: 'Actions',
  cell: (row) => (
    <div className="flex items-center space-x-4">
      {/* Edit Button */}
      <button
        onClick={() => handleEdit(row)}
        className="text-blue-500 hover:text-blue-700 transform hover:scale-110 transition-all duration-200"
        title="Edit"
      >
        <FaEdit className="text-lg" />
      </button>

      {/* Show Button */}
      <button
        onClick={() => handleView(row)}
        className="text-emerald-500 hover:text-emerald-700 transform hover:scale-110 transition-all duration-200"
        title="Show"
      >
        <FaEye className="text-lg" />
      </button>

      {/* Create Product Button */}
      <button
        onClick={() => handleCreateProduct(row)}
        className="text-purple-500 hover:text-purple-700 transform hover:scale-110 transition-all duration-200"
        title="Create Product"
      >
        <FaPlus className="text-lg" />
      </button>
    </div>
  ),
}


  ];

  // Overlay and Modal Styles
  const overlayStyle = {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.4)',
    zIndex: 50,
    display: 'flex',
    alignItems: 'center', // Center vertically
    justifyContent: 'center',
  };
  const modalStyle = {
    background: 'white',
    borderRadius: '1rem',
    width: '100%',
    maxWidth: '40rem',
    height: '75vh', // 9/12 of viewport
    maxHeight: '75vh',
    overflowY: 'auto',
    position: 'relative',
    boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  };
  const closeBtnStyle = {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    background: 'transparent',
    border: 'none',
    fontSize: '2rem',
    cursor: 'pointer',
    color: '#333',
    zIndex: 10,
  };

// Edit Modal Component
const EditModal = ({ category, onClose, onSave }) => {
  const [formData, setFormData] = useState(category);
  const [features, setFeatures] = useState(category.features);

  useEffect(() => {
    setFormData(category);
    setFeatures(category.features);
  }, [category]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFeatureToggle = (index) => {
    const updatedFeatures = [...features];
    updatedFeatures[index].checked = !updatedFeatures[index].checked;
    setFeatures(updatedFeatures);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      features: features,
    });
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 px-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-xl border border-gray-200 max-h-[80vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close"
          data-tooltip-id="close-edit"
          data-tooltip-content="Close"
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition"
        >
          <FaTimes className="w-5 h-5" />
        </button>
        <Tooltip id="close-edit" />

        <div className="p-6">
          <h2 className="text-xl font-bold mb-4 text-center">Edit Category</h2>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name & Platform */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Platform
                </label>
                <select
                  name="platform"
                  value={formData.platform}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="Amazon">Amazon</option>
                  <option value="Flipkart">Flipkart</option>
                  <option value="Meesho">Meesho</option>
                  <option value="Ajio">Ajio</option>
                </select>
              </div>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start p-2 border rounded-md hover:bg-gray-50 transition"
                  >
                    <input
                      type="checkbox"
                      checked={feature.checked || false}
                      onChange={() => handleFeatureToggle(index)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
                    />
                    <div className="ml-2 text-sm">
                      <label className="font-medium text-gray-700">
                        {feature.label}
                      </label>
                      {/* <p className="text-gray-500">{feature.name}</p> */}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-3 mt-3">
              <button
                type="button"
                onClick={onClose}
                data-tooltip-id="cancel-edit"
                data-tooltip-content="Cancel"
                className="px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition flex items-center gap-2"
              >
                <FaTimes />
              </button>
              <Tooltip id="cancel-edit" />

              <button
                type="submit"
                data-tooltip-id="save-edit"
                data-tooltip-content="Save"
                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition flex items-center gap-2"
              >
                <FaSave />
              </button>
              <Tooltip id="save-edit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};



  // View Modal Component
const ViewModal = ({ category, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm overflow-y-auto p-4">

      <div className="relative w-full max-w-3xl bg-white/80 backdrop-blur-md border border-white/30 rounded-3xl shadow-2xl p-6 mx-auto max-h-[90vh] overflow-y-auto animate-fadeIn">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors text-2xl"
          aria-label="Close"
        >
          &times;
        </button>

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
          📂 Category Details
        </h2>

        {/* Category Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          {[
            { label: "Name", value: category.name },
            { label: "Platform", value: category.platform },
            { label: "Created By", value: category.CreatedBy },
            { label: "Creator Email", value: category.CreatorEmail },
            { label: "Creator Role", value: category.CreatorRole },
          ].map((info) => (
            <div key={info.label} className="bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl p-4 shadow-sm hover:shadow-md transition-all">
              <h3 className="text-sm font-medium text-gray-500">{info.label}</h3>
              <p className="text-gray-800 text-lg mt-1 font-semibold">{info.value}</p>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3 text-center md:text-left">
            Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {category.features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 rounded-2xl border border-white/20 bg-white/30 backdrop-blur-sm shadow-sm hover:shadow-lg hover:bg-indigo-50 transition-all"
              >
                <input
                  type="checkbox"
                  checked={feature.checked || false}
                  readOnly
                  className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 mt-1"
                />
                <div className="text-sm">
                  <p className="font-medium text-gray-800">{feature.label}</p>
                  <p className="text-gray-500 text-xs">{feature.name}</p>
                  {feature.value && (
                    <p className="text-gray-500 text-xs mt-1">Value: {feature.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Close Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full bg-indigo-600 text-white font-semibold shadow-lg hover:bg-indigo-700 transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};



  // Create Product Modal Component
const CreateProductModal = ({ category, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({});

  const productFields = category.features.filter(feature => feature.checked);

  useEffect(() => {
    const initialFormData = {};
    productFields.forEach(field => {
      initialFormData[field.name] = '';
    });
    setFormData(initialFormData);
  }, [category]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      category: category.name,
      platform: category.platform,
      categoryId: category._id,
      fields: { ...formData },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4 overflow-y-auto">
      
      <div className="relative w-full max-w-2xl bg-white/80 backdrop-blur-md border border-white/30 rounded-2xl shadow-2xl p-6 mx-auto max-h-[85vh] overflow-y-auto animate-fadeIn">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl transition-colors"
          aria-label="Close"
        >
          &times;
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          🛒 Create Product - {category.name}
        </h2>

        {/* Category Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl p-4 shadow-sm">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Category Name</h3>
            <p className="text-gray-800 font-semibold">{category.name}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Platform</h3>
            <p className="text-gray-800 font-semibold">{category.platform}</p>
          </div>
        </div>

        {/* Product Fields */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-3 text-center md:text-left">Product Details</h3>
          <div className="grid grid-cols-1 gap-4">
            {productFields.map((field, index) => (
              <div key={index}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  required
                />
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-full bg-green-500 text-white font-semibold hover:bg-green-600 shadow-md transition"
            >
              Create Product
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

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

  return (
    <div className="container mx-auto p-2">
      {/* <ToastContainer /> */}
      <h1 className="text-2xl font-bold text-gray-800 tracking-tight text-start mb-6">All Categories</h1>
      
      {/* Filters */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Name</label>
            <input
              type="text"
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Search by name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Platform</label>
            <select
              value={filterPlatform}
              onChange={(e) => setFilterPlatform(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">All Platforms</option>
              <option value="Amazon">Amazon</option>
              <option value="Flipkart">Flipkart</option>
              <option value="Meesho">Meesho</option>
              <option value="Ajio">Ajio</option>
            </select>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded shadow">
        <DataTable
          columns={columns}
          data={filteredCategories}
          progressPending={loading}
          pagination
          highlightOnHover
          customStyles={customStyles}
          selectableRows
        />
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <EditModal
          category={selectedCategory}
          onClose={() => setShowEditModal(false)}
          onSave={handleSave}
        />
      )}

      {/* View Modal */}
      {showViewModal && (
        <ViewModal
          category={selectedCategory}
          onClose={() => setShowViewModal(false)}
        />
      )}

      {/* Create Product Modal */}
      {showCreateProductModal && (
        <CreateProductModal
          category={selectedCategory}
          onClose={() => setShowCreateProductModal(false)}
          onSubmit={handleCreateProductSubmit}
        />
      )}
    </div>
  );
};

export default AllCategories;