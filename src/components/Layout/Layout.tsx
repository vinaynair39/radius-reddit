import React from "react";
import Header from "components/Header/Header";
import Sidebar from "components/Sidebar/Sidebar";
import "./Layout.scss";

interface Props {}
const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="layout">
      <div className="header">
        <Header />
      </div>
      <div className="content">
      <div className="sidebar">
      <Sidebar />
      </div>
        <div className="child">{children}</div>
      </div>
    </div>
  );
};
export default Layout;
