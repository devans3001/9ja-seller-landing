import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useVendorProfile } from '@/hooks/useVendorProfile';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import type { VendorProfile } from '@/types';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const { profile, isLoading, error, fetchProfile, updateProfile } = useVendorProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<VendorProfile>>({});

  // Fetch profile data on component mount
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // Update form data when profile is loaded
  useEffect(() => {
    if (profile) {
      setFormData(profile);
    }
  }, [profile]);

  const tabs = [
    { id: 'profile', name: 'Profile', icon: '👤' },
    { id: 'business', name: 'Business', icon: '🏢' },
    { id: 'security', name: 'Security', icon: '🔒' }
  ];

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (profile) {
      setFormData(profile);
    }
  };

  const handleSave = async () => {
    try {
      await updateProfile(formData);
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Failed to save profile:', error);
      toast.error('Failed to update profile. Please try again.');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const renderTabContent = () => {
    if (!profile) return null;

    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-foreground">Personal Information</h3>
              {!isEditing && (
                <button
                  onClick={handleEdit}
                  className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                >
                  Edit Profile
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.account?.fullName || ''}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      account: { ...prev.account!, fullName: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  />
                ) : (
                  <p className="px-3 py-2 bg-secondary/50 rounded-md text-foreground">
                    {profile.account.fullName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <p className="px-3 py-2 bg-secondary/50 rounded-md text-foreground">
                  {profile.account.emailAddress}
                  <span className="ml-2 text-xs text-muted-foreground">(Cannot be changed)</span>
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={formData.account?.phoneNumber || ''}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      account: { ...prev.account!, phoneNumber: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  />
                ) : (
                  <p className="px-3 py-2 bg-secondary/50 rounded-md text-foreground">
                    {profile.account.phoneNumber}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Account Created
                </label>
                <p className="px-3 py-2 bg-secondary/50 rounded-md text-foreground">
                  {formatDate(profile.createdAt)}
                </p>
              </div>
            </div>
          </div>
        );

      case 'business':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-foreground">Business Information</h3>
              {!isEditing && (
                <button
                  onClick={handleEdit}
                  className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                >
                  Edit Business Info
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Business Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.business?.businessName || ''}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      business: { ...prev.business!, businessName: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  />
                ) : (
                  <p className="px-3 py-2 bg-secondary/50 rounded-md text-foreground">
                    {profile.business.businessName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Store Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.business?.storeName || ''}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      business: { ...prev.business!, storeName: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  />
                ) : (
                  <p className="px-3 py-2 bg-secondary/50 rounded-md text-foreground">
                    {profile.business.storeName}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Business Address
                </label>
                {isEditing ? (
                  <textarea
                    rows={3}
                    value={formData.business?.businessAddress || ''}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      business: { ...prev.business!, businessAddress: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  />
                ) : (
                  <p className="px-3 py-2 bg-secondary/50 rounded-md text-foreground">
                    {profile.business.businessAddress}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Business Registration Number
                </label>
                <p className="px-3 py-2 bg-secondary/50 rounded-md text-foreground">
                  {profile.business.businessRegNumber || 'Not provided'}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Tax ID Number
                </label>
                <p className="px-3 py-2 bg-secondary/50 rounded-md text-foreground">
                  {profile.business.taxIdNumber || 'Not provided'}
                </p>
              </div>
            </div>

            {/* Business Documents */}
            <div className="space-y-4">
              <h4 className="text-md font-semibold text-foreground">Business Documents</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                <div className="p-4 border border-border rounded-md">
                  <h5 className="font-medium text-foreground mb-2">ID Document</h5>
                  {profile.business.idDocument ? (
                    <a
                      href={profile.business.idDocument}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 text-sm"
                    >
                      📄 View Document
                    </a>
                  ) : (
                    <p className="text-sm text-muted-foreground">Not uploaded</p>
                  )}
                </div>
                <div className="p-4 border border-border rounded-md">
                  <h5 className="font-medium text-foreground mb-2">Business Registration Certificate</h5>
                  {profile.business.businessRegCertificate ? (
                    <a
                      href={profile.business.businessRegCertificate}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 text-sm"
                    >
                      📄 View Certificate
                    </a>
                  ) : (
                    <p className="text-sm text-muted-foreground">Not uploaded</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground">Security Settings</h3>
            <div className="space-y-4">
              <div className="p-6 border border-border rounded-md">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Password</h4>
                    <p className="text-sm text-muted-foreground">
                      Last updated: {formatDate(profile.updatedAt)}
                    </p>
                  </div>
                  <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                    Change Password
                  </button>
                </div>
              </div>

              <div className="p-6 border border-border rounded-md">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Account Security</h4>
                    <p className="text-sm text-muted-foreground">
                      Keep your account secure with strong authentication
                    </p>
                  </div>
                  <button className="px-4 py-2 border border-border rounded-md text-foreground hover:bg-secondary transition-colors">
                    Security Settings
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <ErrorMessage message={error} />
        <button
          onClick={fetchProfile}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No profile data available</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage your account and business information</p>
        </div>
        <button
          onClick={fetchProfile}
          disabled={isLoading}
          className="px-4 py-2 border border-border rounded-md text-foreground hover:bg-secondary transition-colors disabled:opacity-50"
        >
          {isLoading ? '🔄' : '↻'} Refresh
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
        {/* Sidebar */}
        <div className="lg:w-64">
          <nav className="flex lg:flex-col space-x-1 lg:space-x-0 lg:space-y-1 overflow-x-auto lg:overflow-x-visible">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setIsEditing(false); // Reset editing state when switching tabs
                }}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                <span className="mr-2 lg:mr-3">{tab.icon}</span>
                <span className="hidden sm:inline">{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="bg-card border border-border rounded-lg p-4 sm:p-6">
            {renderTabContent()}
            
            {/* Action Buttons - Only show when editing */}
            {isEditing && (
              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 border border-border rounded-md text-foreground hover:bg-secondary transition-colors"
                  >
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}