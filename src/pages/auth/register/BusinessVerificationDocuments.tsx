// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// interface BusinessVerificationDocumentsProps {
//   onNext?: (data: any) => void;
// }

// export default function BusinessVerificationDocuments({ onNext }: BusinessVerificationDocumentsProps) {
//   const [nationalId, setNationalId] = useState<File | null>(null);
//   const [businessCertificate, setBusinessCertificate] = useState<File | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const navigate = useNavigate();

//   const handleFileUpload = (type: 'nationalId' | 'businessCertificate') => (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       if (type === 'nationalId') {
//         setNationalId(file);
//       } else {
//         setBusinessCertificate(file);
//       }
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
    
//     try {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 2000));
      
//       const data = { nationalId, businessCertificate };
//       if (onNext) {
//         onNext(data);
//       } else {
//         // Navigate to success page
//         navigate('/register/success');
//       }
//     } catch (error) {
//       console.error('Submission failed:', error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (isSubmitting) {
//     return (
//       <div className="text-center space-y-4">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700 mx-auto"></div>
//         <h2 className="text-xl font-semibold text-gray-900">Submitting for Verification</h2>
//         <p className="text-gray-600">Please wait while we process your documents.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* National ID Upload */}
//         <div className="space-y-3">
//           <div className="flex items-center space-x-2">
//             <div className="w-12 h-12 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center">
//               <span className="text-2xl">+</span>
//             </div>
//             <div>
//               <p className="text-sm font-medium text-gray-900">Upload your National ID or Government ID</p>
//             </div>
//           </div>
//           <input
//             type="file"
//             accept=".pdf,.jpg,.jpeg,.png"
//             onChange={handleFileUpload('nationalId')}
//             className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
//           />
//           {nationalId && (
//             <p className="text-sm text-green-600">✓ {nationalId.name} uploaded</p>
//           )}
//         </div>

//         {/* Business Certificate Upload */}
//         <div className="space-y-3">
//           <div className="flex items-center space-x-2">
//             <div className="w-12 h-12 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center">
//               <span className="text-2xl">+</span>
//             </div>
//             <div>
//               <p className="text-sm font-medium text-gray-900">Business Registration Certificate</p>
//             </div>
//           </div>
//           <input
//             type="file"
//             accept=".pdf,.jpg,.jpeg,.png"
//             onChange={handleFileUpload('businessCertificate')}
//             className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
//           />
//           {businessCertificate && (
//             <p className="text-sm text-green-600">✓ {businessCertificate.name} uploaded</p>
//           )}
//         </div>

//         <button
//           type="submit"
//           className="w-full py-3 px-4 bg-green-700 hover:bg-green-800 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
//         >
//           Submit for Verification
//         </button>
//       </form>

//       <div className="text-center text-xs text-gray-500">
//         By continuing, you agree to 9ja-cart's Conditions of Use and Privacy Notice.
//       </div>
//     </div>
//   );
// }

import { useState } from 'react';

interface BusinessVerificationDocumentsProps {
  onNext?: (data: any) => void;
}

export default function BusinessVerificationDocuments({ onNext }: BusinessVerificationDocumentsProps) {
  const [nationalId, setNationalId] = useState<File | null>(null);
  const [businessCertificate, setBusinessCertificate] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileUpload = (type: 'nationalId' | 'businessCertificate') => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (type === 'nationalId') {
        setNationalId(file);
      } else {
        setBusinessCertificate(file);
      }
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const data = { nationalId, businessCertificate };
      if (onNext) {
        onNext(data);
      }
    } catch (error) {
      console.error('Submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const FileUploadBox = ({ 
    label, 
    file, 
    onChange, 
    id 
  }: { 
    label: string; 
    file: File | null; 
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    id: string;
  }) => (
    <div className="space-y-3">
      <label 
        htmlFor={id}
        className="flex items-center space-x-4 cursor-pointer group"
      >
        {/* Upload Box */}
        <div className={`
          w-20 h-20 border-2 border-dashed rounded-lg flex items-center justify-center
          transition-all duration-200 group-hover:border-green-400
          ${file ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-gray-50'}
        `}>
          {file ? (
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-gray-400 group-hover:text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
          )}
        </div>
        
        {/* Label */}
        <div className="flex-1">
          <p className="text-base font-medium text-gray-900 group-hover:text-green-700 transition-colors">
            {label}
          </p>
          {file && (
            <p className="text-sm text-green-600 mt-1">
              ✓ {file.name}
            </p>
          )}
          {!file && (
            <p className="text-sm text-gray-500 mt-1">
              Click to upload (PDF, JPG, PNG)
            </p>
          )}
        </div>
      </label>
      
      {/* Hidden File Input */}
      <input
        id={id}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={onChange}
        className="hidden"
      />
    </div>
  );

  if (isSubmitting) {
    return (
      <div className="text-center space-y-4 py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700 mx-auto"></div>
        <h2 className="text-xl font-semibold text-gray-900">Submitting for Verification</h2>
        <p className="text-gray-600">Please wait while we process your documents.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto space-y-8 p-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-gray-900">Document Upload</h1>
        <p className="text-gray-600">Upload your verification documents</p>
      </div>

      <div className="space-y-6">
        <FileUploadBox
          label="Upload your National ID or Government ID"
          file={nationalId}
          onChange={handleFileUpload('nationalId')}
          id="nationalId"
        />

        <FileUploadBox
          label="Business Registration Certificate"
          file={businessCertificate}
          onChange={handleFileUpload('businessCertificate')}
          id="businessCertificate"
        />

        <button
          onClick={handleSubmit}
          disabled={!nationalId || !businessCertificate || isSubmitting}
          className="w-full py-3 px-4 bg-green-700 hover:bg-green-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Submit for Verification
        </button>
      </div>

      <div className="text-center text-xs text-gray-500">
        By continuing, you agree to 9ja-cart's Conditions of Use and Privacy Notice.
      </div>
    </div>
  );
}