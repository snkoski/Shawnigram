import PropTypes from 'prop-types';

export default function SuggestedProfile({ userDocId, username, profileId, userId }) {
  return <img src={`/images/avatars/${username}.jpg`} alt="" />;
}

SuggestedProfile.propTypes = {
  userDocId: PropTypes.string,
  username: PropTypes.string,
  profileId: PropTypes.string,
  userId: PropTypes.string
};
