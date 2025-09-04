import { useState } from "react";

export default function StorefrontPage() {
  const [storeSettings, setStoreSettings] = useState({
    storeName: "My Awesome Store",
    storeDescription: "Quality products at great prices",
    storeUrl: "my-awesome-store",
    bannerImage: "",
    logo: "",
    theme: "default",
    isActive: true,
  });

  const [products] = useState([
    {
      id: "1",
      name: "Premium Widget",
      price: 49.99,
      image: "",
      status: "active",
    },
    {
      id: "2",
      name: "Deluxe Gadget",
      price: 79.99,
      image: "",
      status: "active",
    },
    {
      id: "3",
      name: "Standard Tool",
      price: 29.99,
      image: "",
      status: "inactive",
    },
  ]);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle save logic here
    console.log("Saving store settings:", storeSettings);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Storefront</h1>
          <p className="text-muted-foreground">
            Customize your public store appearance
          </p>
        </div>
        <div className="flex space-x-2">
          <a
            href={`/store/${storeSettings.storeUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border border-border rounded-md text-foreground hover:bg-secondary transition-colors"
          >
            Preview Store
          </a>
          <button
            onClick={handleSaveSettings}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Store Settings */}
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Store Information
            </h2>
            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div>
                <label
                  htmlFor="storeName"
                  className="block text-sm font-medium text-foreground mb-1"
                >
                  Store Name
                </label>
                <input
                  id="storeName"
                  type="text"
                  value={storeSettings.storeName}
                  onChange={(e) =>
                    setStoreSettings((prev) => ({
                      ...prev,
                      storeName: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                />
              </div>

              <div>
                <label
                  htmlFor="storeUrl"
                  className="block text-sm font-medium text-foreground mb-1"
                >
                  Store URL
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-border bg-secondary text-muted-foreground text-sm">
                    yoursite.com/store/
                  </span>
                  <input
                    id="storeUrl"
                    type="text"
                    value={storeSettings.storeUrl}
                    onChange={(e) =>
                      setStoreSettings((prev) => ({
                        ...prev,
                        storeUrl: e.target.value,
                      }))
                    }
                    className="flex-1 px-3 py-2 border border-border rounded-r-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="storeDescription"
                  className="block text-sm font-medium text-foreground mb-1"
                >
                  Store Description
                </label>
                <textarea
                  id="storeDescription"
                  rows={3}
                  value={storeSettings.storeDescription}
                  onChange={(e) =>
                    setStoreSettings((prev) => ({
                      ...prev,
                      storeDescription: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                />
              </div>

              <div>
                <label
                  htmlFor="theme"
                  className="block text-sm font-medium text-foreground mb-1"
                >
                  Theme
                </label>
                <select
                  id="theme"
                  value={storeSettings.theme}
                  onChange={(e) =>
                    setStoreSettings((prev) => ({
                      ...prev,
                      theme: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                >
                  <option value="default">Default</option>
                  <option value="modern">Modern</option>
                  <option value="classic">Classic</option>
                  <option value="minimal">Minimal</option>
                </select>
              </div>

              <div className="flex items-center">
                <input
                  id="isActive"
                  type="checkbox"
                  checked={storeSettings.isActive}
                  onChange={(e) =>
                    setStoreSettings((prev) => ({
                      ...prev,
                      isActive: e.target.checked,
                    }))
                  }
                  className="h-4 w-4 text-primary focus:ring-ring border-border rounded"
                />
                <label
                  htmlFor="isActive"
                  className="ml-2 block text-sm text-foreground"
                >
                  Store is active and visible to customers
                </label>
              </div>
            </form>
          </div>

          {/* Media Upload */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Store Media
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Store Logo
                </label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <div className="text-4xl mb-2">🏪</div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Upload your store logo
                  </p>
                  <button className="px-4 py-2 border border-border rounded-md text-foreground hover:bg-secondary transition-colors">
                    Choose File
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Banner Image
                </label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <div className="text-4xl mb-2">🖼️</div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Upload a banner image
                  </p>
                  <button className="px-4 py-2 border border-border rounded-md text-foreground hover:bg-secondary transition-colors">
                    Choose File
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Store Preview */}
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Store Preview
            </h2>
            <div className="border border-border rounded-lg overflow-hidden">
              {/* Mock storefront preview */}
              <div className="bg-primary/10 h-32 flex items-center justify-center">
                <span className="text-2xl">🏪</span>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {storeSettings.storeName}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {storeSettings.storeDescription}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {products
                    .filter((p) => p.status === "active")
                    .slice(0, 4)
                    .map((product) => (
                      <div
                        key={product.id}
                        className="border border-border rounded p-2"
                      >
                        <div className="aspect-square bg-secondary/20 rounded mb-2 flex items-center justify-center">
                          <span className="text-lg">📦</span>
                        </div>
                        <p className="text-xs font-medium text-foreground">
                          {product.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          ${product.price}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>

          {/* Store Stats */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Store Performance
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Store Views</span>
                <span className="font-semibold text-foreground">1,234</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Active Products</span>
                <span className="font-semibold text-foreground">
                  {products.filter((p) => p.status === "active").length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Conversion Rate</span>
                <span className="font-semibold text-foreground">3.2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Store Rating</span>
                <span className="font-semibold text-foreground">4.8 ⭐</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
