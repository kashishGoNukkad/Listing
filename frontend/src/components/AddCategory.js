import React, { useState } from 'react';
import axios from '../utils/api';
import categoryFeatures from './CategoryFeature.js';
import { useAuth } from '../contexts/AuthContext';


// Create an Axios instance with default config
// const api = axios.create({
//   baseURL: 'http://localhost:5000/api',
//   timeout: 10000,
//   headers: {
//     'Content-Type': 'application/json',
//   }
// });

const AddCategory = () => {
  const { user } = useAuth();
  // console.log('Current User:', user);
  const [formData, setFormData] = useState({
    category: '',
    CreatedBy: user ? user.username : null,
    CreatorEmail: user ? user.email : null,
    CreatorRole: user ? user.role : null,
    platform: ''
  });
  
  const [selectedFeatures, setSelectedFeatures] = useState(
    // Initialize with all features set to unchecked
    categoryFeatures.map(feature => ({
      ...feature,
      checked: false
    }))
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  
  const platforms = ['Amazon', 'Flipkart', 'Meesho', 'Ajio'];
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleFeatureToggle = (index) => {
    const updatedFeatures = [...selectedFeatures];
    updatedFeatures[index].checked = !updatedFeatures[index].checked;
    setSelectedFeatures(updatedFeatures);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');
    
    try {
      // Prepare the data for API submission
      const categoryData = {
        name: formData.category,
        platform: formData.platform,
        CreatedBy: formData.CreatedBy,
        CreatorEmail: formData.CreatorEmail,
        CreatorRole: formData.CreatorRole,
        features: selectedFeatures.map(feature => ({
          label: feature.label,
          name: feature.name,
          type: feature.type,
          value: feature.value,
          checked: feature.checked
        }))
      };
      
      const response = await axios.post('/create-category', categoryData);
      
      if (response.data.success) {
        setSubmitMessage({ type: 'success', text: response.data.message || 'Category created successfully!' });
        
        // Reset form
        setFormData({
          category: '',
          platform: ''
        });
        setSelectedFeatures(categoryFeatures.map(feature => ({
          ...feature,
          checked: false
        })));
      } else {
        setSubmitMessage({ 
          type: 'error', 
          text: response.data.message || 'Failed to create category. Please try again.' 
        });
      }
    } catch (error) {
      // Handle different types of errors
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setSubmitMessage({ 
          type: 'error', 
          text: error.response.data.message || `Server error: ${error.response.status}` 
        });
      } else if (error.request) {
        // The request was made but no response was received
        setSubmitMessage({ 
          type: 'error', 
          text: 'Network error. Please check your connection and try again.' 
        });
      } else {
        // Something happened in setting up the request that triggered an Error
        setSubmitMessage({ 
          type: 'error', 
          text: error.message || 'An unexpected error occurred.' 
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen  py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gray-900 px-6 py-5">
            <h2 className="text-2xl font-bold text-white">Add New Category</h2>
            <p className="text-blue-100 mt-1">Configure your product category settings</p>
          </div>
          
          <form onSubmit={handleSubmit} className="px-6 py-5">
            {/* Category Name Field */}
            <div className="mb-6">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category Name
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                placeholder="e.g., Electronics, Clothing, Books"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                required
              />
            </div>
            
            {/* Platform Selection */}
            <div className="mb-6">
              <label htmlFor="platform" className="block text-sm font-medium text-gray-700 mb-2">
                Platform
              </label>
              <select
                id="platform"
                name="platform"
                value={formData.platform}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white"
                required
              >
                <option value="">Select a platform</option>
                {platforms.map(platform => (
                  <option key={platform} value={platform}>
                    {platform}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Category Features */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Category Features
                <span className="text-gray-500 font-normal ml-2">(Select features to include)</span>
              </label>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedFeatures.map((feature, index) => (
                  <div key={feature.name} className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id={`feature-${feature.name}`}
                        type="checkbox"
                        checked={feature.checked}
                        onChange={() => handleFeatureToggle(index)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor={`feature-${feature.name}`} className="font-medium text-gray-700">
                        {feature.label}
                      </label>
                      {/* <p className="text-gray-500 mt-1">{feature.name}</p> */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Submit Button and Status Message */}
            <div className="flex flex-col items-end mt-8 pt-5 border-t border-gray-200">
              {submitMessage && (
                <div className={`w-full mb-4 p-3 rounded-lg ${
                  submitMessage.type === 'success' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {submitMessage.text}
                </div>
              )}
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-3 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 shadow-md ${
                  isSubmitting 
                    ? 'bg-blue-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isSubmitting ? 'Creating...' : 'Create Category'}
              </button>
            </div>
          </form>
        </div>
        
        {/* Information Panel */}
        <div className="mt-8 bg-blue-50 rounded-lg p-5 border border-blue-200">
          <h3 className="font-medium text-blue-800 mb-2">About this form</h3>
          <p className="text-blue-700 text-sm">
            This form allows you to create product categories with specific features for different e-commerce platforms.
            All features (checked and unchecked) will be included in the generated JSON with their selection status.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;