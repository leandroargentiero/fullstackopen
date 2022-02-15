import PropTypes from 'prop-types';

const Notification = ({ message, state }) => {
  if (message === null) {
    return null;
  }

  if (state === 'success') {
    return <div className="notification success">{message}</div>;
  }

  return <div className="notification error">{message}</div>;
};

Notification.propTypes = {
  message: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.oneOf([null].isRequired),
  ]).isRequired,
  state: PropTypes.string.isRequired,
};

export default Notification;
