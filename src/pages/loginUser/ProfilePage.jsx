import React, { useEffect, useState } from "react";
import { axiosInstants } from "../../config/axiosInstants";
import { useNavigate } from "react-router-dom";
// import EditProfile from "../../components/loginUser/EditProfile";
import { useDispatch } from "react-redux";
import { setProfileImage } from "../../redux/features/profileSlice";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);
  const [profileEdit, setProfileEdit] = useState(false);
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  // User profile get function
  const getUserProfile = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axiosInstants({
        method: "GET",
        url: "/user/profile",
      });
      setUserProfile(response.data);
      dispatch(setProfileImage(response.data.image));
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to fetch user profile."
      ); // Better error message
      console.error(error);
    } finally {
      setLoading(false); // End loading
    }
  };

  // User logout
  const logOut = async () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (!confirmLogout) return; // Stop if user cancels

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

  // Edit user profile
  const editProfileHandler = () => {
    setProfileEdit(true);
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <main className="relative">
      <div className="flex flex-col items-center justify-center min-h-[88vh] bg-gray-100 p-4">
        <div className="bg-white shadow-xl rounded-lg p-8 max-w-md w-full">
          <h1 className="text-3xl font-bold text-center mb-4">Profile</h1>

          {/* Loading State */}
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : (
            <>
              <div className="flex items-center justify-center mb-6">
                {userProfile?.image ? (
                  <img
                    src={userProfile.image}
                    alt="Profile"
                    className="h-24 w-24 rounded-full border-4 border-orange-500 object-cover shadow-lg"
                  />
                ) : (
                  <div className="h-24 w-24 rounded-full border-4 border-orange-500 flex items-center justify-center shadow-lg">
                    <span className="text-orange-500 font-semibold">
                      No Image
                    </span>
                  </div>
                )}
              </div>
              <h2 className="text-xl font-semibold text-center">
                {userProfile?.name || "Loading..."}
              </h2>
              <p className="text-center text-gray-600">
                {userProfile?.email || ""}
              </p>
              <div className="mt-4 border-t border-gray-300 pt-4">
                <h3 className="text-lg font-semibold">Profile Details</h3>
                <p className="text-gray-700">
                  Phone: {userProfile?.phone || "N/A"}
                </p>
              </div>
              {error && (
                <p className="text-red-500 mt-4 text-center">{error}</p>
              )}
              {/* Edit Profile Button */}
              <button
                onClick={editProfileHandler}
                className="mt-4 w-full px-4 py-2 text-black rounded hover:bg-orange-700 transition duration-300 ease-in-out border-2 border-orange-400"
              >
                Edit Profile
              </button>
              <button
                onClick={logOut}
                className="mt-6 w-full px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition duration-300 ease-in-out"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
      {profileEdit && (
        <div className="absolute top-0 bg-[#a4a4a45f] backdrop-blur-sm w-full h-[95vh] flex justify-center">
          <div className="container flex justify-center items-center relative">
            <button
              onClick={() => setProfileEdit(false)} // Close function
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              ✕ {/* Close button */}
            </button>
            {/* <EditProfile /> */}
          </div>
        </div>
      )}
    </main>
  );
};

export default ProfilePage;
