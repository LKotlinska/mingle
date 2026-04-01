import { Link } from "react-router-dom";

export default function BackLink({ to = "/" }) {
  return (
    <Link
      to={to}
      style={{
        fontSize: "36px",
        fontWeight: "bold",
        color: "var(--yrgo-blue)",
        marginLeft: "15px",
        alignSelf: "flex-start",
      }}
    >
      ←{" "}
    </Link>
  );
}
