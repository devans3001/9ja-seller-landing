export default function AnalyticsPage() {
  const stats = {
    totalRevenue: 15420.50,
    totalOrders: 234,
    averageOrderValue: 65.90,
    conversionRate: 3.2
  };

  const chartData = [
    { month: 'Jan', revenue: 2400, orders: 45 },
    { month: 'Feb', revenue: 3200, orders: 52 },
    { month: 'Mar', revenue: 2800, orders: 48 },
    { month: 'Apr', revenue: 4100, orders: 61 },
    { month: 'May', revenue: 3600, orders: 55 },
    { month: 'Jun', revenue: 4800, orders: 68 }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
        <p className="text-muted-foreground">Track your store performance and insights</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
              <p className="text-2xl font-bold text-foreground">${stats.totalRevenue.toLocaleString()}</p>
              <p className="text-sm text-green-600">+12.5% from last month</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-green-600 text-xl">💰</span>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Orders</p>
              <p className="text-2xl font-bold text-foreground">{stats.totalOrders}</p>
              <p className="text-sm text-green-600">+8.2% from last month</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 text-xl">🛒</span>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg Order Value</p>
              <p className="text-2xl font-bold text-foreground">${stats.averageOrderValue}</p>
              <p className="text-sm text-green-600">+5.1% from last month</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-purple-600 text-xl">📊</span>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Conversion Rate</p>
              <p className="text-2xl font-bold text-foreground">{stats.conversionRate}%</p>
              <p className="text-sm text-red-600">-0.3% from last month</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <span className="text-orange-600 text-xl">🎯</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Revenue Trend</h2>
          <div className="space-y-4">
            {chartData.map((data) => (
              <div key={data.month} className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground w-12">{data.month}</span>
                <div className="flex-1 mx-4">
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${(data.revenue / 5000) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <span className="text-sm font-medium text-foreground w-16 text-right">
                  ${data.revenue.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Top Performing Products</h2>
          <div className="space-y-4">
            {[
              { name: 'Premium Widget', sales: 45, revenue: 2250 },
              { name: 'Deluxe Gadget', sales: 32, revenue: 1920 },
              { name: 'Standard Tool', sales: 28, revenue: 1400 },
              { name: 'Basic Kit', sales: 22, revenue: 880 }
            ].map((product, index) => (
              <div key={product.name} className="flex items-center justify-between p-3 bg-secondary/50 rounded-md">
                <div className="flex items-center space-x-3">
                  <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-xs font-medium text-primary">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-medium text-foreground">{product.name}</p>
                    <p className="text-sm text-muted-foreground">{product.sales} sales</p>
                  </div>
                </div>
                <p className="font-medium text-foreground">${product.revenue.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="font-semibold text-foreground mb-4">Traffic Sources</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Direct</span>
              <span className="text-sm font-medium text-foreground">45%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Search</span>
              <span className="text-sm font-medium text-foreground">32%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Social</span>
              <span className="text-sm font-medium text-foreground">15%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Email</span>
              <span className="text-sm font-medium text-foreground">8%</span>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="font-semibold text-foreground mb-4">Customer Demographics</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Age 25-34</span>
              <span className="text-sm font-medium text-foreground">38%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Age 35-44</span>
              <span className="text-sm font-medium text-foreground">28%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Age 18-24</span>
              <span className="text-sm font-medium text-foreground">22%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Age 45+</span>
              <span className="text-sm font-medium text-foreground">12%</span>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="font-semibold text-foreground mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="text-sm">
              <p className="text-foreground">New order received</p>
              <p className="text-muted-foreground">2 minutes ago</p>
            </div>
            <div className="text-sm">
              <p className="text-foreground">Product updated</p>
              <p className="text-muted-foreground">1 hour ago</p>
            </div>
            <div className="text-sm">
              <p className="text-foreground">Customer review posted</p>
              <p className="text-muted-foreground">3 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}