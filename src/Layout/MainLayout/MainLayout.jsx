import * as React from "react";
import "./mainlayout.css";

const MainLayout = React.memo(({ children }) => {
  return <div className="content-main">{children}</div>;
});

export default MainLayout;
