import { useState } from 'react';
import { Link } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  status: 'active' | 'inactive' | 'out_of_stock';
  category: string;
  image: string;
  sales: number;
}

export default function ProductsPage() {
  const [products] = useState<Product[]>([
    {
      id: '1',
      name: 'Premium Widget',
      price: 49.99,
      stock: 25,
      status: 'active',
      category: 'Electronics',
      image: '/api/placeholder/100/100',
      sales: 45
    },
    {
      id: '2',
      name: 'Deluxe Gadget',
      price: 79.99,
      stock: 0,
      status: 'out_of_stock',
      category: 'Electronics',
      image: '/api/placeholder/100/100',
      sales: 32
    },
    {
      id: '3',
      name: 'Standard Tool',
      price: 29.99,
      stock: 15,
      status: 'active',
      category: 'Tools',
      image: '/api/placeholder/100/100',
      sales: 28
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'out_of_stock':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Products</h1>
          <p className="text-muted-foreground">Manage your product inventory</p>
        </div>
        <Link
          to="/products/new"
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          Add Product
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="out_of_stock">Out of Stock</option>
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="aspect-square bg-secondary/20 flex items-center justify-center">
              <span className="text-4xl">📦</span>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-foreground">{product.name}</h3>
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(product.status)}`}>
                  {product.status.replace('_', ' ')}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
              <div className="flex justify-between items-center mb-3">
                <span className="text-lg font-bold text-foreground">${product.price}</span>
                <span className="text-sm text-muted-foreground">Stock: {product.stock}</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-muted-foreground">{product.sales} sales</span>
              </div>
              <div className="flex space-x-2">
                <Link
                  to={`/products/${product.id}/edit`}
                  className="flex-1 px-3 py-2 text-center border border-border rounded-md text-foreground hover:bg-secondary transition-colors"
                >
                  Edit
                </Link>
                <Link
                  to={`/products/${product.id}`}
                  className="flex-1 px-3 py-2 text-center bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                >
                  View
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📦</div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No products found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm || statusFilter !== 'all' 
              ? 'Try adjusting your search or filters'
              : 'Get started by adding your first product'
            }
          </p>
          <Link
            to="/products/new"
            className="inline-flex px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Add Product
          </Link>
        </div>
      )}
    </div>
  );
}