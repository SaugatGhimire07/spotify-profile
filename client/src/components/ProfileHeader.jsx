import React from "react";

function ProfileHeader({ profile, following, playlists, handleLogout }) {
  return (
    <div className="w-full text-white">
      <div className="flex flex-col items-center mb-4 md:mb-8">
        {profile.images[0]?.url && (
          <img
            src={profile.images[0]?.url}
            alt="Profile"
            className="rounded-full w-[100px] h-[100px] md:w-[150px] md:h-[150px] object-cover"
          />
        )}
        <div className="text-center">
          <a
            href={
              profile.external_urls?.spotify ||
              `https://open.spotify.com/user/${profile.id}`
            }
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <h1 className="text-[32px] md:text-[50px] font-semibold duration-300">
              {profile.display_name}
            </h1>
          </a>

          {/* Stats in horizontal layout with green numbers */}
          <div className="flex flex-wrap justify-center gap-[15px] md:gap-[30px] mt-[15px] md:mt-[20px] mb-[10px] font-normal">
            <div className="text-center">
              <p className="text-lg md:text-xl font-medium text-[#1db954]">
                {profile.followers.total}
              </p>
              <p className="text-[10px] md:text-[12px] uppercase tracking-[1px] mt-[5px] text-[#9b9b9b]">
                Followers
              </p>
            </div>

            <div className="text-center">
              <p className="text-lg md:text-xl font-medium text-[#1db954]">
                {following.total || 0}
              </p>
              <p className="text-[10px] md:text-[12px] uppercase tracking-[1px] mt-[5px] text-[#9b9b9b]">
                Following
              </p>
            </div>

            <div className="text-center">
              <p className="text-lg md:text-xl font-medium text-[#1db954]">
                {playlists.total}
              </p>
              <p className="text-[10px] md:text-[12px] uppercase tracking-[1px] mt-[5px] text-[#9b9b9b]">
                Playlists
              </p>
            </div>
          </div>

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleLogout();
            }}
            className="inline-block text-white text-[10px] md:text-[12px] uppercase tracking-[1px] border border-white px-[20px] md:px-[30px] py-[8px] md:py-[12px] rounded-[30px] hover:bg-white hover:text-black transition-all duration-[250ms] ease-[cubic-bezier(0.3,0,0.4,1)] mt-[20px] md:mt-[30px]"
          >
            Logout
          </a>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
