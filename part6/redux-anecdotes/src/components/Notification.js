import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleVisibility } from "../reducers/notificationReducer";

const Notification = () => {
  const dispatch = useDispatch();
  const message = useSelector(({ notification }) => notification.message);

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(toggleVisibility());
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };

  return <div style={style}>{message}</div>;
};

export default Notification;
