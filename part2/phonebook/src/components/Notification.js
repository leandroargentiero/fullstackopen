const Notification = ({ notification }) => {
  if (notification.message === null) {
    return null;
  }

  if (notification.state === 'success') {
    return <div className="notification success">{notification.message}</div>;
  }

  return <div className="notification error">{notification.message}</div>;
};

export default Notification;
