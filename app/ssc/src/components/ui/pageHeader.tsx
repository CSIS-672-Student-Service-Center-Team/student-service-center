import React from "react";
import { ArrowLeft, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

interface HeaderProps {
  title: string;
  isHomeScreen?: boolean;
  onLogout?: () => void;
  onBackClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title,
  isHomeScreen = false,
  onLogout,
  onBackClick
}) => {
  const router = useRouter();

  const handleBackClick = () => {
    // if we have this argument
    if (onBackClick) {
      onBackClick(); // Use the behavior
    } else {
      router.back(); // Navigate to home screen
    }
  };

  return (
    <header className="header"> {/* Use the new CSS class */}
      {isHomeScreen ? (
        <button onClick={onLogout} className="text-white">
          <LogOut size={24} />
        </button>
      ) : (
        <button onClick={handleBackClick} className="text-white">
          <ArrowLeft size={24} />
        </button>
      )}
      <h1>{title}</h1>
      <div className="spacer"></div> {/* Spacer for alignment */}
    </header>
  );
};

export default Header;
