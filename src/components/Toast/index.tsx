import { useEffect } from "react";
import "./styles.css";

interface ToastProps {
  text: string;
  turnOff: () => void;
}

const Toast: React.FC<ToastProps> = ({ text, turnOff }) => {
  useEffect(() => {
    setTimeout(() => {
      turnOff();
    }, 4000);
  }, []);

  return <div className="toast">{text}</div>;
};

export default Toast;
