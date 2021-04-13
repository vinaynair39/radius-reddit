import React from "react";
import Searchbar from "components/Searchbar/Searchbar";
import { ReactComponent as Logo } from "assets/reddit.svg";
import { ReactComponent as Hot } from "assets/fire.svg";
import { ReactComponent as Top } from "assets/top.svg";
import { ReactComponent as New } from "assets/new.svg";

import "./Header.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "store/store";
import { setPostType } from "store/filter/reducer";
import { Link, useHistory, useLocation } from "react-router-dom";

interface Props {}
const Header: React.FC<Props> = () => {
  const postType = useSelector((state: AppState) => state.filter.postType);
  const {pathname} = useLocation()
  const history = useHistory()
  const dispatch = useDispatch();

  const handleClick = (type: string) => {
    dispatch(setPostType(type));
    if(pathname !== "/") {
      history.push('/')
    }
  };

  return (
    <div className="header">
      <Link to="/" className="logo">
        <Logo />
      </Link>
      <div className="filters">
        <button
          name="HOT"
          onClick={() => handleClick("HOT")}
          className={postType === "HOT" ? "filter active" : "filter"}
        >
          <Hot /> <span>Hot</span>
        </button>
        <button
          name="BEST"
          onClick={() => handleClick("NEW")}
          className={postType === "NEW" ? "filter active" : "filter"}
        >
          <New /> <span>New</span>
        </button>
        <button
          name="TOP"
          onClick={() => handleClick("TOP")}
          className={postType === "TOP" ? "filter active" : "filter"}
        >
          <Top /> <span>Top</span>
        </button>
      </div>
      <div className="searchbar">
        <Searchbar />
      </div>
    </div>
  );
};
export default Header;
