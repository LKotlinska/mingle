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
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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
    setPage(1);
  }

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({ page: String(page), limit: "10" });

      if (searchTerm.trim()) {
        params.set("search", searchTerm.trim());
      }

      const categoryFilter = activeFilters.find((filterValue) =>
        ["digital-designers", "webbutvecklare"].includes(filterValue),
      );

      if (categoryFilter) {
        params.set("category", categoryFilter);
      }

      const sortFilter = activeFilters.find((filterValue) =>
        ["a-z", "z-a"].includes(filterValue),
      );

      if (sortFilter) {
        params.set("sort", sortFilter);
      }

      try {
        const response = await fetch(`/api/companies?${params.toString()}`);
        if (!response.ok) throw new Error("Kunde inte hämta företag");
        const data = await response.json();
        setCompanies(data.data || []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, [page, searchTerm, activeFilters]);
  const showInitialLoading = loading && companies.length === 0;

  if (showInitialLoading)
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
          onChange={(event) => {
            setSearchTerm(event.target.value);
            setPage(1);
          }}
          ariaLabel="Sök företag"
        />
      </div>

      <div className="company-list-filter-row">
        <Filter
          selectedValues={activeFilters}
          onToggle={toggleCompanyFilter}
          onClear={() => {
            setActiveFilters([]);
            setPage(1);
          }}
          options={COMPANY_FILTER_OPTIONS}
          ariaLabel="Öppna filter för företag"
        />
      </div>

      <img src={snake43} alt="" className="company-list-snake" />

      <div className="company-grid">
        {companies.map((company) => {
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
        {companies.length === 0 && <p>Inga företag matchar din sökning.</p>}
      </div>

      <div className="list-pagination" aria-label="Sidnavigering för företag">
        <button
          type="button"
          className="pagination-button"
          onClick={() => setPage((currentPage) => Math.max(currentPage - 1, 1))}
          disabled={page === 1}
        >
          Föregående
        </button>
        <span className="pagination-status">
          Sida {page} av {totalPages}
        </span>
        <button
          type="button"
          className="pagination-button"
          onClick={() =>
            setPage((currentPage) => Math.min(currentPage + 1, totalPages))
          }
          disabled={page === totalPages}
        >
          Nästa
        </button>
      </div>

      <img src={curl40} alt="" className="company-list-curl-left" />
    </main>
  );
}
