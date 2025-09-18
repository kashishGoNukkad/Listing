// import React, { useState } from 'react';
// import axios from '../utils/api';

// const ResetPassword = () => {
//   const [email, setEmail] = useState('');
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError('');
//     try {
//       await axios.post('/forgot-password', { email });
//       localStorage.setItem('resetEmail', email);
//       setIsSubmitted(true);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to send reset instructions');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-8 px-4">
//       <div className="max-w-md w-full">
//         {/* Card */}
//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//           {/* Decorative Header */}
//           <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-center">
//             <h1 className="text-2xl font-bold text-white">Reset Your Password</h1>
//             <p className="text-blue-100 mt-2">
//               {isSubmitted 
//                 ? "Check your email for instructions" 
//                 : "Enter your email to receive reset instructions"
//               }
//             </p>
//           </div>
//           {/* Content */}
//           <div className="p-8">
//             {!isSubmitted ? (
//               <>
//                 <div className="flex justify-center mb-6">
//                   <div className="bg-blue-100 p-4 rounded-full">
//                     <svg 
//                       className="h-12 w-12 text-blue-600" 
//                       fill="none" 
//                       viewBox="0 0 24 24" 
//                       stroke="currentColor"
//                     >
//                       <path 
//                         strokeLinecap="round" 
//                         strokeLinejoin="round" 
//                         strokeWidth={2} 
//                         d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
//                       />
//                     </svg>
//                   </div>
//                 </div>
//                 {error && <div className="mb-4 text-red-600 text-center">{error}</div>}
//                 <form onSubmit={handleSubmit}>
//                   <div className="mb-6">
//                     <label 
//                       htmlFor="email" 
//                       className="block text-gray-700 text-sm font-medium mb-2"
//                     >
//                       Email Address
//                     </label>
//                     <input
//                       id="email"
//                       type="email"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 outline-none"
//                       placeholder="Enter your email address"
//                       required
//                     />
//                   </div>
//                   <button
//                     type="submit"
//                     disabled={isLoading}
//                     className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center"
//                   >
//                     {isLoading ? (
//                       <>
//                         <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                         </svg>
//                         Processing...
//                       </>
//                     ) : (
//                       'Send Reset Instructions'
//                     )}
//                   </button>
//                 </form>
//                 <div className="text-center mt-6">
//                   <a 
//                     href="/login" 
//                     className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200"
//                   >
//                     Back to Login
//                   </a>
//                 </div>
//               </>
//             ) : (
//               <div className="text-center">
//                 <div className="flex justify-center mb-6">
//                   <div className="bg-green-100 p-4 rounded-full">
//                     <svg 
//                       className="h-12 w-12 text-green-600" 
//                       fill="none" 
//                       viewBox="0 0 24 24" 
//                       stroke="currentColor"
//                     >
//                       <path 
//                         strokeLinecap="round" 
//                         strokeLinejoin="round" 
//                         strokeWidth={2} 
//                         d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
//                       />
//                     </svg>
//                   </div>
//                 </div>
//                 <h3 className="text-xl font-bold text-gray-800 mb-2">Check Your Email</h3>
//                 <p className="text-gray-600 mb-6">
//                   We've sent password reset instructions to <span className="font-medium">{email}</span>
//                 </p>
//                 <div className="bg-blue-50 p-4 rounded-lg mb-6">
//                   <p className="text-blue-800 text-sm">
//                     Didn't receive the email? Check your spam folder or 
//                     <button 
//                       onClick={() => setIsSubmitted(false)}
//                       className="ml-1 text-blue-600 font-medium hover:text-blue-800 transition-colors duration-200"
//                     >
//                       try again
//                     </button>
//                   </p>
//                 </div>
//                 <a 
//                   href="/login" 
//                   className="inline-block py-2 px-4 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors duration-200"
//                 >
//                   Return to Login
//                 </a>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResetPassword;

import React, { useState } from "react";
import axios from "../utils/api";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      await axios.post("/forgot-password", { email });
      localStorage.setItem("resetEmail", email);
      setIsSubmitted(true);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to send reset instructions"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-r from-indigo-50 via-pink-50 to-purple-50">
      {/* Left Side Illustration */}
      <div className="hidden md:flex w-1/2 flex-col justify-center items-center px-10 bg-gradient-to-br from-indigo-100 via-pink-100 to-purple-100">
        <h1 className="text-4xl font-extrabold text-gray-700 tracking-tight mb-4">
          Forgot your password?
        </h1>
        <p className="text-gray-500 max-w-sm text-center">
          Don’t worry, it happens to the best of us. Reset it in just a few
          clicks.
        </p>
        <img
          src="https://stories.freepiklabs.com/storage/2158/Forgot-Password_Mesa-de-trabajo-1.svg"
          alt="Reset Illustration"
          className="w-3/4 mt-10"
        />
      </div>

      {/* Right Side Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-8">
          {!isSubmitted ? (
            <>
              {/* Header */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Reset Your Password
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                  Enter your email to receive reset instructions
                </p>
              </div>

              {error && (
                <div className="mb-4 text-red-600 text-center text-sm">
                  {error}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="text-start block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 outline-none"
                    placeholder="Enter your email address"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition-all duration-300 flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 
                          3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    "Send Reset Instructions"
                  )}
                </button>
              </form>

              <div className="text-center mt-6">
                <a
                  href="/login"
                  className="text-indigo-600 hover:text-indigo-800 text-sm font-medium transition-colors duration-200"
                >
                  Back to Login
                </a>
              </div>
            </>
          ) : (
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-green-100 p-4 rounded-full">
                  <svg
                    className="h-12 w-12 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 
                      002-2V7a2 2 0 00-2-2H5a2 2 0 
                      00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Check Your Email
              </h3>
              <p className="text-gray-600 mb-6">
                We’ve sent reset instructions to{" "}
                <span className="font-medium">{email}</span>
              </p>
              <div className="bg-indigo-50 p-4 rounded-lg mb-6">
                <p className="text-indigo-800 text-sm">
                  Didn’t receive the email? Check your spam folder or
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="ml-1 text-indigo-600 font-medium hover:text-indigo-800 transition-colors duration-200"
                  >
                    try again
                  </button>
                </p>
              </div>
              <a
                href="/login"
                className="inline-block py-2 px-4 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors duration-200"
              >
                Return to Login
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
