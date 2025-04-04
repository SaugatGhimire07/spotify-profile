import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  // Navigation items with SVG icons
  const navItems = [
    {
      name: "Profile",
      path: "/dashboard",
      icon: (
        <svg viewBox="0 0 1024 1024" width="100%" height="100%">
          <path d="m730.06 679.64q-45.377 53.444-101.84 83.443t-120 29.999q-64.032 0-120.75-30.503t-102.6-84.451q-40.335 13.109-77.645 29.747t-53.948 26.722l-17.142 10.084q-29.747 19.159-51.175 57.729t-21.428 73.107 25.461 59.242 60.754 24.705h716.95q35.293 0 60.754-24.705t25.461-59.242-21.428-72.603-51.679-57.225q-6.554-4.033-18.907-10.84t-51.427-24.453-79.409-30.755zm-221.84 25.72q-34.285 0-67.561-14.873t-60.754-40.335-51.175-60.502-40.083-75.124-25.461-84.451-9.075-87.728q0-64.032 19.915-116.22t54.452-85.964 80.67-51.931 99.072-18.151 99.072 18.151 80.67 51.931 54.452 85.964 19.915 116.22q0 65.04-20.167 130.58t-53.948 116.72-81.426 83.443-98.568 32.268z" />
        </svg>
      ),
    },
    {
      name: "Top Artists",
      path: "/top-artists",
      icon: (
        <svg viewBox="0 0 47.5 47.5" width="100%" height="100%">
          <path d="M44.159,3.341C41.932,1.115,39.013,0,36.093,0c-2.919,0-5.838,1.114-8.064,3.341c-4.454,4.454-4.454,11.677,0,16.131     c2.227,2.227,5.146,3.341,8.064,3.341s5.839-1.114,8.066-3.341C48.613,15.019,48.613,7.796,44.159,3.341z" />
          <path d="M22.161,14.999L0.646,39.161c-0.9,1.011-0.854,2.604,0.103,3.562l1.132,1.133L1.158,44.58     c-0.477,0.477-0.477,1.256,0,1.731l0.108,0.108c0.477,0.478,1.256,0.478,1.733,0l0.723-0.724l1.055,1.055     c0.957,0.957,2.552,1.003,3.563,0.104l24.155-21.509c-2.469-0.633-4.739-1.902-6.589-3.752     C24.019,19.706,22.779,17.416,22.161,14.999z" />
        </svg>
      ),
    },
    {
      name: "Top Tracks",
      path: "/top-tracks",
      icon: (
        <svg viewBox="0 0 489.164 489.164" width="100%" height="100%">
          <path d="M159.582,75.459v285.32c-14.274-10.374-32.573-16.616-52.5-16.616c-45.491,0-82.5,32.523-82.5,72.5s37.009,72.5,82.5,72.5 s82.5-32.523,82.5-72.5V168.942l245-60.615v184.416c-14.274-10.374-32.573-16.616-52.5-16.616c-45.491,0-82.5,32.523-82.5,72.5 s37.009,72.5,82.5,72.5s82.5-32.523,82.5-72.5V0L159.582,75.459z" />
        </svg>
      ),
    },
    {
      name: "Recent",
      path: "/recent",
      icon: (
        <svg viewBox="0 0 510 510" width="100%" height="100%">
          <path d="M267.75,12.75c-89.25,0-168.3,48.45-209.1,122.4L0,76.5v165.75h165.75l-71.4-71.4c33.15-63.75,96.9-107.1,173.4-107.1C372.3,63.75,459,150.45,459,255s-86.7,191.25-191.25,191.25c-84.15,0-153-53.55-181.05-127.5H33.15c28.05,102,122.4,178.5,234.6,178.5C402.9,497.25,510,387.6,510,255C510,122.4,400.35,12.75,267.75,12.75z" />
        </svg>
      ),
    },
    {
      name: "Playlists",
      path: "/playlists",
      icon: (
        <svg viewBox="0 0 405.333 405.333" width="100%" height="100%">
          <g>
            <rect x="0" y="53.333" width="256" height="42.667" />
            <rect x="0" y="138.667" width="256" height="42.667" />
            <path d="M298.667,53.333v174.613c-6.72-2.453-13.76-3.947-21.333-3.947c-35.307,0-64,28.693-64,64c0,35.307,28.693,64,64,64 c35.307,0,64-28.693,64-64V96h64V53.333H298.667z" />
            <rect x="0" y="224" width="170.667" height="42.667" />
          </g>
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* Desktop Sidebar (large screens only) */}
      <div
        className="hidden lg:flex fixed top-0 left-0 h-screen w-[100px] bg-[#040406] flex-col"
        style={{ boxShadow: "rgba(0, 0, 0, 0.3) 0px 0px 10px" }}
      >
        {/* Spotify Logo */}
        <div className="flex flex-col items-center mt-[30px]">
          <a
            href="https://open.spotify.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg viewBox="0 0 427.652 427.652" className="w-[50px] h-[50px]">
              {/* Circle background */}
              <path
                fill="#18b954"
                d="M213.826,0C95.733,0,0,95.733,0,213.826s95.733,213.826,213.826,213.826s213.826-95.733,213.826-213.826S331.919,0,213.826,0z"
              />
              {/* Music waves */}
              <path
                fill="#ffffff"
                d="M306.886,154.391c-61.849-36.129-153.334-39.453-207.788-21.846c-6.487,2.095-13.362-1.451-15.458-7.939 c-2.095-6.488,1.452-13.362,7.94-15.458c60.368-18.836,160.791-15.185,229.018,25.251c5.959,3.479,7.977,11.124,4.498,17.085 C321.617,155.843,313.972,157.861,306.886,154.391z"
              />
              <path
                fill="#ffffff"
                d="M298.094,200.615c-51.619-30.152-134.937-38.849-189.339-21.297c-5.406,1.746-11.15-1.22-12.896-6.625 c-1.746-5.405,1.22-11.149,6.625-12.896c61.31-19.743,151.377-10.122,209.775,24.036c4.97,2.905,6.646,9.309,3.741,14.279 C312.095,201.844,305.691,203.52,298.094,200.615z"
              />
              <path
                fill="#ffffff"
                d="M290.246,245.572c-41.297-24.137-103.207-29.594-146.891-16.229c-4.324,1.396-8.919-0.979-10.316-5.303 c-1.396-4.324,0.979-8.919,5.303-10.316c49.699-15.188,117.397-9.073,163.698,18.131c3.976,2.324,5.317,7.444,2.993,11.42 C302.708,246.555,297.588,247.896,290.246,245.572z"
              />
            </svg>
          </a>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 flex items-center justify-center">
          <ul className="flex flex-col items-center w-full">
            {navItems.map((item) => (
              <li key={item.name} className="w-full flex flex-col items-center">
                <Link
                  to={item.path}
                  className={`flex flex-col items-center w-full py-[15px] transition-colors duration-200 ${
                    location.pathname === item.path
                      ? "text-white bg-[#181818] border-l-[5px] border-[#1ed760]"
                      : "text-[#9b9b9b] hover:text-white"
                  }`}
                >
                  <div className="w-[20px] h-[20px] mb-[7px] flex items-center justify-center fill-current">
                    {item.icon}
                  </div>
                  <span className="text-[11px]">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* GitHub Link */}
        <div className="flex justify-center mb-[30px]">
          <a
            href="https://github.com/saugatghimire"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#9b9b9b] hover:text-white transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Bottom Navigation for Mobile and Tablet */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#040406] shadow-up z-50">
        <ul className="flex justify-around items-center h-[60px]">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`flex flex-col items-center px-3 py-1 ${
                  location.pathname === item.path
                    ? "text-[#1ed760]"
                    : "text-[#9b9b9b]"
                }`}
              >
                <div className="w-[20px] h-[20px] mb-1 flex items-center justify-center fill-current">
                  {item.icon}
                </div>
                <span className="text-[10px]">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
