import React from "react";
import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge.jsx";
import Button from "./Button.jsx";
import { STATUS } from "../data/donations.js";

export default function DonationCard({ donation, onAccept }) {
  const { id, restaurant, food, meals, distanceKm, availableUntil, status } =
    donation;

  return (
    <div className="card card-hover donation-card">
      <div className="donation-top">
        <div>
          <div className="donation-restaurant">🍛 {restaurant}</div>
          <div className="donation-food">{food}</div>
        </div>
        <StatusBadge status={status} />
      </div>

      <div className="donation-meta">
        <span>🍱 {meals} meals</span>
        <span>📍 {distanceKm} km away</span>
        <span>⏰ Until {availableUntil}</span>
      </div>

      <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
        <Button as={Link} to={`/donation/${id}`} variant="outline" size="sm">
          View Details
        </Button>
        {status === STATUS.AVAILABLE && onAccept && (
          <Button size="sm" onClick={() => onAccept(id)}>
            Accept Pickup
          </Button>
        )}
      </div>
    </div>
  );
}
