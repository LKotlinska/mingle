import React, { useState, useEffect } from "react";
import BackLink from "../components/BackLink";
import "./StudentList.css";
import searchIcon from "../assets/images/search.png";
import snake43 from "../assets/images/snake43.png";
import curl40 from "../assets/images/curl40.png";

export default function StudentList() {
  const [students, setStudents] = useState([]);
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

  function getDomainName(url) {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname.replace("www.", "");
    } catch {
      return url;
    }
  }

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("/api/students");
        if (!response.ok) throw new Error("Kunde inte hämta studenter");
        const data = await response.json();
        setStudents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const normalizedSearch = searchTerm.trim().toLowerCase();
  const filteredStudents = students.filter((student) => {
    const name = (student.name || "").toLowerCase();
    const education = (student.education || "").toLowerCase();

    return (
      normalizedSearch === "" ||
      name.includes(normalizedSearch) ||
      education.includes(normalizedSearch)
    );
  });

  if (loading)
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
        <div className="student-search-wrap">
          <input
            className="student-search"
            type="search"
            placeholder="Sök namn eller utbildning"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            aria-label="Sök kandidater"
          />
          <img src={searchIcon} alt="" className="student-search-icon" />
        </div>
      </div>

      <img src={snake43} alt="" className="student-list-snake" />

      <div className="student-grid">
        {filteredStudents.map((student) => {
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
                  src={student.profileImage}
                  alt={displayName}
                />
              </div>
            </div>
          );
        })}
        {filteredStudents.length === 0 && (
          <p>Inga kandidater matchar din sökning.</p>
        )}
      </div>

      <img src={curl40} alt="" className="student-list-curl-left" />
    </main>
  );
}
