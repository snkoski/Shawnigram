import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import useUser from '../../hooks/use-user';
import { toggleFollow } from '../../services/firebase';

export default function Header({
  profile: {
    docId: profileDocId,
    userId: profileUserId,
    fullName: profileFullName,
    followers: profileFollowers = [],
    following: profileFollowing = [],
    username: profileUsername
  },
  photoCount,
  followerCount,
  setFollowerCount
}) {
  const { user } = useUser();
  const [isFollowingProfile, setIsFollowingProfile] = useState(false);
  const activeBtnFollow = user.username && user.username !== profileUsername;

  const handleToggleFollow = async (event) => {
    event.preventDefault();

    await toggleFollow(user.docId, user.userId, profileDocId, profileUserId, isFollowingProfile);

    setFollowerCount({
      followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1
    });

    setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
  };

  useEffect(() => {
    const isLoggedInUserFollowingProfile = () => {
      const isFollowing = user.following.includes(profileUserId);
      setIsFollowingProfile(isFollowing);
    };
    if (user.following && profileUserId) {
      isLoggedInUserFollowingProfile();
    }
  }, [user.following, profileUserId]);

  return (
    <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
      <div className="container flex justify-center items-center">
        <img
          src={`/images/avatars/${profileUsername}.jpg`}
          alt={`${profileUsername} profile`}
          className="rounded-full h-40 w-40 flex"
        />
      </div>
      <div className="flex items-center justify-center flex-col col-span-2">
        <div className="container flex items-center">
          <p className="text-2xl mr-4">{profileUsername}</p>
          {activeBtnFollow && (
            <button
              className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
              type="button"
              onClick={handleToggleFollow}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  handleToggleFollow();
                }
              }}
            >
              {isFollowingProfile ? 'Unfollow' : 'Follow'}
            </button>
          )}
        </div>
        <div className="container flex mt-4">
          {profileFollowers === undefined || profileFollowing === undefined ? (
            <Skeleton count={1} width={677} height={24} />
          ) : (
            <>
              <p className="mr-10">
                <span className="font-bold">{photoCount}</span>
                {` `}
                {photoCount === 1 ? 'Photo' : 'Photos'}
              </p>
              <p className="mr-10">
                <span className="font-bold">{followerCount}</span>
                {` `}
                {followerCount === 1 ? 'Follower' : 'Followers'}
              </p>
              <p className="mr-10">
                <span className="font-bold">{profileFollowing.length}</span>
                {` `}Following
              </p>
            </>
          )}
        </div>
        <div className="container mt-4">
          <p className="font-medium">
            {!profileFullName ? <Skeleton count={1} height={24} /> : profileFullName}
          </p>
        </div>
      </div>
    </div>
  );
}

Header.propTypes = {
  photoCount: PropTypes.number.isRequired,
  followerCount: PropTypes.number.isRequired,
  setFollowerCount: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    docId: PropTypes.string,
    userId: PropTypes.string,
    fullName: PropTypes.string,
    following: PropTypes.array,
    username: PropTypes.string,
    followers: PropTypes.array
  }).isRequired
};
