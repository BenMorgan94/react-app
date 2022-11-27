import React, { useEffect } from "react";
import "./toast.scss";

export interface ToastProps {
  id: string;
  destroy: () => void;
  title: string;
  content: string;
  duration?: number;
}

const Toast  = ({ destroy, title, content, duration }: ToastProps) =>  {
  useEffect(() => {
    if (!duration) return;

    const timer = setTimeout(() => {
      destroy();
    }, duration);

    return () => clearTimeout(timer);
  }, [destroy, duration]);

  return (
    <div>
      <div className="toast-header">
        <div>{title}</div>
        <button onClick={destroy}>X</button>
      </div>
      <div className="toast-body">{content}</div>
    </div>
  );
};

export default Toast;
