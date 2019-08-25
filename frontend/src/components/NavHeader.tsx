import React from "react";
import auth0 from "../auth0/auth0-util";

export interface NavHeaderProps {
  onClickLogout: () => void;
  onClickNew: () => void;
}

const NavHeader: React.FC<NavHeaderProps> = ({ onClickLogout, onClickNew }) => {
  return (
    <div className="NavHeader">
      <h2>User: {auth0.getUser().name}</h2>
      <button onClick={onClickNew}>NEW</button>
      <button onClick={onClickLogout}>Logout</button>
    </div>
  );
};

export default NavHeader;
