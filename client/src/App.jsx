import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Loading from "./components/Loading";
import TopArtists from "./pages/TopArtists";
import TopTracks from "./pages/TopTracks";
import Recent from "./pages/Recent";
import Playlists from "./pages/Playlists";
import PlaylistDetail from "./pages/PlaylistDetail";
import ArtistDetail from "./pages/ArtistDetail";
import "./styles/font.css";

function App() {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  // Add this state to remember the initial path
  const [initialPath, setInitialPath] = useState(null);

  useEffect(() => {
    // Save the current path when the app loads
    if (!initialPath && location.pathname !== "/") {
      setInitialPath(location.pathname);
    }

    // Check for access token in URL parameters
    const accessToken = new URLSearchParams(location.search).get(
      "access_token"
    );
    if (accessToken) {
      setToken(accessToken);
      // Store token in localStorage for persistence
      localStorage.setItem("spotify_access_token", accessToken);
      // Clear only the query parameters but keep the current path
      const url = new URL(window.location.href);
      url.searchParams.delete("access_token");
      window.history.replaceState(
        {},
        document.title,
        url.pathname + url.search
      );
    } else {
      // Check if token exists in localStorage
      const storedToken = localStorage.getItem("spotify_access_token");
      if (storedToken) {
        setToken(storedToken);
      }
    }
  }, [location, initialPath]);

  // Callback handler - now handles the code parameter
  const CallbackComponent = () => {
    useEffect(() => {
      const code = new URLSearchParams(location.search).get("code");

      if (code) {
        setLoading(true);
        // Direct callback to Render backend with code parameter
        window.location.href = `https://spotify-profile-6xq5.onrender.com/callback?code=${code}`;
      }
    }, []);

    return <Loading />;
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-[#181818] text-primary font-circular">
      <Routes>
        <Route
          path="/"
          element={
            token ? (
              <Navigate to={initialPath || "/dashboard"} replace />
            ) : (
              <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-[32px] font-bold mb-[10px] tracking-[-0.025em]">
                  Spotify Profile
                </h1>
                <button
                  onClick={() =>
                    (window.location.href =
                      "https://spotify-profile-6xq5.onrender.com/login")
                  }
                  className="bg-[#18b954] uppercase px-[35px] py-[17px] hover:bg-opacity-80 text-white rounded-full transition duration-300 mt-[20px] mb-[70px] tracking-[2px] font-medium cursor-pointer"
                >
                  Log in to Spotify
                </button>
              </div>
            )
          }
        />
        <Route path="/callback" element={<CallbackComponent />} />
        <Route
          path="/dashboard"
          element={token ? <Dashboard token={token} /> : <Navigate to="/" />}
        />
        <Route
          path="/top-artists"
          element={token ? <TopArtists token={token} /> : <Navigate to="/" />}
        />
        <Route
          path="/top-tracks"
          element={token ? <TopTracks token={token} /> : <Navigate to="/" />}
        />
        <Route
          path="/recent"
          element={token ? <Recent token={token} /> : <Navigate to="/" />}
        />
        <Route
          path="/playlists"
          element={token ? <Playlists token={token} /> : <Navigate to="/" />}
        />
        <Route
          path="/playlists/:playlistId"
          element={
            token ? <PlaylistDetail token={token} /> : <Navigate to="/" />
          }
        />
        <Route
          path="/artists/:artistId"
          element={token ? <ArtistDetail token={token} /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
}

export default App;
