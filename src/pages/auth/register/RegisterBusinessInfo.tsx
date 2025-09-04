import { useState } from 'react';

interface RegisterBusinessInfoProps {
  onNext: (data: { 
    businessName: string; 
    businessType: string; 
    businessAddress: string; 
    businessPhone: string;
    taxId: string;
  }) => void;
  onBack: () => void;
  initialData?: { 
    businessName: string; 
    businessType: string; 
    businessAddress: string; 
    businessPhone: string;
    taxId: string;
  };
}

export default function RegisterBusinessInfo({ onNext, onBack, initialData }: RegisterBusinessInfoProps) {
  const [businessName, setBusinessName] = useState(initialData?.businessName || '');
  const [businessType, setBusinessType] = useState(initialData?.businessType || '');
  const [businessAddress, setBusinessAddress] = useState(initialData?.businessAddress || '');
  const [businessPhone, setBusinessPhone] = useState(initialData?.businessPhone || '');
  const [taxId, setTaxId] = useState(initialData?.taxId || '');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const businessTypes = [
    'Sole Proprietorship',
    'Partnership',
    'LLC',
    'Corporation',
    'Non-profit',
    'Other'
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!businessName.trim()) {
      newErrors.businessName = 'Business name is required';
    }

    if (!businessType) {
      newErrors.businessType = 'Please select a business type';
    }

    if (!businessAddress.trim()) {
      newErrors.businessAddress = 'Business address is required';
    }

    if (!businessPhone.trim()) {
      newErrors.businessPhone = 'Business phone is required';
    }

    if (!taxId.trim()) {
      newErrors.taxId = 'Tax ID is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onNext({ businessName, businessType, businessAddress, businessPhone, taxId });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground">Business Information</h2>
        <p className="text-muted-foreground">Step 3 of 4: Tell us about your business</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="businessName" className="block text-sm font-medium text-foreground">
            Business Name *
          </label>
          <input
            id="businessName"
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            placeholder="Enter your business name"
          />
          {errors.businessName && <p className="mt-1 text-sm text-destructive">{errors.businessName}</p>}
        </div>

        <div>
          <label htmlFor="businessType" className="block text-sm font-medium text-foreground">
            Business Type *
          </label>
          <select
            id="businessType"
            value={businessType}
            onChange={(e) => setBusinessType(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
          >
            <option value="">Select business type</option>
            {businessTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          {errors.businessType && <p className="mt-1 text-sm text-destructive">{errors.businessType}</p>}
        </div>

        <div>
          <label htmlFor="businessAddress" className="block text-sm font-medium text-foreground">
            Business Address *
          </label>
          <textarea
            id="businessAddress"
            value={businessAddress}
            onChange={(e) => setBusinessAddress(e.target.value)}
            rows={3}
            className="mt-1 block w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            placeholder="Enter your business address"
          />
          {errors.businessAddress && <p className="mt-1 text-sm text-destructive">{errors.businessAddress}</p>}
        </div>

        <div>
          <label htmlFor="businessPhone" className="block text-sm font-medium text-foreground">
            Business Phone *
          </label>
          <input
            id="businessPhone"
            type="tel"
            value={businessPhone}
            onChange={(e) => setBusinessPhone(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            placeholder="Enter your business phone"
          />
          {errors.businessPhone && <p className="mt-1 text-sm text-destructive">{errors.businessPhone}</p>}
        </div>

        <div>
          <label htmlFor="taxId" className="block text-sm font-medium text-foreground">
            Tax ID / EIN *
          </label>
          <input
            id="taxId"
            type="text"
            value={taxId}
            onChange={(e) => setTaxId(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            placeholder="Enter your Tax ID or EIN"
          />
          {errors.taxId && <p className="mt-1 text-sm text-destructive">{errors.taxId}</p>}
        </div>

        <div className="flex space-x-4">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 py-2 px-4 border border-border rounded-md shadow-sm text-sm font-medium text-foreground bg-secondary hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring"
          >
            Back
          </button>
          <button
            type="submit"
            className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}