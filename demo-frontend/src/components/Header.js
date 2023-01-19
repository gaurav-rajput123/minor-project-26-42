import React from "react";
import logo from "./uiet.png";
function Header() {
  return (
    <div className="flex bg-0397B8">
      <img src={logo} />
      <div className="flexgrow" />
      <div className="center  my-auto">
        <p>UNIVERSITY INSTITUTE OF ENGINEERING AND TECHNOLOGY</p>
        <p>PANJAB UNIVERSITY, CHANDIGARH</p>
      </div>
      <div className="flexgrow" />
    </div>
  );
}

export default Header;
