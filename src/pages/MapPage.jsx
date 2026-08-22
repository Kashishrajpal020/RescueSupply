import React, { useState } from "react";
import MapView from "../components/MapView.jsx";
import { useDonations } from "../context/DonationsContext.jsx";
import { STATUS } from "../data/donations.js";

const FILTERS = ["All", STATUS.AVAILABLE, STATUS.PENDING, STATUS.PICKED_UP, STATUS.RESCUED];

export default function MapPage() {
  const { donations } = useDonations();
  const [filter, setFilter] = useState("All");

  const filtered =
    filter === "All" ? donations : donations.filter((d) => d.status === filter);

  return (
    <div className="container">
      <div className="page-header">
        <span className="eyebrow">Live rescue map</span>
        <h1 className="section-heading" style={{ marginTop: 14 }}>
          Every active donation, in real time.
        </h1>
        <p className="section-sub">
          Click any marker to see donation details, distance and pickup window.
        </p>
      </div>

      <div className="filter-bar">
        {FILTERS.map((f) => (
          <button
            key={f}
            className={`filter-chip ${filter === f ? "active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <MapView donations={filtered} height={540} />
    </div>
  );
}
