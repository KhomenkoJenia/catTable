import React from "react";
import "./switcher.css";

export default function Switcher({ onClickHandle }) {
  return (
    <button onClick={onClickHandle} className="btn">
      <div className="wrapper">
        <p className="text">Змінити тему </p>

        <div className="flower flower1">
          <div className="petal one"></div>
          <div className="petal two"></div>
          <div className="petal three"></div>
          <div className="petal four"></div>
        </div>
        <div className="flower flower2">
          <div className="petal one"></div>
          <div className="petal two"></div>
          <div className="petal three"></div>
          <div className="petal four"></div>
        </div>
        <div className="flower flower3">
          <div className="petal one"></div>
          <div className="petal two"></div>
          <div className="petal three"></div>
          <div className="petal four"></div>
        </div>
        <div className="flower flower4">
          <div className="petal one"></div>
          <div className="petal two"></div>
          <div className="petal three"></div>
          <div className="petal four"></div>
        </div>
        <div className="flower flower5">
          <div className="petal one"></div>
          <div className="petal two"></div>
          <div className="petal three"></div>
          <div className="petal four"></div>
        </div>
        <div className="flower flower6">
          <div className="petal one"></div>
          <div className="petal two"></div>
          <div className="petal three"></div>
          <div className="petal four"></div>
        </div>
      </div>
    </button>
  );
}
