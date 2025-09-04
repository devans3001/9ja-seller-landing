import { useState } from 'react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('account');
  const [settings, setSettings] = useState({
    // Account settings
    firstName: 'John',
    lastName: 'Seller',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    
    // Business settings
    businessName: 'My Awesome Store',
    businessEmail: 'business@example.com',
    businessPhone: '+1 (555) 987-6543',
    taxId: '12-3456789',
    
    // Notification settings
    emailNotifications: true,
    smsNotifications: false,
    orderNotifications: true,
    marketingEmails: false,
    
    // Payment settings
    paymentMethod: 'bank_transfer',
    bankAccount: '****1234',
    payoutSchedule: 'weekly'
  });

  const tabs = [
    { id: 'account', name: 'Account', icon: '👤' },
    { id: 'business', name: 'Business', icon: '🏢' },
    { id: 'notifications', name: 'Notifications', icon: '🔔' },
    { id: 'payments', name: 'Payments', icon: '💳' },
    { id: 'security', name: 'Security', icon: '🔒' }
  ];

  const handleSave = () => {
    console.log('Saving settings:', settings);
    // Handle save logic here
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'account':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={settings.firstName}
                    onChange={(e) => setSettings(prev => ({ ...prev, firstName: e.target.value }))}
                    className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={settings.lastName}
                    onChange={(e) => setSettings(prev => ({ ...prev, lastName: e.target.value }))}
                    className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={settings.email}
                    onChange={(e) => setSettings(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={settings.phone}
                    onChange={(e) => setSettings(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'business':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Business Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Business Name
                  </label>
                  <input
                    type="text"
                    value={settings.businessName}
                    onChange={(e) => setSettings(prev => ({ ...prev, businessName: e.target.value }))}
                    className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Business Email
                    </label>
                    <input
                      type="email"
                      value={settings.businessEmail}
                      onChange={(e) => setSettings(prev => ({ ...prev, businessEmail: e.target.value }))}
                      className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Business Phone
                    </label>
                    <input
                      type="tel"
                      value={settings.businessPhone}
                      onChange={(e) => setSettings(prev => ({ ...prev, businessPhone: e.target.value }))}
                      className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Tax ID
                  </label>
                  <input
                    type="text"
                    value={settings.taxId}
                    onChange={(e) => setSettings(prev => ({ ...prev, taxId: e.target.value }))}
                    className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Notification Preferences</h3>
              <div className="space-y-4">
                {[
                  { key: 'emailNotifications', label: 'Email Notifications', description: 'Receive notifications via email' },
                  { key: 'smsNotifications', label: 'SMS Notifications', description: 'Receive notifications via SMS' },
                  { key: 'orderNotifications', label: 'Order Notifications', description: 'Get notified about new orders' },
                  { key: 'marketingEmails', label: 'Marketing Emails', description: 'Receive marketing and promotional emails' }
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-4 border border-border rounded-md">
                    <div>
                      <p className="font-medium text-foreground">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings[item.key as keyof typeof settings] as boolean}
                      onChange={(e) => setSettings(prev => ({ ...prev, [item.key]: e.target.checked }))}
                      className="h-4 w-4 text-primary focus:ring-ring border-border rounded"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'payments':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Payment Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Payment Method
                  </label>
                  <select
                    value={settings.paymentMethod}
                    onChange={(e) => setSettings(prev => ({ ...prev, paymentMethod: e.target.value }))}
                    className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  >
                    <option value="bank_transfer">Bank Transfer</option>
                    <option value="paypal">PayPal</option>
                    <option value="stripe">Stripe</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Bank Account
                  </label>
                  <input
                    type="text"
                    value={settings.bankAccount}
                    onChange={(e) => setSettings(prev => ({ ...prev, bankAccount: e.target.value }))}
                    className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Payout Schedule
                  </label>
                  <select
                    value={settings.payoutSchedule}
                    onChange={(e) => setSettings(prev => ({ ...prev, payoutSchedule: e.target.value }))}
                    className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Security Settings</h3>
              <div className="space-y-4">
                <div className="p-4 border border-border rounded-md">
                  <h4 className="font-medium text-foreground mb-2">Change Password</h4>
                  <p className="text-sm text-muted-foreground mb-4">Update your password to keep your account secure</p>
                  <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                    Change Password
                  </button>
                </div>
                <div className="p-4 border border-border rounded-md">
                  <h4 className="font-medium text-foreground mb-2">Two-Factor Authentication</h4>
                  <p className="text-sm text-muted-foreground mb-4">Add an extra layer of security to your account</p>
                  <button className="px-4 py-2 border border-border rounded-md text-foreground hover:bg-secondary transition-colors">
                    Enable 2FA
                  </button>
                </div>
                <div className="p-4 border border-border rounded-md">
                  <h4 className="font-medium text-foreground mb-2">Active Sessions</h4>
                  <p className="text-sm text-muted-foreground mb-4">Manage your active login sessions</p>
                  <button className="px-4 py-2 border border-border rounded-md text-foreground hover:bg-secondary transition-colors">
                    View Sessions
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your account and business settings</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-64">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                <span className="mr-3">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="bg-card border border-border rounded-lg p-6">
            {renderTabContent()}
            
            <div className="mt-6 pt-6 border-t border-border">
              <div className="flex justify-end space-x-3">
                <button className="px-4 py-2 border border-border rounded-md text-foreground hover:bg-secondary transition-colors">
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}