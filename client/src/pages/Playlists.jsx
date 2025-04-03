import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import Sidebar from "../components/Sidebar";

function Playlists({ token }) {
  const [playlists, setPlaylists] = useState([]);
  const [firstLoad, setFirstLoad] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          "https://api.spotify.com/v1/me/playlists",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setPlaylists(data.items);
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
      <div className="flex-1 ml-[100px]">
        <div className="flex-1 bg-[#181818] p-[80px] max-w-[1400px] mx-auto">
          <h2 className="text-white text-[24px] font-bold mb-[40px]">
            Your Playlists
          </h2>

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
                className={`grid grid-cols-5 gap-[30px] mt-[50px] ${
                  isLoading ? "opacity-50" : ""
                } transition-opacity duration-[250ms] ease-in-out`}
              >
                {playlists.map((playlist) => (
                  <a
                    key={playlist.id}
                    href={playlist.external_urls.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <div className="relative mb-[15px] aspect-square">
                      <img
                        src={
                          playlist.images[0]?.url ||
                          "https://placehold.co/400?text=No+Image"
                        }
                        alt={playlist.name}
                        className="w-full h-full object-cover group-hover:opacity-60 transition-opacity duration-[250ms] ease-in-out"
                      />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-[250ms] ease-[cubic-bezier(0.3,0,0.4,1)]"></div>
                    </div>
                    <div className="text-center">
                      <p className="text-white font-normal mb-[5px] hover:text-[#1db954] transition-colors">
                        {playlist.name}
                      </p>
                      <p className="text-[12px] text-[#9b9b9b] uppercase tracking-[1px]">
                        {playlist.tracks.total} Tracks
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

export default Playlists;
