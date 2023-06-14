import React from "react";
import "./Card.css";
import Logo from "../../assets/forspace_logo.1120.svg";

export default function Card(props) {
  return (
    <div className="card-view">
      <img src={Logo} className="logo" alt=""></img>
      {props.children}
    </div>
  );
}
