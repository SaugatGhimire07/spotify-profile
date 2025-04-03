import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Loading from "./components/Loading";
import TopArtists from "./pages/TopArtists";
import "./styles/font.css";

function App() {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check for access token in URL parameters
    const accessToken = new URLSearchParams(location.search).get(
      "access_token"
    );
    if (accessToken) {
      setToken(accessToken);
      // Store token in localStorage for persistence
      localStorage.setItem("spotify_access_token", accessToken);
      // Clear the URL
      window.history.replaceState({}, document.title, "/");
    } else {
      // Check if token exists in localStorage
      const storedToken = localStorage.getItem("spotify_access_token");
      if (storedToken) {
        setToken(storedToken);
      }
    }
  }, [location]);

  // Callback handler - now handles the code parameter
  const CallbackComponent = () => {
    useEffect(() => {
      const code = new URLSearchParams(location.search).get("code");

      if (code) {
        setLoading(true);
        // Redirect to server endpoint with the code
        window.location.href = `http://localhost:8888/callback?code=${code}`;
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
              <Navigate to="/dashboard" />
            ) : (
              <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-[32px] font-bold mb-[10px] tracking-[-0.025em]">
                  Spotify Profile
                </h1>
                <button
                  onClick={() =>
                    (window.location.href = "http://localhost:8888/login")
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
      </Routes>
    </div>
  );
}

export default App;
