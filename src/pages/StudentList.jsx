import React, { useState, useEffect } from "react";
import BackLink from "../components/BackLink";
import SearchField from "../components/SearchField";
import Filter from "../components/Filter";
import "./StudentList.css";
import snake43 from "../assets/images/snake43.png";
import curl40 from "../assets/images/curl40.png";
import studentHat from "../assets/images/studenthat.jpg";

const STUDENT_FILTER_OPTIONS = [
  { value: "digital-designers", label: "Digital designers" },
  { value: "webbutvecklare", label: "Webbutvecklare" },
  { value: "a-z", label: "A-Z" },
  { value: "z-a", label: "Z-A" },
];

const STUDENT_CATEGORY_FILTERS = ["digital-designers", "webbutvecklare"];
const STUDENT_SORT_FILTERS = ["a-z", "z-a"];

const DEFAULT_STUDENT_IMAGE_KEY = "studenthat.jpg";

export default function StudentList() {
  const [students, setStudents] = useState([]);
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

  function getDomainName(url) {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname.replace("www.", "");
    } catch {
      return url;
    }
  }

  function resolveStudentImage(profileImage) {
    if (!profileImage || profileImage === DEFAULT_STUDENT_IMAGE_KEY) {
      return studentHat;
    }

    return profileImage;
  }

  function toggleStudentFilter(filterValue) {
    setActiveFilters((currentFilters) => {
      const hasFilter = currentFilters.includes(filterValue);
      const isCategoryFilter = STUDENT_CATEGORY_FILTERS.includes(filterValue);
      const isSortFilter = STUDENT_SORT_FILTERS.includes(filterValue);

      if (isCategoryFilter) {
        const withoutCategoryFilters = currentFilters.filter(
          (value) => !STUDENT_CATEGORY_FILTERS.includes(value),
        );

        if (hasFilter) {
          return withoutCategoryFilters;
        }

        return [...withoutCategoryFilters, filterValue];
      }

      if (isSortFilter) {
        const withoutSortFilters = currentFilters.filter(
          (value) => !STUDENT_SORT_FILTERS.includes(value),
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
    const fetchStudents = async () => {
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
        const response = await fetch(`/api/students?${params.toString()}`);
        if (!response.ok) throw new Error("Kunde inte hämta studenter");
        const data = await response.json();
        setStudents(data.data || []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [page, searchTerm, activeFilters]);
  const showInitialLoading = loading && students.length === 0;

  if (showInitialLoading)
    return (
      <main className="student-list-page">
        <p>Laddar studenter...</p>
      </main>
    );
  if (error)
    return (
      <main className="student-list-page">
        <p>Fel: {error}</p>
      </main>
    );

  return (
    <main className="student-list-page">
      <BackLink to="/foretag" />

      <div className="student-list-header">
        <h1>Lista på kandidater</h1>
        <SearchField
          placeholder="Sök namn eller utbildning"
          value={searchTerm}
          onChange={(event) => {
            setSearchTerm(event.target.value);
            setPage(1);
          }}
          ariaLabel="Sök kandidater"
        />
      </div>

      <div className="student-list-filter-row">
        <Filter
          selectedValues={activeFilters}
          onToggle={toggleStudentFilter}
          onClear={() => {
            setActiveFilters([]);
            setPage(1);
          }}
          options={STUDENT_FILTER_OPTIONS}
          ariaLabel="Öppna filter för kandidater"
        />
      </div>

      <img src={snake43} alt="" className="student-list-snake" />

      <div className="student-grid">
        {students.map((student) => {
          const displayName = capitalizeNameWords(student.name || "");

          return (
            <div key={student._id} className="student-card">
              <div className="student-card-blob" />
              <div className="student-card-content">
                <div className="student-card-text">
                  <h3 className="student-name">{displayName}</h3>
                  {student.education && (
                    <p className="student-education">{student.education}</p>
                  )}

                  {!!student.links?.length && (
                    <div className="student-links">
                      {student.links.map((link, index) => (
                        <a
                          key={index}
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {getDomainName(link)}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="student-image-wrap">
                <img
                  className="student-image"
                  src={resolveStudentImage(student.profileImage)}
                  alt={displayName}
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = studentHat;
                  }}
                />
              </div>
            </div>
          );
        })}
        {students.length === 0 && <p>Inga kandidater matchar din sökning.</p>}
      </div>

      <div
        className="list-pagination"
        aria-label="Sidnavigering för kandidater"
      >
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

      <img src={curl40} alt="" className="student-list-curl-left" />
    </main>
  );
}
