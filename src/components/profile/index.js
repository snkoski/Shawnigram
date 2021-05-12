import { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import Photos from './photos';
import Header from './header';
import { getPhotosByUserId } from '../../services/firebase';

export default function Profile({ user }) {
  const reducer = (state, newState) => ({ ...state, ...newState });
  const initialState = {
    profile: {},
    photosCollection: [],
    followerCount: 0
  };

  const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function getProfileInfoAndPhotos() {
      const photos = await getPhotosByUserId(user.userId);
      dispatch({ profile: user, photosCollection: photos, followerCount: user.followers.length });
    }
    if (user.username) {
      getProfileInfoAndPhotos();
    }
  }, [user]);
  return (
    <>
      <Header
        profile={profile}
        photoCount={photosCollection.length}
        followerCount={followerCount}
        setFollowerCount={dispatch}
      />
      <Photos photos={photosCollection} />
    </>
  );
}

Profile.propTypes = {
  user: PropTypes.shape({
    dateCreated: PropTypes.number.isRequired,
    docId: PropTypes.string.isRequired,
    emailAddress: PropTypes.string.isRequired,
    followers: PropTypes.array.isRequired,
    following: PropTypes.array.isRequired,
    fullName: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired
  })
};
