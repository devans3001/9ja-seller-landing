export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
        <p className="text-muted-foreground">Track your store performance and insights</p>
      </div>

      {/* Coming Soon Content */}
      <div className="flex flex-col items-center justify-center py-20">
        <div className="text-center max-w-md">
          <div className="text-8xl mb-6">📊</div>
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Advanced Analytics Coming Soon
          </h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            We're building comprehensive analytics tools to help you understand your business better:
          </p>
          <div className="text-left space-y-2 mb-8">
            <div className="flex items-center space-x-3">
              <span className="text-primary">✓</span>
              <span className="text-sm text-muted-foreground">Revenue and sales trends</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-primary">✓</span>
              <span className="text-sm text-muted-foreground">Customer behavior insights</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-primary">✓</span>
              <span className="text-sm text-muted-foreground">Product performance metrics</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-primary">✓</span>
              <span className="text-sm text-muted-foreground">Traffic source analysis</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-primary">✓</span>
              <span className="text-sm text-muted-foreground">Conversion rate tracking</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-primary">✓</span>
              <span className="text-sm text-muted-foreground">Custom reports and exports</span>
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Note:</strong> Basic analytics are available in your dashboard summary. Advanced features are coming soon.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}