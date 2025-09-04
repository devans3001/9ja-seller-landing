import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddProductPage() {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    comparePrice: '',
    cost: '',
    sku: '',
    barcode: '',
    trackQuantity: true,
    quantity: '',
    category: '',
    tags: '',
    weight: '',
    dimensions: {
      length: '',
      width: '',
      height: ''
    },
    seoTitle: '',
    seoDescription: '',
    status: 'draft'
  });

  const [images, setImages] = useState<File[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating product:', product);
    // Handle product creation logic here
    navigate('/products');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      setImages(prev => [...prev, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Add Product</h1>
          <p className="text-muted-foreground">Create a new product for your store</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => navigate('/products')}
            className="px-4 py-2 border border-border rounded-md text-foreground hover:bg-secondary transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Save Product
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  value={product.name}
                  onChange={(e) => setProduct(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  placeholder="Enter product name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Description
                </label>
                <textarea
                  rows={4}
                  value={product.description}
                  onChange={(e) => setProduct(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  placeholder="Describe your product"
                />
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Pricing</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Price *
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={product.price}
                  onChange={(e) => setProduct(prev => ({ ...prev, price: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  placeholder="0.00"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Compare at Price
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={product.comparePrice}
                  onChange={(e) => setProduct(prev => ({ ...prev, comparePrice: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  placeholder="0.00"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Cost per Item
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={product.cost}
                  onChange={(e) => setProduct(prev => ({ ...prev, cost: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>

          {/* Inventory */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Inventory</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    SKU
                  </label>
                  <input
                    type="text"
                    value={product.sku}
                    onChange={(e) => setProduct(prev => ({ ...prev, sku: e.target.value }))}
                    className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                    placeholder="Enter SKU"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Barcode
                  </label>
                  <input
                    type="text"
                    value={product.barcode}
                    onChange={(e) => setProduct(prev => ({ ...prev, barcode: e.target.value }))}
                    className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                    placeholder="Enter barcode"
                  />
                </div>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="trackQuantity"
                  checked={product.trackQuantity}
                  onChange={(e) => setProduct(prev => ({ ...prev, trackQuantity: e.target.checked }))}
                  className="h-4 w-4 text-primary focus:ring-ring border-border rounded"
                />
                <label htmlFor="trackQuantity" className="ml-2 block text-sm text-foreground">
                  Track quantity
                </label>
              </div>
              
              {product.trackQuantity && (
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    value={product.quantity}
                    onChange={(e) => setProduct(prev => ({ ...prev, quantity: e.target.value }))}
                    className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                    placeholder="0"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Images */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Product Images</h2>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <div className="text-4xl mb-2">📷</div>
                  <p className="text-foreground font-medium mb-1">Add product images</p>
                  <p className="text-sm text-muted-foreground">
                    Drag and drop or click to upload
                  </p>
                </label>
              </div>
              
              {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative">
                      <div className="aspect-square bg-secondary rounded-lg flex items-center justify-center">
                        <span className="text-2xl">🖼️</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs hover:bg-red-600"
                      >
                        ×
                      </button>
                      <p className="text-xs text-muted-foreground mt-1 truncate">
                        {image.name}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Status</h2>
            <select
              value={product.status}
              onChange={(e) => setProduct(prev => ({ ...prev, status: e.target.value }))}
              className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            >
              <option value="draft">Draft</option>
              <option value="active">Active</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          {/* Organization */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Organization</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Category
                </label>
                <input
                  type="text"
                  value={product.category}
                  onChange={(e) => setProduct(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  placeholder="Enter category"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Tags
                </label>
                <input
                  type="text"
                  value={product.tags}
                  onChange={(e) => setProduct(prev => ({ ...prev, tags: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  placeholder="Enter tags separated by commas"
                />
              </div>
            </div>
          </div>

          {/* Shipping */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Shipping</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Weight
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={product.weight}
                  onChange={(e) => setProduct(prev => ({ ...prev, weight: e.target.value }))}
                  className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  placeholder="0.0 kg"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Dimensions
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="number"
                    step="0.01"
                    value={product.dimensions.length}
                    onChange={(e) => setProduct(prev => ({ 
                      ...prev, 
                      dimensions: { ...prev.dimensions, length: e.target.value }
                    }))}
                    className="px-2 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent text-sm"
                    placeholder="L"
                  />
                  <input
                    type="number"
                    step="0.01"
                    value={product.dimensions.width}
                    onChange={(e) => setProduct(prev => ({ 
                      ...prev, 
                      dimensions: { ...prev.dimensions, width: e.target.value }
                    }))}
                    className="px-2 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent text-sm"
                    placeholder="W"
                  />
                  <input
                    type="number"
                    step="0.01"
                    value={product.dimensions.height}
                    onChange={(e) => setProduct(prev => ({ 
                      ...prev, 
                      dimensions: { ...prev.dimensions, height: e.target.value }
                    }))}
                    className="px-2 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent text-sm"
                    placeholder="H"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}