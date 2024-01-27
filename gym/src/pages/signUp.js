import React, { useEffect } from 'react';

const FitCampusRegistration = () => {
  useEffect(() => {
    const storeInput = (key, value) => localStorage.setItem(key, value);

    document.querySelectorAll('input').forEach(input => {
      input.value = localStorage.getItem(input.name) || '';
      input.addEventListener('input', () => storeInput(input.name, input.value));
    });
  }, []);

  return (
    <div className="bg-black text-white flex items-center justify-center flex-col h-screen">
        <h1 className="bg-gradient-to-r from-red to-yellow  text-[15vh] text-center">FitCampus</h1>
      <div className="w-full max-w-xs">
        <form className="bg-black shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            
            <div className="mb-6">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Name"
                name="name"
              />
            </div>
            <div className="mb-6">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="emailID"
                type="email"
                placeholder="Email ID"
                name="emailID"
              />
            </div>
            <div className="mb-6">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Password"
                name="password"
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FitCampusRegistration;
