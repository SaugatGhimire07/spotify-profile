// Dashboard.jsx
import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard({ token }) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!token) return;

    axios
      .get("https://api.spotify.com/v1/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setProfile(res.data);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
        // If token is invalid, clear it from localStorage
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("spotify_access_token");
          window.location.href = "/";
        }
      });
  }, [token]);

  if (!profile) return <p className="text-white">Loading...</p>;

  return (
    <div className="container mx-auto p-8 text-white">
      <h1 className="text-3xl font-bold mb-4">
        Welcome, {profile.display_name}
      </h1>
      {profile.images[0]?.url && (
        <img
          src={profile.images[0]?.url}
          alt="Profile"
          className="rounded-full w-24 h-24 object-cover border-2 border-[#18b954]"
        />
      )}
    </div>
  );
}

export default Dashboard;
