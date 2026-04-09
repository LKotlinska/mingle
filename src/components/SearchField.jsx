import React from "react";
import "./SearchField.css";
import searchIcon from "../assets/images/search.png";

export default function SearchField({
  value,
  onChange,
  placeholder,
  ariaLabel,
}) {
  return (
    <div className="search-field">
      <input
        className="search-field-input"
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-label={ariaLabel}
      />
      <img src={searchIcon} alt="" className="search-field-icon" />
    </div>
  );
}
