/** @jsx jsx */
import React from "react";
import auth0 from "../auth0/auth0-util";
import { css, jsx } from "@emotion/core";
import { Link } from "react-router-dom";
import { Image, Icon, Button } from "semantic-ui-react";

export const headerHeight = "80px";
const fontSize = "1.25em";

const header = css`
  background-color: #222;
  padding: 10px;
  height: ${headerHeight};
  display: flex;
`;

const link = css`
  color: #0db4d6;
  padding: 1em 0 1em !important;
  font-size: ${fontSize};
  margin: 0 20px 0 auto;
`;

// TODO
const buttonWrapper = css`
  margin-top: 12px;
`;

const button = css`
  width: 96px;
  height: 36px;
`;

export interface NavHeaderProps {
  onClickNew: () => void;
}

const NavHeader: React.FC<NavHeaderProps> = ({ onClickNew }) => {
  return (
    <header className="NavHeader" css={header}>
      <UserProfile user={auth0.getUser()} />
      <div css={buttonWrapper}>
        <Button css={button} onClick={onClickNew}>
          <Icon name="add" />
          Note
        </Button>
      </div>
      <Link css={link} to="/logout">
        Logout
      </Link>
    </header>
  );
};

const divUserProfile = css`
  height: 60px;
  display: flex;
  padding: 5px;
  margin-right: 10px;
`;

const image = css`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin-right: 10px;
`;

const span = css`
  color: white;
  padding: 0.75em 0 1em !important;
  font-size: ${fontSize};
`;

const UserProfile: React.FC<{ user: any }> = ({ user }) => (
  <div className="UserProfile" css={divUserProfile}>
    <Image css={image} src={user.picture ? user.picture : ""} />
    <span css={span}>{user.name}</span>
  </div>
);

export default NavHeader;
