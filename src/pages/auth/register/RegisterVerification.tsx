import { useState } from 'react';

interface RegisterVerificationProps {
  onNext: (data: { documents: File[] }) => void;
  onBack: () => void;
}

export default function RegisterVerification({ onNext, onBack }: RegisterVerificationProps) {
  const [documents, setDocuments] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const newFiles = Array.from(e.dataTransfer.files);
      setDocuments(prev => [...prev, ...newFiles]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setDocuments(prev => [...prev, ...newFiles]);
    }
  };

  const removeDocument = (index: number) => {
    setDocuments(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ documents });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground">Business Verification</h2>
        <p className="text-muted-foreground">Step 4 of 4: Upload verification documents</p>
      </div>

      <div className="space-y-4">
        <div className="text-sm text-muted-foreground">
          <p className="mb-2">Please upload the following documents to verify your business:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Business license or registration certificate</li>
            <li>Tax identification document</li>
            <li>Bank statement or voided check</li>
            <li>Government-issued ID (driver's license or passport)</li>
          </ul>
        </div>

        <div
          className={`relative border-2 border-dashed rounded-lg p-6 text-center ${
            dragActive 
              ? 'border-primary bg-primary/5' 
              : 'border-border hover:border-primary/50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="space-y-2">
            <div className="text-4xl">📄</div>
            <div>
              <p className="text-foreground font-medium">
                Drop files here or click to upload
              </p>
              <p className="text-sm text-muted-foreground">
                PDF, JPG, PNG, DOC files up to 10MB each
              </p>
            </div>
          </div>
        </div>

        {documents.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium text-foreground">Uploaded Documents:</h4>
            {documents.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-secondary rounded-md">
                <div className="flex items-center space-x-2">
                  <span className="text-sm">📄</span>
                  <span className="text-sm text-foreground">{file.name}</span>
                  <span className="text-xs text-muted-foreground">
                    ({(file.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => removeDocument(index)}
                  className="text-destructive hover:text-destructive/80 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit}>
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
            Submit Application
          </button>
        </div>
      </form>

      <div className="text-xs text-muted-foreground text-center">
        <p>
          By submitting this application, you agree to our Terms of Service and Privacy Policy.
          Your documents will be reviewed within 2-3 business days.
        </p>
      </div>
    </div>
  );
}