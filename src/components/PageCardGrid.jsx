import React from "react";
import { Link } from "react-router-dom";

export default function PageCardGrid({ items }) {
  return (
    <ul className="student-grid">
      {items.map((item) => (
        <li key={item.to} className="student-card">
          <Link className="student-card-link" to={item.to}>
            <img className="student-card-icon" src={item.icon} alt="" />
            <span>{item.label}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
