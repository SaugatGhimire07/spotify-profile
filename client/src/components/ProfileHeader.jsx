import React from "react";

function ProfileHeader({ profile, following, playlists, handleLogout }) {
  return (
    <div className="w-full text-white">
      <div className="flex flex-col items-center mb-8">
        {profile.images[0]?.url && (
          <img
            src={profile.images[0]?.url}
            alt="Profile"
            className="rounded-full w-[150px] h-[150px] object-cover"
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
            <h1 className="text-[50px] font-semibold duration-300">
              {profile.display_name}
            </h1>
          </a>

          {/* Stats in horizontal layout with green numbers */}
          <div className="flex justify-center gap-[30px] mt-[20px] mb-[10px] font-normal">
            <div className="text-center">
              <p className="text-xl font-medium text-[#1db954]">
                {profile.followers.total}
              </p>
              <p className="text-[12px] uppercase tracking-[1px] mt-[5px] text-[#9b9b9b]">
                Followers
              </p>
            </div>

            <div className="text-center">
              <p className="text-xl font-medium text-[#1db954]">
                {following.total || 0}
              </p>
              <p className="text-[#9b9b9b] text-[12px] uppercase tracking-[1px] mt-[5px]">
                Following
              </p>
            </div>

            <div className="text-center">
              <p className="text-xl font-medium text-[#1db954]">
                {playlists.total}
              </p>
              <p className="text-[#9b9b9b] text-[12px] uppercase tracking-[1px] mt-[5px]">
                Playlists
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="inline-block text-white font-bold text-[12px] tracking-[1px] uppercase border border-white px-[30px] py-[12px] cursor-pointer transition-[all] duration-[250ms] ease-[cubic-bezier(0.3,0,0.4,1)] text-center whitespace-nowrap hover:bg-white hover:text-black rounded-[30px] mt-[30px]"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
