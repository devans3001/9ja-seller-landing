import { useState } from 'react';

interface RegisterBasicInfoProps {
  onNext: (data: { fullName: string; businessName: string; businessCategory: string; phone: string }) => void;
  onBack: () => void;
  initialData?: { fullName: string; businessName: string; businessCategory: string; phone: string };
}

const businessCategories = [
  'Fashion & Clothing',
  'Electronics & Technology',
  'Home & Garden',
  'Health & Beauty',
  'Sports & Outdoors',
  'Books & Media',
  'Food & Beverages',
  'Automotive',
  'Arts & Crafts',
  'Other'
];

export default function RegisterBasicInfo({ onNext, onBack, initialData }: RegisterBasicInfoProps) {
  const [fullName, setFullName] = useState(initialData?.fullName || '');
  const [businessName, setBusinessName] = useState(initialData?.businessName || '');
  const [businessCategory, setBusinessCategory] = useState(initialData?.businessCategory || '');
  const [phone, setPhone] = useState(initialData?.phone || '');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!businessName.trim()) {
      newErrors.businessName = 'Business name is required';
    }

    if (!businessCategory) {
      newErrors.businessCategory = 'Business category is required';
    }

    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onNext({ fullName, businessName, businessCategory, phone });
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Basic Information</h2>
      </div>
      
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Enter your full name"
          />
          {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
        </div>

        <div>
          <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-2">
            Business Name
          </label>
          <input
            id="businessName"
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Enter your business name"
          />
          {errors.businessName && <p className="mt-1 text-sm text-red-600">{errors.businessName}</p>}
        </div>

        <div>
          <label htmlFor="businessCategory" className="block text-sm font-medium text-gray-700 mb-2">
            Business Category
          </label>
          <select
            id="businessCategory"
            value={businessCategory}
            onChange={(e) => setBusinessCategory(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">Select a category</option>
            {businessCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.businessCategory && <p className="mt-1 text-sm text-red-600">{errors.businessCategory}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Enter your phone number"
          />
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
        </div>

        <div className="flex space-x-4">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 py-3 px-4 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Back
          </button>
          <button
            type="submit"
            className="flex-1 py-3 px-4 bg-green-700 hover:bg-green-800 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}