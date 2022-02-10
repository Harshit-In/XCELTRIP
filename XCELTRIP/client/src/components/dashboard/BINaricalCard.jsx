import React from "react";
import "./card.css";
import { Link } from "react-router-dom";
export default function BINaricalCard(props) {
  return (
    <div className="col-md-3 col-6">
      <div
        className={`plan_box_top ${props.is_active ? "pactive" : "inactive"}`}
      >
        <Link to={props.is_active ? "/dashboard" : "/dashboard"}>
          <p>{props.index}</p>
          <h2>{props.matrix_price}</h2>
        </Link>
      </div>
      <div className="plan_box_container pl-0">
        <div className="line d-flex justify-content-center align-items-center p-0">
          <a href="#">
            <span className="line1"></span>
            <span className={`c1 ${props.slot_ids[0] ? " or " : ""}`}>
              {props.slot_ids[0] ? (
                <span className="mytooltip">ID:{props.slot_ids[0]}</span>
              ) : null}
            </span>
          </a>
          <a href="#">
            <span className="line5"></span>
            <span className={`c5 ${props.slot_ids[1] ? " or " : ""}`}>
              {props.slot_ids[1] ? (
                <span className="mytooltip">ID:{props.slot_ids[1]}</span>
              ) : null}
            </span>
          </a>
        </div>
        <div className="x2plan_content pl-1">
          <div className="plan_b_left">
            <span>
              <img src="/images/people.svg" /> {props.total_slot_member}
            </span>
          </div>
          <div className="plan_b_right">
            <span>
              {props.total_slot_reinvest} <img src="/images/reinvest.svg" />
            </span>
          </div>
          <div className="clearfix"></div>
        </div>
      </div>
    </div>
  );
}
