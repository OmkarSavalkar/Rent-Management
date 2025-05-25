import React from "react";

const HomeServices = () => {
  return (
    <div
      className="absolute top-0 left-0 w-full min-h-[calc(100vh-80px)] px-4 py-6
                    bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100
                   "
    >
      <div className="max-w-4xl mx-auto animate-fade-in transition-all duration-500">
        <div className="bg-white/70 backdrop-blur-md border border-white/40 rounded-3xl shadow-2xl p-6 sm:p-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
            👥 Services
          </h2>

          <div className="text-center text-sm sm:text-base text-gray-600">
            This section will show renter details like name, room number,
            contact info, and rent history.
            <br />
            <span className="text-xs text-indigo-500">
              🚧 Under development
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomeServices;
