import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";
import Sidebar from "../components/Sidebar";

function TrackDetails({ token }) {
  const { trackId } = useParams();
  const navigate = useNavigate();
  const [track, setTrack] = useState(null);
  const [firstLoad, setFirstLoad] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://api.spotify.com/v1/tracks/${trackId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTrack(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
        setFirstLoad(false);
      }
    };

    fetchData();
  }, [trackId, token]);

  const formatReleaseDate = (date) => {
    return new Date(date).getFullYear();
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-[100px]">
        <div className="flex-1 bg-[#181818] p-[80px] max-w-[1400px] mx-auto">
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
                className={`flex items-start gap-[40px] ${
                  isLoading ? "opacity-50" : ""
                } transition-opacity duration-300`}
              >
                {/* Left Section - Album Art */}
                <div className="w-[250px] flex-shrink-0">
                  <img
                    src={
                      track?.album.images[0]?.url ||
                      "https://placehold.co/400?text=No+Image"
                    }
                    alt={track?.name}
                    className="w-full aspect-square object-cover shadow-xl"
                  />
                </div>

                {/* Right Section - Track Info */}
                <div className="flex-1">
                  <h2 className="text-[42px] tracking-tight font-bold text-white">
                    {track?.name}
                  </h2>
                  <p className="text-[24px] tracking-tight text-[#b3b3b3] font-bold mb-[5px]">
                    {track?.artists.map((artist) => artist.name).join(", ")}
                  </p>
                  <p className="text-[16px] text-[#b3b3b3] mb-[30px]">
                    {track?.album.name} ·{" "}
                    {formatReleaseDate(track?.album.release_date)}
                  </p>
                  <div className="flex gap-[15px]">
                    <a
                      href={track?.external_urls.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-white text-[12px] uppercase tracking-[1px] bg-[#1db954] px-[30px] py-[12px] rounded-[30px] hover:bg-opacity-80 transition-all duration-200"
                    >
                      Play on Spotify
                    </a>
                    <button
                      onClick={() => navigate(-1)}
                      className="text-white text-[12px] uppercase tracking-[1px] border border-white px-[30px] py-[12px] rounded-[30px] hover:bg-white hover:text-black transition-all duration-200"
                    >
                      Back
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TrackDetails;
