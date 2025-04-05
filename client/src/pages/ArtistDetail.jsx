import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";
import Sidebar from "../components/Sidebar";

function ArtistDetail({ token }) {
  const { artistId } = useParams();
  const [artist, setArtist] = useState(null);
  const [firstLoad, setFirstLoad] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://api.spotify.com/v1/artists/${artistId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setArtist(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
        setFirstLoad(false);
      }
    };

    fetchData();
  }, [artistId, token]);

  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />
      <div className="w-full md:flex-1 lg:ml-[100px]">
        <div className="bg-[#181818] p-[20px] md:py-[40px] md:px-[30px] lg:p-[80px] max-w-[1400px] mx-auto min-h-screen	">
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
                className={`flex flex-col items-center ${
                  isLoading ? "opacity-50" : ""
                } transition-opacity duration-300`}
              >
                {/* Artist Artwork */}
                <div className="w-[200px] h-[200px] lg:w-[300px] lg:h-[300px] rounded-full overflow-hidden mb-[20px] md:mb-[30px]">
                  <img
                    src={artist?.images[0]?.url}
                    alt={artist?.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Artist Name */}
                <h1 className="text-[30px] sm:text-[40px] md:text-[50px] font-bold text-white mb-[10px] text-center">
                  {artist?.name}
                </h1>

                {/* Followers */}
                <div className="flex flex-col items-center mb-[20px] md:mb-[30px]">
                  <p className="text-[18px] sm:text-[20px] md:text-[24px] font-medium text-[#1db954]">
                    {artist?.followers.total.toLocaleString()}
                  </p>
                  <p className="text-[12px] md:text-[14px] text-[#9b9b9b] uppercase tracking-[1px]">
                    Followers
                  </p>
                </div>

                {/* Genres */}
                <div className="mb-[20px] md:mb-[30px] px-[15px]">
                  <div className="flex flex-wrap justify-center gap-[8px] md:gap-[10px]">
                    {artist?.genres.map((genre) => (
                      <span
                        key={genre}
                        className="bg-[#2a2a2a] text-white px-[12px] md:px-[15px] py-[4px] md:py-[5px] rounded-[20px] text-[12px] md:text-[14px]"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                  <p className="text-[12px] md:text-[14px] text-[#9b9b9b] uppercase tracking-[1px] text-center mt-[8px] md:mt-[10px]">
                    Genres
                  </p>
                </div>

                {/* Popularity */}
                <div className="mb-[30px] md:mb-[40px] w-[180px] sm:w-[200px]">
                  <div className="w-full bg-[#3d3d3d] rounded-full h-[6px] md:h-[8px]">
                    <div
                      className="bg-[#1db954] h-[6px] md:h-[8px] rounded-full"
                      style={{ width: `${artist?.popularity}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-[5px]">
                    <p className="text-[12px] md:text-[14px] text-[#9b9b9b]">
                      Popularity
                    </p>
                    <p className="text-[12px] md:text-[14px] text-[#1db954]">
                      {artist?.popularity}%
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-[12px] sm:gap-[15px] w-full justify-center">
                  <a
                    href={artist?.external_urls.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-white text-[11px] sm:text-[12px] uppercase tracking-[1px] bg-[#1db954] px-[25px] sm:px-[30px] py-[10px] sm:py-[12px] rounded-[30px] hover:bg-opacity-80 transition-all duration-200 text-center"
                  >
                    Open in Spotify
                  </a>
                  <Link
                    to="/top-artists"
                    className="text-white text-[11px] sm:text-[12px] uppercase tracking-[1px] border border-white px-[25px] sm:px-[30px] py-[10px] sm:py-[12px] rounded-[30px] hover:bg-white hover:text-black transition-all duration-[250ms] ease-[cubic-bezier(0.3,0,0.4,1)] text-center"
                  >
                    Back to Top Artists
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ArtistDetail;
