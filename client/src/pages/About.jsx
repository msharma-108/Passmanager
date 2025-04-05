import { useNavigate } from "react-router-dom";
export default function PasswordManagerIntro() {
    const navigate=useNavigate()
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="bg-white shadow-xl rounded-2xl p-8 max-w-2xl w-full">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">🔐 Password Manager</h1>
          <p className="text-lg text-gray-600 mb-6">
            Your all-in-one solution to securely store, manage, and access your passwords from anywhere. Built with modern encryption techniques to keep your data safe and private.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
            <li>Securely store login credentials</li>
            <li>Access passwords from any device</li>
            <li>All data is encrypted with high-end algorithms</li>
          </ul>
          <button onClick={()=>navigate("/")} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition">
            Get Started
          </button>
        </div>
      </div>
    );
  }