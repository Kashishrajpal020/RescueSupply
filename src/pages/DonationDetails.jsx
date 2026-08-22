import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Button from "../components/Button.jsx";
import StatusBadge from "../components/StatusBadge.jsx";
import { useDonations } from "../context/DonationsContext.jsx";
import { STATUS } from "../data/donations.js";

export default function DonationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { donations, acceptDonation } = useDonations();

  const donation = donations.find((d) => d.id === Number(id));

  if (!donation) {
    return (
      <div className="container empty-state">
        Donation not found. <Link to="/available-food">Back to Available Food</Link>
      </div>
    );
  }

  const rows = [
    ["Restaurant Name", donation.restaurant],
    ["Food Type", donation.food],
    ["Food Description", donation.description || "—"],
    ["Number of Meals", donation.meals],
    ["Pickup Location", donation.address],
    ["Distance", `${donation.distanceKm} km away`],
    ["Available Until", donation.availableUntil],
    ["Food Condition", donation.condition || "—"],
  ];

  return (
    <div className="container">
      <div className="page-header">
        <Link to="/available-food" style={{ color: "var(--text-muted)", fontSize: 14 }}>
          ← Back to Available Food
        </Link>
      </div>

      <div className="card fade-up" style={{ maxWidth: 640, padding: 32, marginTop: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h2 style={{ fontSize: 24 }}>{donation.food}</h2>
            <p style={{ color: "var(--text-muted)", marginTop: 4 }}>{donation.restaurant}</p>
          </div>
          <StatusBadge status={donation.status} />
        </div>

        <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 14 }}>
          {rows.map(([label, value]) => (
            <div key={label} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border)", paddingBottom: 10 }}>
              <span style={{ color: "var(--text-muted)", fontSize: 13.5 }}>{label}</span>
              <span style={{ fontWeight: 600, fontSize: 14, textAlign: "right", maxWidth: "60%" }}>{value}</span>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
          {donation.status === STATUS.AVAILABLE && (
            <Button
              onClick={() => {
                acceptDonation(donation.id);
                navigate("/my-rescues");
              }}
            >
              Accept Donation
            </Button>
          )}
          <Button as={Link} to="/map" variant="outline">
            View on Map
          </Button>
        </div>
      </div>
    </div>
  );
}