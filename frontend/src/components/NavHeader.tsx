import React from "react";

export interface NavHeaderProps {
  logout: () => void;
}

const NavHeader: React.FC<NavHeaderProps> = ({ logout }) => {
  return (
    <div className="NavHeader">
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default NavHeader;
