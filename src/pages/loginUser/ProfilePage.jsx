import React, { useEffect, useState } from "react";
import { axiosInstants } from "../../config/axiosInstants";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);

  // User profile get function
  const getUserProfile = async () => {
    try {
      const response = await axiosInstants({
        method: "GET",
        url: "/user/profile",
      });
      setUserProfile(response.data);
    } catch (error) {
      setError("Failed to fetch user profile.");
      console.error(error);
    }
  };

  // User logout
  const logOut = async () => {
    try {
      await axiosInstants({
        method: "POST",
        url: "/user/logout",
      });
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Edite user profile
  const editProfileHandler = () => {
    
  }

  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[88vh] bg-gray-100 p-4">
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-4">Profile</h1>
        <div className="flex items-center justify-center mb-6">
          {userProfile?.image ? (
            <img
              src={userProfile.image}
              alt="Profile"
              className="h-24 w-24 rounded-full border-4 border-orange-500 object-cover shadow-lg"
            />
          ) : (
            <div className="h-24 w-24 rounded-full border-4 border-orange-500 flex items-center justify-center shadow-lg">
              <span className="text-orange-500 font-semibold">No Image</span>
            </div>
          )}
        </div>
        <h2 className="text-xl font-semibold text-center">
          {userProfile?.name || "Loading..."}
        </h2>
        <p className="text-center text-gray-600">{userProfile?.email || ""}</p>
        <div className="mt-4 border-t border-gray-300 pt-4">
          <h3 className="text-lg font-semibold">Profile Details</h3>
          <p className="text-gray-700">Phone: {userProfile?.phone || "N/A"}</p>
        </div>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

        {/* Edit Profile Button */}
        <button onClick={editProfileHandler} className="mt-4 w-full px-4 py-2 text-black rounded hover:bg-orange-700 transition duration-300 ease-in-out border-2 border-orange-400 ">
          Edit Profile
        </button>

        <button
          onClick={logOut}
          className="mt-6 w-full px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition duration-300 ease-in-out"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
