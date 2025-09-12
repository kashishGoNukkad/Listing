import React, { useEffect, useState } from 'react';
import axios from '../utils/api';
import DataTable from 'react-data-table-component';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/products');
        console.log(response.data);
        const productList = Array.isArray(response.data.data) ? response.data.data : [];
        setProducts(productList);
      } catch (err) {
        setError('Failed to fetch products');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

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

    // Table columns
  const columns = [
    {
      name: 'Category',
      selector: row => row.category,
    //   sortable: true,
    },
    {
      name: 'Platform',
      selector: row => row.platform,
      sortable: true,
    },
    {
      name: 'Product Type',
      selector: row => row.fields.feed_product_type || '-',
      sortable: true,
    },
    {
      name: 'Seller SKU',
      selector: row => row.fields.item_sku || '-',
      sortable: true,
    },
    {
      name: 'Brand Name',
      selector: row => row.fields.brand_name || '-',
      sortable: true,
    },
    {
      name: 'Product Name',
      selector: row => row.fields.item_name || '-',
      sortable: true,
    },
    {
      name: 'Manufacturer',
      selector: row => row.fields.manufacturer || '-',
      sortable: true,
    },
    {
      name: 'Product ID',
      selector: row => row.fields.external_product_id || '-',
      sortable: true,
    },
    {
      name: 'Product ID Type',
      selector: row => row.fields.external_product_id_type || '-',
      sortable: true,
    },
    {
      name: 'Recommended Browse Nodes',
      selector: row => row.fields.recommended_browse_nodes || '-',
      sortable: true,
    },
    {
      name: 'Item Depth Front To Back',
      selector: row => row.fields.depth_front_to_back || '-',
      sortable: true,
    },
    {
      name: 'Item depth Unit',
      selector: row => row.fields.depth_front_to_back_unit_of_measure || '-',
      sortable: true,
    },
    {
      name: 'Item Width Side To Side',
      selector: row => row.fields.depth_width_side_to_side || '-',
      sortable: true,
    },
    {
      name: 'Item Width Unit',
      selector: row => row.fields.depth_width_side_to_side_unit_of_measure || '-',
      sortable: true,
    },
    {
      name: 'Item Height Floor To Top',
      selector: row => row.fields.depth_height_floor_to_top || '-',
      sortable: true,
    },
    {
      name: 'Item Height Unit of Measure',
      selector: row => row.fields.depth_height_floor_to_top_unit_of_measure || '-',
      sortable: true,
    },
    {
      name: 'Standard Price',
      selector: row => row.fields.standard_price || '-',
      sortable: true,
    },
    {
      name: 'Quantity',
      selector: row => row.fields.quantity || '-',
      sortable: true,
    },
    {
      name: 'Main Image URL',
      selector: row => row.fields.main_image_url || '-',
      sortable: true,
    },
    {
      name: 'Outer Material Type',
      selector: row => row.fields.outer_material_type1 || '-',
      sortable: true,
    },
    {
      name: 'Outer Material Type 2',
      selector: row => row.fields.outer_material_type2 || '-',
      sortable: true,
    },
    {
      name: 'Outer Material Type 3',
      selector: row => row.fields.outer_material_type3 || '-',
      sortable: true,
    },
    {
      name: 'Outer Material Type 4',
      selector: row => row.fields.outer_material_type4 || '-',
      sortable: true,
    },
    {
      name: 'Outer Material Type 5',
      selector: row => row.fields.outer_material_type5 || '-',
      sortable: true,
    },
    {
      name: 'Department',
      selector: row => row.fields.department_name || '-',
      sortable: true,
    },
    {
      name: 'Fabric Type',
      selector: row => row.fields.fabric_type1 || '-',
      sortable: true,
    },
    {
      name: 'Fabric Type 2',
      selector: row => row.fields.fabric_type2 || '-',
      sortable: true,
    },
    {
      name: 'Fabric Type 3',
      selector: row => row.fields.fabric_type3 || '-',
      sortable: true,
    },
    {
      name: 'Fabric Type 4',
      selector: row => row.fields.fabric_type4 || '-',
      sortable: true,
    },
    {
      name: 'Fabric Type 5',
      selector: row => row.fields.fabric_type5 || '-',
      sortable: true,
    },
    {
      name: 'Target Gender',
      selector: row => row.fields.target_gender || '-',
      sortable: true,
    },
    {
      name: 'Age Range Description',
      selector: row => row.fields.age_range_description || '-',
      sortable: true,
    },
    {
      name: 'Shirt Size System',
      selector: row => row.fields.shirt_size_system || '-',
      sortable: true,
    },
    {
      name: 'Shirt Size Class',
      selector: row => row.fields.shirt_size_class || '-',
      sortable: true,
    },
    {
      name: 'Shirt Size Value',
      selector: row => row.fields.shirt_size || '-',
      sortable: true,
    },
    {
      name: 'Shirt Size To Range',
      selector: row => row.fields.shirt_size_to || '-',
      sortable: true,
    },
    {
      name: 'Neck Size Value',
      selector: row => row.fields.shirt_neck_size || '-',
      sortable: true,
    },
    {
      name: 'Neck Size Value To',
      selector: row => row.fields.shirt_neck_size_to || '-',
      sortable: true,
    },
    {
      name: 'Sleeve Length Value',
      selector: row => row.fields.shirt_sleeve_length || '-',
      sortable: true,
    },
    {
      name: 'Sleeve Length To Value',
      selector: row => row.fields.shirt_sleeve_length_to || '-',
      sortable: true,
    },
    {
      name: 'Shirt Body Type',
      selector: row => row.fields.shirt_body_type || '-',
      sortable: true,
    },
    {
      name: 'Shirt Height Type',
      selector: row => row.fields.shirt_height_type || '-',
      sortable: true,
    },
    {
      name: 'Manufacturer Part Number',
      selector: row => row.fields.part_number || '-',
      sortable: true,
    },
    {
      name: 'Watch Movement Type',
      selector: row => row.fields.watch_movement_type || '-',
      sortable: true,
    },
    {
      name: 'Target Audience',
      selector: row => row.fields.target_audience_keywords1 || '-',
      sortable: true,
    },
    {
      name: 'Target Audience 2',
      selector: row => row.fields.target_audience_keywords2 || '-',
      sortable: true,
    },
    {
      name: 'Target Audience 3',
      selector: row => row.fields.target_audience_keywords3 || '-',
      sortable: true,
    },
    {
      name: 'Target Audience 4',
      selector: row => row.fields.target_audience_keywords4 || '-',
      sortable: true,
    },
    {
      name: 'Target Audience 5',
      selector: row => row.fields.target_audience_keywords5 || '-',
      sortable: true,
    },
    {
      name: 'Display',
      selector: row => row.fields.display_type || '-',
      sortable: true,
    },
    {
      name: 'Is Product Expirable',
      selector: row => row.fields.is_expiration_dated_product || '-',
      sortable: true,
    },
    {
      name: 'Footwear Size System',
      selector: row => row.fields.footwear_size_system || '-',
      sortable: true,
    },
    {
      name: 'Shoe Size Age Group',
      selector: row => row.fields.footwear_age_group || '-',
      sortable: true,
    },
    {
      name: 'Shoe Size Class',
      selector: row => row.fields.footwear_size_class || '-',
      sortable: true,
    },
    {
      name: 'Shoe Size Width',
      selector: row => row.fields.footwear_width || '-',
      sortable: true,
    },
    {
      name: 'Shoe Size',
      selector: row => row.fields.footwear_size || '-',
      sortable: true,
    },
    {
      name: 'Color',
      selector: row => row.fields.color_name || '-',
      sortable: true,
    },
    {
      name: 'Color Map',
      selector: row => row.fields.color_map || '-',
      sortable: true,
    },
    {
      name: 'Other Image URL1',
      selector: row => row.fields.other_image_url1 || '-',
      sortable: true,
    },
  ];
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
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">All Products</h1>
      {/* <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Platform</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fields</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product._id}>
                <td className="px-6 py-4 whitespace-nowrap">{product.category}</td>
                <td className="px-6 py-4 whitespace-nowrap">{product.platform}</td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(product.created_at).toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <pre className="text-xs bg-gray-100 p-2 rounded">{JSON.stringify(product.fields, null, 2)}</pre>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
      <div className="bg-white rounded shadow">
        <DataTable
          columns={columns}
          data={products}
          progressPending={loading}
          pagination
          highlightOnHover
          customStyles={customStyles}
        />
      </div>
    </div>
  );
};

export default AllProducts;