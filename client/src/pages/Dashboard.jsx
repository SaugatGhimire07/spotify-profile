// Dashboard.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import ProfileHeader from "../components/ProfileHeader";
import UserPreview from "../components/UserPreview";
import Loading from "../components/Loading";

function Dashboard({ token }) {
  const [profile, setProfile] = useState(null);
  const [playlists, setPlaylists] = useState({ total: 0 });
  const [following, setFollowing] = useState({ total: 0 });
  const [firstLoad, setFirstLoad] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!token) return;

    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        // Fetch user profile
        const profileResponse = await axios.get(
          "https://api.spotify.com/v1/me",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Fetch user playlists
        const playlistsResponse = await axios.get(
          "https://api.spotify.com/v1/me/playlists",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Fetch user following
        const followingResponse = await axios.get(
          "https://api.spotify.com/v1/me/following?type=artist",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setProfile(profileResponse.data);
        setPlaylists(playlistsResponse.data);
        setFollowing(followingResponse.data.artists);
      } catch (error) {
        console.error("Error fetching user data:", error);
        if (error.response?.status === 401) {
          localStorage.removeItem("spotify_access_token");
          window.location.href = "/";
        }
      } finally {
        setIsLoading(false);
        setFirstLoad(false);
      }
    };

    fetchUserData();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("spotify_access_token");
    window.location.href = "/";
  };

  // This ensures the sidebar is always rendered
  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />
      <div className="w-full md:flex-1 md:ml-[100px]">
        {firstLoad ? (
          <div className="flex items-center justify-center min-h-screen">
            <Loading />
          </div>
        ) : (
          <div className="flex-1 bg-[#181818] p-[20px] md:p-[80px] max-w-[1400px] mx-auto">
            <div className="relative">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="scale-50">
                    <Loading />
                  </div>
                </div>
              )}
              <div
                className={`${
                  isLoading ? "opacity-50" : ""
                } transition-opacity duration-300`}
              >
                <ProfileHeader
                  profile={profile}
                  following={following}
                  playlists={playlists}
                  handleLogout={handleLogout}
                />
                <UserPreview token={token} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
