import React from "react";
import filterIcon from "../assets/images/filter-icon.png";
import "./Filter.css";

export default function Filter({
  selectedValues = [],
  onToggle,
  onClear,
  options = [],
  ariaLabel = "Öppna filtermeny",
}) {
  function closeMenu(event) {
    const details = event.currentTarget.closest("details");
    if (details) {
      details.removeAttribute("open");
    }
  }

  function handleToggle(nextValue, event) {
    onToggle(nextValue);
    closeMenu(event);
  }

  function handleClear(event) {
    onClear();
    closeMenu(event);
  }

  return (
    <div className="filterDropdownWrap">
      <details className="filterDropdown">
        <summary className="filterTrigger" aria-label={ariaLabel}>
          <img
            className="filterTriggerIcon"
            src={filterIcon}
            alt=""
            aria-hidden="true"
          />
        </summary>

        <div className="filterMenu">
          <div className="filterMenuHeader">
            <span className="filterMenuTitle">Filtrera</span>
            <button
              className="filterClearButton"
              type="button"
              onClick={handleClear}
            >
              Rensa alla val
            </button>
          </div>

          <div className="filterMenuList">
            {options.map((option) => (
              <button
                key={option.value}
                className={`filterMenuItem ${
                  selectedValues.includes(option.value) ? "is-active" : ""
                }`}
                type="button"
                onClick={(event) => handleToggle(option.value, event)}
                aria-pressed={selectedValues.includes(option.value)}
              >
                <span className="filterMenuBox" aria-hidden="true" />
                <span className="filterMenuLabel">{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      </details>
    </div>
  );
}
