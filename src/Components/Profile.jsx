import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from './AppContext';

const Profile = () => {
    const navigate=useNavigate();
    const {currentUser}=useContext(Context)
  return (
    <div className="bg-gray-100 min-h-screen p-6 flex items-center">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md relative">
        <button
          onClick={()=>{navigate(-1)}}
          className="absolute top-2 left-2 bg-slate-800 text-white py-2 px-4 rounded hover:bg-slate-900"
        >
          Back
        </button>

        <div className="text-center">
        <img
            src={currentUser.photoURL}
            alt="User Profile"
            className="w-20 h-20 rounded-full bg-cover mx-auto"
          />
          <h2 className="text-xl font-semibold mt-4">{currentUser.displayName}</h2>
          <p className="text-gray-600">{currentUser.email}</p>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Account Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-600">Full Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={currentUser.displayName}
                readOnly
              />
            </div>
            <div>
              <label className="text-gray-600">Email</label>
              <input
                type="email"
                className="w-full p-2 border rounded"
                value={currentUser.email}
                readOnly
              />
            </div>
          </div>
        </div>

       
      </div>
    </div>
  );
};

export default Profile;
