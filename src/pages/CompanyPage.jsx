import React from 'react'
import { Link } from 'react-router-dom'

export default function CompanyPage() {
  return (
    <div>
      <h1>Company-sida</h1>
      <p>Välkommen, företag!</p>
      <Link to="/">Tillbaka</Link>
    </div>
  )
}
