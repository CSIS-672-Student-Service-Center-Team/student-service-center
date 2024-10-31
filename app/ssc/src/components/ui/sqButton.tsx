import React from "react";

interface SquareButtonProps {
  icon: string | React.ReactNode;
  label: string;
  onClick: () => void;
  size?: number; // Size in pixels
  labelStyle?: React.CSSProperties;
}

const SquareButton: React.FC<SquareButtonProps> = ({
  icon,
  label,
  onClick,
  size = 100, // Default size of 100px
  labelStyle,
}) => {
  return (
    <button
      className="bg-red-800 text-white rounded-3xl flex flex-col items-center justify-center"
      onClick={onClick}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      {typeof icon === "string" ? (
        <span className="text-2xl mb-1">{icon}</span>
      ) : (
        <div className="mb-1">{icon}</div>
      )}
      <span className="text-xs" style={labelStyle}>
        {label}
      </span>
    </button>
  );
};

export default SquareButton;
