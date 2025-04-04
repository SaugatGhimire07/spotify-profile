import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import Sidebar from "../components/Sidebar";

const formatDuration = (ms) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

function Recent({ token }) {
  const [recentTracks, setRecentTracks] = useState([]);
  const [firstLoad, setFirstLoad] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          "https://api.spotify.com/v1/me/player/recently-played?limit=50",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setRecentTracks(data.items);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
        setFirstLoad(false);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-0 lg:ml-[100px]">
        <div className="flex-1 bg-[#181818] p-[20px] md:py-[50px] md:px-[40px] lg:p-[80px] max-w-[1400px] mx-auto">
          {/* Update title styling to match TopTracks */}
          <div className="mb-[40px]">
            <h2 className="text-white text-[24px] font-bold text-center md:text-center lg:text-left">
              Recently Played Tracks
            </h2>
          </div>

          {firstLoad ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <Loading />
            </div>
          ) : (
            <div className="relative">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="scale-50">
                    <Loading />
                  </div>
                </div>
              )}
              <div
                className={`space-y-[10px] md:space-y-[15px] mt-[30px] md:mt-[50px] ${
                  isLoading ? "opacity-50" : ""
                } transition-opacity duration-[250ms] ease-in-out`}
              >
                {recentTracks.map((item) => (
                  <a
                    key={`${item.track.id}-${item.played_at}`}
                    href={item.track.external_urls.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-[8px] md:p-[10px] transition duration-[250ms] ease-in-out group hover:bg-[#282828] rounded"
                  >
                    <div className="relative w-[40px] h-[40px] md:w-[50px] md:h-[50px] mr-[15px] md:mr-[20px]">
                      <img
                        src={item.track.album.images[0]?.url}
                        alt={item.track.album.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-[250ms] ease-[cubic-bezier(0.3,0,0.4,1)]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 45.999 45.999"
                          className="w-[20px] h-[20px] md:w-[25px] md:h-[25px] fill-white"
                        >
                          <path d="M39.264,6.736c-8.982-8.981-23.545-8.982-32.528,0c-8.982,8.982-8.981,23.545,0,32.528c8.982,8.98,23.545,8.981,32.528,0 C48.245,30.281,48.244,15.719,39.264,6.736z M25.999,33c0,1.657-1.343,3-3,3s-3-1.343-3-3V21c0-1.657,1.343-3,3-3s3,1.343,3,3V33z M22.946,15.872c-1.728,0-2.88-1.224-2.844-2.735c-0.036-1.584,1.116-2.771,2.879-2.771c1.764,0,2.88,1.188,2.917,2.771 C25.897,14.648,24.746,15.872,22.946,15.872z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="inline-block font-light text-white group-hover:text-white transition-all duration-[250ms] ease-[cubic-bezier(0.3,0,0.4,1)] border-b border-transparent hover:border-white">
                        {item.track.name}
                      </p>
                      <p className="text-[14px] text-[#9b9b9b]">
                        {item.track.artists
                          .map((artist) => artist.name)
                          .join(", ")}
                        &nbsp;&nbsp;·&nbsp;&nbsp;{item.track.album.name}
                      </p>
                    </div>
                    <div className="ml-[15px] md:ml-[20px]">
                      <p className="text-[#9b9b9b] text-xs md:text-sm whitespace-nowrap">
                        {formatDuration(item.track.duration_ms)}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Recent;
