import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { setFollowingUser, setFollowedUser } from '../../services/firebase';

export default function SuggestedProfile({
  userDocId,
  username,
  profileId,
  userId,
  loggedInUserDocId
}) {
  const [followed, setFollowed] = useState(false);
  console.log('userDocId: ', userDocId, '\nprofileId: ', profileId, '\nuserId: ', userId);

  async function followUser() {
    setFollowed(true);

    // firebase: create 2 services (functions)
    // update the following array of the logged in user (in this case, my profile)
    // update the followers array of the user who has been followed

    setFollowingUser(loggedInUserDocId, profileId);
    setFollowedUser(userDocId, userId);
  }

  return !followed ? (
    <div className="flex flex-row items-center align-items justify-between">
      <div className="flex items-center justify-between">
        <img
          className="rounded-full w-8 flex mr-3"
          src={`/images/avatars/${username}.jpg`}
          alt=""
        />
        <Link to={`/p/${username}`} className="font-bold text-sm">
          {username}
        </Link>
      </div>
      <button
        className="text-xs font-bold text-blue-medium"
        type="button"
        onClick={() => followUser()}
      >
        Follow
      </button>
    </div>
  ) : null;
}

SuggestedProfile.propTypes = {
  userDocId: PropTypes.string,
  username: PropTypes.string,
  profileId: PropTypes.string,
  userId: PropTypes.string,
  loggedInUserDocId: PropTypes.string
};
