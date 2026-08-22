import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { useDonations } from "../context/DonationsContext.jsx";
import { weeklyMeals } from "../data/donations.js";
import { STATUS } from "../data/donations.js";

export default function Impact() {
  const { donations, rescuedTotal } = useDonations();

  const peopleServed = Math.round(rescuedTotal * 0.8); // demo ratio
  const pickups = donations.filter((d) => d.status !== STATUS.AVAILABLE).length;
  const wasteKg = Math.round(rescuedTotal * 0.3);

  const cards = [
    { icon: "🍱", value: rescuedTotal, label: "Meals Rescued" },
    { icon: "♻️", value: `${wasteKg} kg`, label: "Food Waste Prevented" },
    { icon: "❤️", value: peopleServed, label: "People Served" },
    { icon: "🚚", value: pickups, label: "Successful Pickups" },
  ];

  return (
    <div className="container">
      <div className="page-header">
        <span className="eyebrow">Impact dashboard</span>
        <h1 className="section-heading" style={{ marginTop: 14 }}>
          The difference RescueSupply is making
        </h1>
        <p className="section-sub">Updates live as donations move through the rescue flow.</p>
      </div>

      <div className="dash-grid">
        {cards.map((c) => (
          <div className="card dash-card fade-up" key={c.label}>
            <div className="dash-icon">{c.icon}</div>
            <div className="stat-number">{c.value}</div>
            <div className="stat-label">{c.label}</div>
          </div>
        ))}
      </div>

      <div className="card chart-card">
        <h3 style={{ fontSize: 16, marginBottom: 6 }}>Meals Rescued This Week</h3>
        <p style={{ color: "var(--text-muted)", fontSize: 13, marginBottom: 18 }}>
          Demo data for this prototype.
        </p>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={weeklyMeals} margin={{ left: -20, right: 10 }}>
            <defs>
              <linearGradient id="mealsFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1F8A5B" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#1F8A5B" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#e6e2d6" vertical={false} />
            <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#68756D" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "#68756D" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #e6e2d6" }} />
            <Area type="monotone" dataKey="meals" stroke="#1F8A5B" strokeWidth={2.5} fill="url(#mealsFill)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
