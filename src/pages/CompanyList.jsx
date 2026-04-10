import React, { useState, useEffect } from "react";
import BackLink from "../components/BackLink";
import SearchField from "../components/SearchField";
import Filter from "../components/Filter";
import "./CompanyList.css";
import defaultCompanyImage from "../assets/images/Company-List-icon.svg";
import snake43 from "../assets/images/snake43.png";
import curl40 from "../assets/images/curl40.png";

const COMPANY_FILTER_OPTIONS = [
  { value: "digital-designers", label: "Digital designers" },
  { value: "webbutvecklare", label: "Webbutvecklare" },
  { value: "a-z", label: "A-Z" },
  { value: "z-a", label: "Z-A" },
];

const COMPANY_CATEGORY_FILTERS = ["digital-designers", "webbutvecklare"];
const COMPANY_SORT_FILTERS = ["a-z", "z-a"];

export default function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function capitalizeNameWords(value = "") {
    const trimmed = value.trim();
    if (!trimmed) return "";

    return trimmed
      .toLowerCase()
      .split(/\s+/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  function formatEmployment(value = "") {
    return capitalizeNameWords(value);
  }

  function toggleCompanyFilter(filterValue) {
    setActiveFilters((currentFilters) => {
      const hasFilter = currentFilters.includes(filterValue);
      const isCategoryFilter = COMPANY_CATEGORY_FILTERS.includes(filterValue);
      const isSortFilter = COMPANY_SORT_FILTERS.includes(filterValue);

      if (isCategoryFilter) {
        const withoutCategoryFilters = currentFilters.filter(
          (value) => !COMPANY_CATEGORY_FILTERS.includes(value),
        );

        if (hasFilter) {
          return withoutCategoryFilters;
        }

        return [...withoutCategoryFilters, filterValue];
      }

      if (isSortFilter) {
        const withoutSortFilters = currentFilters.filter(
          (value) => !COMPANY_SORT_FILTERS.includes(value),
        );

        if (hasFilter) {
          return withoutSortFilters;
        }

        return [...withoutSortFilters, filterValue];
      }

      if (hasFilter) {
        return currentFilters.filter((value) => value !== filterValue);
      }

      return [...currentFilters, filterValue];
    });
  }

  function matchesCompanyFilter(company, filters) {
    if (!filters.length) return true;

    const employmentTypes = company.employment || [];
    const normalizedEmployment = employmentTypes.map((employment) =>
      (employment || "").toLowerCase(),
    );

    const categoryFilters = filters.filter(
      (filterValue) =>
        filterValue === "digital-designers" || filterValue === "webbutvecklare",
    );

    if (!categoryFilters.length) return true;

    return categoryFilters.some((filterValue) => {
      if (filterValue === "digital-designers") {
        return normalizedEmployment.some((employment) =>
          employment.includes("digital design"),
        );
      }

      if (filterValue === "webbutvecklare") {
        return normalizedEmployment.some((employment) =>
          employment.includes("webbutvecklare"),
        );
      }

      return false;
    });
  }

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch("/api/companies");
        if (!response.ok) throw new Error("Kunde inte hämta företag");
        const data = await response.json();
        setCompanies(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const normalizedSearch = searchTerm.trim().toLowerCase();
  const filteredCompanies = [...companies]
    .filter((company) => {
      const name = (company.name || "").toLowerCase();
      const employment = (company.employment || []).join(" ").toLowerCase();

      return (
        (normalizedSearch === "" ||
          name.includes(normalizedSearch) ||
          employment.includes(normalizedSearch)) &&
        matchesCompanyFilter(company, activeFilters)
      );
    })
    .sort((a, b) => {
      if (activeFilters.includes("a-z")) {
        return (a.name || "").localeCompare(b.name || "", "sv", {
          sensitivity: "base",
        });
      }

      if (activeFilters.includes("z-a")) {
        return (b.name || "").localeCompare(a.name || "", "sv", {
          sensitivity: "base",
        });
      }

      return 0;
    });

  if (loading)
    return (
      <main className="company-list-page">
        <p>Laddar företag...</p>
      </main>
    );
  if (error)
    return (
      <main className="company-list-page">
        <p>Fel: {error}</p>
      </main>
    );

  return (
    <main className="company-list-page">
      <BackLink to="/" />

      <div className="company-list-header">
        <h1>Lista på företag</h1>
        <SearchField
          placeholder="Sök företagsnamn"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          ariaLabel="Sök företag"
        />
      </div>

      <div className="company-list-filter-row">
        <Filter
          selectedValues={activeFilters}
          onToggle={toggleCompanyFilter}
          onClear={() => setActiveFilters([])}
          options={COMPANY_FILTER_OPTIONS}
          ariaLabel="Öppna filter för företag"
        />
      </div>

      <img src={snake43} alt="" className="company-list-snake" />

      <div className="company-grid">
        {filteredCompanies.map((company) => {
          const displayName = capitalizeNameWords(company.name || "");
          const employmentTypes = company.employment || [];

          return (
            <div key={company._id} className="company-card">
              <div className="company-card-blob" />
              <div className="company-card-content">
                <div className="company-card-text">
                  <h3 className="company-name">{displayName}</h3>
                  {!!employmentTypes.length && (
                    <div className="company-employment-list">
                      {employmentTypes.map((employment, index) => (
                        <span key={index} className="company-employment-chip">
                          {formatEmployment(employment)}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="company-image-wrap">
                <img
                  className="company-image"
                  src={defaultCompanyImage}
                  alt="Företagsikon"
                />
              </div>
            </div>
          );
        })}
        {filteredCompanies.length === 0 && (
          <p>Inga företag matchar din sökning.</p>
        )}
      </div>

      <img src={curl40} alt="" className="company-list-curl-left" />
    </main>
  );
}
