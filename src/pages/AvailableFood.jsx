import React, { useMemo, useState } from "react";
import DonationCard from "../components/DonationCard.jsx";
import { useDonations } from "../context/DonationsContext.jsx";
import { FOOD_CATEGORIES, STATUS } from "../data/donations.js";

const STATUS_FILTERS = ["All", STATUS.AVAILABLE, STATUS.PENDING, STATUS.PICKED_UP, STATUS.RESCUED];
const SORTS = ["Nearest first", "Most meals first"];

export default function AvailableFood() {
  const { donations, acceptDonation } = useDonations();
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [sort, setSort] = useState(SORTS[0]);

  const filtered = useMemo(() => {
    let list = donations.filter((d) => {
      const matchesCategory = category === "All" || d.category === category;
      const matchesStatus = status === "All" || d.status === status;
      return matchesCategory && matchesStatus;
    });

    list = [...list].sort((a, b) =>
      sort === "Nearest first" ? a.distanceKm - b.distanceKm : b.meals - a.meals
    );

    return list;
  }, [donations, category, status, sort]);

  return (
    <div className="container">
      <div className="page-header">
        <span className="eyebrow">For NGOs & volunteers</span>
        <h1 className="section-heading" style={{ marginTop: 14 }}>
          Available food near you
        </h1>
        <p className="section-sub">
          Browse live donations and accept a pickup in one tap.
        </p>
      </div>

      <div className="filter-bar" style={{ justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {FOOD_CATEGORIES.map((c) => (
            <button
              key={c}
              className={`filter-chip ${category === c ? "active" : ""}`}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <select className="filter-select" value={status} onChange={(e) => setStatus(e.target.value)}>
            {STATUS_FILTERS.map((s) => (
              <option key={s} value={s}>{s === "All" ? "All Statuses" : s}</option>
            ))}
          </select>
          <select className="filter-select" value={sort} onChange={(e) => setSort(e.target.value)}>
            {SORTS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">No donations match these filters right now.</div>
      ) : (
        <div className="card-grid">
          {filtered.map((d) => (
            <DonationCard key={d.id} donation={d} onAccept={acceptDonation} />
          ))}
        </div>
      )}
    </div>
  );
}