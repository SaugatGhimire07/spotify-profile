import { useState, useEffect } from "react";
import axios from "axios";

// Add this helper function at the top of the file, before the UserPreview component
const formatDuration = (ms) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

function UserPreview({ token }) {
  const [topArtists, setTopArtists] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user's top 10 artists (long term = all time)
        const artistsResponse = await axios.get(
          "https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=10",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Fetch user's top 10 tracks (long term = all time)
        const tracksResponse = await axios.get(
          "https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=10",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setTopArtists(artistsResponse.data.items);
        setTopTracks(tracksResponse.data.items);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    if (token) {
      fetchUserData();
    }
  }, [token]);

  return (
    <div className="w-full">
      {/* Two-column layout container */}
      <div className="grid grid-cols-2 gap-[70px] w-full mt-[100px]">
        {/* Top Artists Column */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-[20px]">
            <h3 className="font-bold tracking-tight">
              Top Artists of All Time
            </h3>
            <a
              href="/top-artists"
              className="inline-block text-white text-[12px] tracking-[1px] uppercase border border-white px-[30px] py-[12px] cursor-pointer transition-[all] duration-[250ms] ease-[cubic-bezier(0.3,0,0.4,1)] text-center whitespace-nowrap hover:bg-white hover:text-black rounded-[30px]"
            >
              See More
            </a>
          </div>
          <div className="space-y-[15px]">
            {topArtists.map((artist) => (
              <a
                key={artist.id}
                href={artist.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-[10px] transition duration-[250ms] group"
              >
                <div className="relative w-[50px] h-[50px] mr-[20px] rounded-full overflow-hidden">
                  <img
                    src={artist.images[0]?.url}
                    alt={artist.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-[250ms] ease-[cubic-bezier(0.3,0,0.4,1)]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 45.999 45.999"
                      className="w-[25px] h-[25px] fill-white"
                    >
                      <path d="M39.264,6.736c-8.982-8.981-23.545-8.982-32.528,0c-8.982,8.982-8.981,23.545,0,32.528c8.982,8.98,23.545,8.981,32.528,0 C48.245,30.281,48.244,15.719,39.264,6.736z M25.999,33c0,1.657-1.343,3-3,3s-3-1.343-3-3V21c0-1.657,1.343-3,3-3s3,1.343,3,3V33z M22.946,15.872c-1.728,0-2.88-1.224-2.844-2.735c-0.036-1.584,1.116-2.771,2.879-2.771c1.764,0,2.88,1.188,2.917,2.771 C25.897,14.648,24.746,15.872,22.946,15.872z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="inline-block font-light text-white group-hover:text-white transition-all duration-[250ms] ease-[cubic-bezier(0.3,0,0.4,1)] border-b border-transparent hover:border-white">
                    {artist.name}
                  </p>
                  <p className="text-[14px] text-[#9b9b9b]">
                    Artist • {artist.followers.total.toLocaleString()} followers
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Top Tracks Column */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-[20px]">
            <h3 className="font-bold tracking-tight">Top Tracks of All Time</h3>
            <a
              href="/top-tracks"
              className="inline-block text-white text-[12px] tracking-[1px] uppercase border border-white px-[30px] py-[12px] cursor-pointer transition-[all] duration-[250ms] ease-[cubic-bezier(0.3,0,0.4,1)] text-center whitespace-nowrap hover:bg-white hover:text-black rounded-[30px]"
            >
              See More
            </a>
          </div>
          <div className="space-y-[15px]">
            {topTracks.map((track) => (
              <a
                key={track.id}
                href={track.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-[10px] transition duration-[250ms] group"
              >
                <div className="relative w-[50px] h-[50px] mr-[20px]">
                  <img
                    src={track.album.images[0]?.url}
                    alt={track.album.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-[250ms] ease-[cubic-bezier(0.3,0,0.4,1)]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 45.999 45.999"
                      className="w-[25px] h-[25px] fill-white"
                    >
                      <path d="M39.264,6.736c-8.982-8.981-23.545-8.982-32.528,0c-8.982,8.982-8.981,23.545,0,32.528c8.982,8.98,23.545,8.981,32.528,0 C48.245,30.281,48.244,15.719,39.264,6.736z M25.999,33c0,1.657-1.343,3-3,3s-3-1.343-3-3V21c0-1.657,1.343-3,3-3s3,1.343,3,3V33z M22.946,15.872c-1.728,0-2.88-1.224-2.844-2.735c-0.036-1.584,1.116-2.771,2.879-2.771c1.764,0,2.88,1.188,2.917,2.771 C25.897,14.648,24.746,15.872,22.946,15.872z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="inline-block font-light text-white group-hover:text-white transition-all duration-[250ms] ease-[cubic-bezier(0.3,0,0.4,1)] border-b border-transparent hover:border-white">
                    {track.name}
                  </p>
                  <p className="text-[14px] text-[#9b9b9b]">
                    {track.artists.map((artist) => artist.name).join(", ")}
                    &nbsp;&nbsp;·&nbsp;&nbsp;{track.album.name}
                  </p>
                </div>
                <div>
                  <p className="text-[#9b9b9b] text-sm">
                    {formatDuration(track.duration_ms)}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPreview;
