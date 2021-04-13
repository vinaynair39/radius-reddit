import React from "react";
import { ReactComponent as Home } from "assets/home.svg";
import { ReactComponent as Saved } from "assets/save.svg";

import "./Sidebar.scss";
import { subreddits } from "./subreddits";
import { Link, useLocation } from "react-router-dom";

interface Props {}
const Sidebar: React.FC<Props> = () => {
  const { pathname } = useLocation();
  console.log(pathname);
  return (
    <div className="sidebar">
      <div className="navs">
        <Link to="/" className={pathname === "/" ? "nav active" : "nav"}>
          <Home />
          <span style={{ paddingTop: 4 }}>Home</span>
        </Link>
        <Link
          to="/saved"
          className={pathname === "/saved" ? "nav active" : "nav"}
        >
          <Saved />
          <span>Saved</span>
        </Link>
      </div>

      <div className="subreddits">
        <span className="title">Subreddits</span>
        <ul>
          {subreddits.map(({ name, image }) => (
            <Link to={`/${name}`} className={pathname === name ? 'active': ""}>
              <img src={image} alt="icon" />
              <span>{name}</span>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Sidebar;
