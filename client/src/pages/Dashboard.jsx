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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    const fetchUserData = async () => {
      try {
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

        // Add a minimum loading time of 2 seconds
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching user data:", error);

        // If token is invalid, clear it from localStorage
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("spotify_access_token");
          window.location.href = "/";
        }

        setLoading(false);
      }
    };

    fetchUserData();
  }, [token]);

  const handleLogout = () => {
    // Clear the access token from localStorage
    localStorage.removeItem("spotify_access_token");
    // Redirect to the home page
    window.location.href = "/";
  };

  if (loading) return <Loading />;

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-[100px]">
        <div className="flex-1 bg-[#181818] p-[80px] max-w-[1400px] mx-auto">
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
  );
}

export default Dashboard;
