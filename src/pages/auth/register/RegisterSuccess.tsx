import { Link } from 'react-router-dom';
import Logo from "@/assets/logo2.png";

export default function RegisterSuccess() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img src={Logo} alt="9ja-cart Logo" className="h-8 w-auto" />
        </div>

        <div className="text-center space-y-6">
          <div className="space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900">Application Submitted Successfully!</h2>
            
            <div className="space-y-2 text-gray-600">
              <p>Thank you for applying to become a seller on our platform.</p>
              <p>We've received your application and supporting documents.</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <h3 className="font-semibold text-gray-900">What happens next?</h3>
            <div className="text-sm text-gray-600 space-y-2">
              <div className="flex items-start space-x-2">
                <span className="text-green-700">1.</span>
                <span>Our team will review your application and documents within 2-3 business days</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-green-700">2.</span>
                <span>You'll receive an email notification about your application status</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-green-700">3.</span>
                <span>Once approved, you can start listing and selling your products</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm text-gray-600">
              We've sent a confirmation email to your registered email address.
            </p>
            
            <div className="flex flex-col gap-3">
              <Link
                to="/login"
                className="w-full py-3 px-4 bg-green-700 hover:bg-green-800 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Sign In to Your Account
              </Link>
              <Link
                to="/"
                className="w-full py-3 px-4 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Back to Home
              </Link>
            </div>
          </div>

          <div className="text-xs text-gray-500">
            <p>
              Need help? Contact our support team at{' '}
              <a href="mailto:support@9ja-cart.com" className="text-green-700 hover:text-green-800">
                support@9ja-cart.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}