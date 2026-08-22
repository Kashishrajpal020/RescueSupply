import React from "react";
import { useDonations } from "../context/DonationsContext.jsx";

const ROLES = ["Restaurant", "NGO", "Volunteer"];

const ROLE_DATA = {
  Restaurant: {
    name: "Green Leaf Restaurant",
    avatar: "🏬",
    stats: [
      { label: "Total Donations", value: 12 },
      { label: "Meals Rescued", value: 480 },
      { label: "Active Donations", value: 2 },
    ],
  },
  NGO: {
    name: "Helping Hands NGO",
    avatar: "🤝",
    stats: [
      { label: "Pickups Completed", value: 32 },
      { label: "People Served", value: 680 },
      { label: "Meals Received", value: 1240 },
    ],
  },
  Volunteer: {
    name: "Community Volunteer",
    avatar: "🚴",
    stats: [
      { label: "Pickups Completed", value: 9 },
      { label: "Distance Covered", value: "64 km" },
      { label: "Meals Delivered", value: 210 },
    ],
  },
};

export default function Profile() {
  const { role, setRole } = useDonations();
  const data = ROLE_DATA[role];

  return (
    <div className="container">
      <div className="page-header">
        <span className="eyebrow">Profile</span>
        <h1 className="section-heading" style={{ marginTop: 14 }}>
          Your RescueSupply profile
        </h1>
        <p className="section-sub">Demo functionality — no account or sign-in required.</p>
      </div>

      <div className="role-toggle" style={{ marginTop: 20 }}>
        {ROLES.map((r) => (
          <button
            key={r}
            className={role === r ? "active" : ""}
            onClick={() => setRole(r)}
          >
            {r}
          </button>
        ))}
      </div>

      <div className="profile-header">
        <div className="profile-avatar">{data.avatar}</div>
        <div>
          <h2 style={{ fontSize: 20 }}>{data.name}</h2>
          <p style={{ color: "var(--text-muted)", fontSize: 14 }}>{role} account · Demo profile</p>
        </div>
      </div>

      <div className="dash-grid" style={{ marginTop: 28 }}>
        {data.stats.map((s) => (
          <div className="card dash-card fade-up" key={s.label}>
            <div className="stat-number">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
