export default function OrdersPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Orders</h1>
          <p className="text-muted-foreground">Manage your customer orders</p>
        </div>
      </div>

      {/* Coming Soon Content */}
      <div className="flex flex-col items-center justify-center py-20">
        <div className="text-center max-w-md">
          <div className="text-8xl mb-6">🚧</div>
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Order Management Coming Soon
          </h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            We're building a comprehensive order management system where you'll be able to:
          </p>
          <div className="text-left space-y-2 mb-8">
            <div className="flex items-center space-x-3">
              <span className="text-primary">✓</span>
              <span className="text-sm text-muted-foreground">View and manage all customer orders</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-primary">✓</span>
              <span className="text-sm text-muted-foreground">Update order status and tracking</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-primary">✓</span>
              <span className="text-sm text-muted-foreground">Process refunds and returns</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-primary">✓</span>
              <span className="text-sm text-muted-foreground">Generate shipping labels</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-primary">✓</span>
              <span className="text-sm text-muted-foreground">Customer communication tools</span>
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Note:</strong> You can still view recent orders in your dashboard summary.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}