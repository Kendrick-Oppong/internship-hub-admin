export default function VerifyOtpPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Verify OTP</h1>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Enter OTP
            </label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded p-2"
            />
          </div>
          <button className="w-full bg-blue-600 text-white rounded p-2 hover:bg-blue-700">
            Verify & Login
          </button>
        </form>
      </div>
    </div>
  );
}
