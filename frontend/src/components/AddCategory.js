import React, { useState } from 'react';
import axios from '../utils/api';
import categoryFeatures from './CategoryFeature.js';
import { useAuth } from '../contexts/AuthContext';

const AddCategory = () => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    category: '',
    CreatedBy: user ? user.username : null,
    CreatorEmail: user ? user.email : null,
    CreatorRole: user ? user.role : null,
    platform: ''
  });

  const [selectedFeatures, setSelectedFeatures] = useState(
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

        setFormData({ category: '', platform: '' });
        setSelectedFeatures(categoryFeatures.map(feature => ({ ...feature, checked: false })));
      } else {
        setSubmitMessage({
          type: 'error',
          text: response.data.message || 'Failed to create category. Please try again.'
        });
      }
    } catch (error) {
      setSubmitMessage({
        type: 'error',
        text:
          error.response?.data?.message ||
          (error.response ? `Server error: ${error.response.status}` :
            error.request ? 'Network error. Please check your connection and try again.' :
              error.message || 'An unexpected error occurred.')
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="px-6">
      <div className="max-w-7xl mx-auto w-full">
        <div className="bg-white  rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="px-8 pt-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-2">Add New Category</h2>
            <p className="text-center text-gray-500 mb-8">Configure your product category settings</p>
          </div>


          <form onSubmit={handleSubmit} className="px-8 py-6 space-y-6">


          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="category" className="text-start block text-sm font-semibold text-gray-700 mb-2">
                Category Name
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                placeholder="e.g., Electronics, Clothing, Books"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                required
              />
            </div>


            <div>
              <label htmlFor="platform" className="text-start block text-sm font-semibold text-gray-700 mb-2">
                Platform
              </label>
              <select
                id="platform"
                name="platform"
                value={formData.platform}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition"
                required
              >
                <option value="">Select a platform</option>
                {platforms.map(platform => (
                  <option key={platform} value={platform}>{platform}</option>
                ))}
              </select>
            </div>
        </div>
        
            <div>
              <label className="text-start block text-sm font-semibold text-gray-700 mb-4">
                Category Features
                <span className="text-gray-500 font-normal ml-2">(Select features to include)</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {selectedFeatures.map((feature, index) => (
                  <div key={feature.name} className="flex items-center bg-blue-50 border border-blue-200 rounded-lg p-3 hover:bg-blue-100 transition">
                    <input
                      id={`feature-${feature.name}`}
                      type="checkbox"
                      checked={feature.checked}
                      onChange={() => handleFeatureToggle(index)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor={`feature-${feature.name}`} className="ml-3 text-sm text-gray-700 font-medium">
                      {feature.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit */}
            <div className="pt-6 border-t border-gray-200 flex flex-col items-end">
              {submitMessage && (
                <div className={`w-full mb-4 p-3 rounded-lg text-sm font-medium ${submitMessage.type === 'success'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
                  }`}>
                  {submitMessage.text}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-3 text-white font-semibold rounded-xl shadow-md transition ${isSubmitting
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                  }`}
              >
                {isSubmitting ? 'Creating...' : 'Create Category'}
              </button>
            </div>
          </form>
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-200">
          <h3 className="font-semibold text-blue-800 mb-2">About this form</h3>
          <p className="text-blue-700 text-sm leading-relaxed">
            This form allows you to create product categories with specific features for different e-commerce platforms.
            All features (checked and unchecked) will be included in the generated JSON with their selection status.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
