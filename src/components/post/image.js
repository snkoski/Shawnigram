import PropTypes from 'prop-types';

export default function Header({ src, caption }) {
  return <img src={src} alt={caption} />;
}

Header.propTypes = {
  src: PropTypes.string,
  caption: PropTypes.string
};
