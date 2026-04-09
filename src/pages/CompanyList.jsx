import React, { useState, useEffect } from "react";
import BackLink from "../components/BackLink";
import SearchField from "../components/SearchField";
import "./CompanyList.css";
import defaultCompanyImage from "../assets/images/Company-List-icon.png";
import snake43 from "../assets/images/snake43.png";
import curl40 from "../assets/images/curl40.png";

export default function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
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
  const filteredCompanies = companies.filter((company) => {
    const name = (company.name || "").toLowerCase();
    const employment = (company.employment || []).join(" ").toLowerCase();

    return (
      normalizedSearch === "" ||
      name.includes(normalizedSearch) ||
      employment.includes(normalizedSearch)
    );
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
        <h1>Företagslista</h1>
        <SearchField
          placeholder="Sök företagsnamn"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          ariaLabel="Sök företag"
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
