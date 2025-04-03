import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import Sidebar from "../components/Sidebar";
import TimeRangeButtons from "../components/TimeRangeButtons";

function TopArtists({ token }) {
  const [topArtists, setTopArtists] = useState([]);
  const [timeRange, setTimeRange] = useState("long_term");
  const [firstLoad, setFirstLoad] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}&limit=50`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTopArtists(data.items);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
        setFirstLoad(false);
      }
    };

    fetchData();
  }, [token, timeRange]);

  // Render the layout immediately, only show loading for content
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-[100px]">
        <div className="flex-1 bg-[#181818] p-[80px] max-w-[1400px] mx-auto">
          <div className="flex items-center justify-between mb-[40px]">
            <h2 className="text-white text-[24px] font-bold">Top Artists</h2>
            <TimeRangeButtons
              timeRange={timeRange}
              setTimeRange={setTimeRange}
              isChangingTimeRange={isLoading}
            />
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
                className={`grid grid-cols-5 gap-[20px] mt-[50px] ${
                  isLoading ? "opacity-50" : ""
                } transition-opacity duration-[250ms] ease-in-out`}
              >
                {topArtists.map((artist) => (
                  <div key={artist.id} className="flex flex-col items-center">
                    <a
                      href={artist.external_urls.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/image"
                    >
                      <div className="relative mb-[15px] rounded-full overflow-hidden w-[200px] h-[200px]">
                        <img
                          src={artist.images[0]?.url}
                          alt={artist.name}
                          className="w-full h-full object-cover group-hover/image:opacity-60 transition-opacity duration-[250ms] ease-in-out"
                        />
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity duration-[250ms] ease-[cubic-bezier(0.3,0,0.4,1)]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 45.999 45.999"
                            className="w-[25px] h-[25px] fill-white"
                          >
                            <path d="M39.264,6.736c-8.982-8.981-23.545-8.982-32.528,0c-8.982,8.982-8.981,23.545,0,32.528c8.982,8.98,23.545,8.981,32.528,0 C48.245,30.281,48.244,15.719,39.264,6.736z M25.999,33c0,1.657-1.343,3-3,3s-3-1.343-3-3V21c0-1.657,1.343-3,3-3s3,1.343,3,3V33z M22.946,15.872c-1.728,0-2.88-1.224-2.844-2.735c-0.036-1.584,1.116-2.771,2.879-2.771c1.764,0,2.88,1.188,2.917,2.771 C25.897,14.648,24.746,15.872,22.946,15.872z" />
                          </svg>
                        </div>
                      </div>
                    </a>
                    <a
                      href={artist.external_urls.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/name"
                    >
                      <p className="inline-block font-light text-white transition-all duration-[250ms] ease-[cubic-bezier(0.3,0,0.4,1)] border-b border-transparent group-hover/name:border-white">
                        {artist.name}
                      </p>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TopArtists;
