import React from "react";
import { Home, Bell, User } from "lucide-react";
import { useRouter } from "next/router";

const NavBar: React.FC = () => {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className="navbar">{/* Use the new CSS */}
      <span><button
        onClick={() => handleNavigation("/home")}
      >
        <Home size={32} />
      </button></span>
      <div className="divider"></div>
      <button
        onClick={() => handleNavigation("/notification")}
      >
        <Bell size={32} />
      </button>
      <div className="divider"></div>
      <button
        onClick={() => handleNavigation("/profile")}
      >
        <User size={32} />
      </button>
    </div>
  );
};

export default NavBar;
