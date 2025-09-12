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
        <div className="flex space-x-2">
          <button 
            onClick={() => handleEdit(row)}
            className=" bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
          >
            Edit
          </button>
          <button 
            onClick={() => handleView(row)}
            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
          >
            Show
          </button>
          <button 
            onClick={() => handleCreateProduct(row)}
            className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 text-sm"
          >
            Create Product
          </button>
        </div>
      ),
    },
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
      setFormData(prev => ({
        ...prev,
        [name]: value
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
        features: features
      });
    };

    return (
      <div style={overlayStyle}>
        <div style={modalStyle}>
          <button style={closeBtnStyle} onClick={onClose} aria-label="Close" data-tooltip-id="close-edit" data-tooltip-content="Close"><FaTimes /></button>
          <Tooltip id="close-edit" />
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4 text-center">Edit Category</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
                  <select
                    name="platform"
                    value={formData.platform}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="Amazon">Amazon</option>
                    <option value="Flipkart">Flipkart</option>
                    <option value="Meesho">Meesho</option>
                    <option value="Ajio">Ajio</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-700 mb-3">Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          type="checkbox"
                          checked={feature.checked || false}
                          onChange={() => handleFeatureToggle(index)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label className="font-medium text-gray-700">
                          {feature.label}
                        </label>
                        <p className="text-gray-500 mt-1">{feature.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button type="button" onClick={onClose} style={{ background: '#f3f4f6', borderRadius: '0.5rem', padding: '0.5rem 1rem' }} data-tooltip-id="cancel-edit" data-tooltip-content="Cancel"><FaTimes /></button>
                <Tooltip id="cancel-edit" />
                <button type="submit" style={{ background: '#2563eb', color: 'white', borderRadius: '0.5rem', padding: '0.5rem 1rem' }} data-tooltip-id="save-edit" data-tooltip-content="Save"><FaSave /></button>
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
      <div style={overlayStyle}>
        <div style={modalStyle}>
          <button style={closeBtnStyle} onClick={onClose} aria-label="Close" data-tooltip-id="close-view" data-tooltip-content="Close"><FaTimes /></button>
          <Tooltip id="close-view" />
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4 text-center">Category Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Name</h3>
                <p className="text-lg">{category.name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Platform</h3>
                <p className="text-lg">{category.platform}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Created By</h3>
                <p className="text-lg">{category.CreatedBy}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Creator Email</h3>
                <p className="text-lg">{category.CreatorEmail}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Creator Role</h3>
                <p className="text-lg">{category.CreatorRole}</p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-700 mb-3">Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {category.features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        type="checkbox"
                        checked={feature.checked || false}
                        readOnly
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label className="font-medium text-gray-700">
                        {feature.label}
                      </label>
                      <p className="text-gray-500 mt-1">{feature.name}</p>
                      {feature.value && (
                        <p className="text-gray-500 mt-1">Value: {feature.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button onClick={onClose} style={{ background: '#2563eb', color: 'white', borderRadius: '0.5rem', padding: '0.5rem 1rem' }} data-tooltip-id="close-view-btn" data-tooltip-content="Close"><FaTimes /></button>
              <Tooltip id="close-view-btn" />
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Create Product Modal Component
  const CreateProductModal = ({ category, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({});
    
    // Get only the checked features for this category
    const productFields = category.features.filter(feature => feature.checked);

    useEffect(() => {
      // Initialize form data with empty values for each field
      const initialFormData = {};
      productFields.forEach(field => {
        initialFormData[field.name] = '';
      });
      setFormData(initialFormData);
    }, [category]);

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      
      // Prepare the product data to submit
      const productData = {
        category: category.name,
        platform: category.platform,
        categoryId: category._id,
        fields: { ...formData }
      };
      
      onSubmit(productData);
    };

    return (
      <div style={overlayStyle}>
        <div style={modalStyle}>
          <button style={closeBtnStyle} onClick={onClose} aria-label="Close" data-tooltip-id="close-create" data-tooltip-content="Close"><FaTimes /></button>
          <Tooltip id="close-create" />
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4 text-center">Create Product - {category.name}</h2>
            
            {/* Display category name and platform as non-editable */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 bg-gray-50 p-4 rounded-md">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Category Name</h3>
                <p className="text-lg font-medium">{category.name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Platform</h3>
                <p className="text-lg font-medium">{category.platform}</p>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-700 mb-4">Product Details</h3>
                <div className="grid grid-cols-1 gap-4">
                  {productFields.map((field, index) => (
                    <div key={index}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        required
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button type="button" onClick={onClose} style={{ background: '#f3f4f6', borderRadius: '0.5rem', padding: '0.5rem 1rem' }} data-tooltip-id="cancel-create" data-tooltip-content="Cancel"><FaTimes /></button>
                <Tooltip id="cancel-create" />
                <button type="submit" style={{ background: '#22c55e', color: 'white', borderRadius: '0.5rem', padding: '0.5rem 1rem' }} data-tooltip-id="create-product" data-tooltip-content="Create"><FaPlus /></button>
                <Tooltip id="create-product" />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  // DataTable custom styles
  const customStyles = {
    headCells: {
      style: {
        backgroundColor: '#1e293b',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: '1rem',
      },
    },
    rows: {
      style: {
        height: '20px',
        fontSize: '1rem',
        backgroundColor: '#f8fafc',
        borderBottom: '1px solid #e5e7eb',
      },
    },
    pagination: {
      style: {
        backgroundColor: '#fff',
        color: '#1e293b',
      },
    },
  };

  return (
    <div className="container mx-auto p-6">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-6">All Categories</h1>
      
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