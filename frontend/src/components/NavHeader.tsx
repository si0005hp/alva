import React from "react";

export interface NavHeaderProps {
  onClickLogout: () => void;
  onClickNew: () => void;
}

const NavHeader: React.FC<NavHeaderProps> = ({ onClickLogout, onClickNew }) => {
  return (
    <div className="NavHeader">
      <button onClick={onClickLogout}>Logout</button>
      <button onClick={onClickNew}>NEW</button>
    </div>
  );
};

export default NavHeader;
