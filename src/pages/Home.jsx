import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button.jsx";
import ImpactCard from "../components/ImpactCard.jsx";
import MapView from "../components/MapView.jsx";
import RestaurantCard from "../components/RestaurantCard.jsx";
import { useDonations } from "../context/DonationsContext.jsx";
import { impactStats, leaderboard } from "../data/donations.js";

const STEPS = [
  { num: "01", icon: "🍱", title: "Restaurant", text: "Restaurant posts surplus food that's still safe to eat." },
  { num: "02", icon: "📍", title: "Location", text: "The donation becomes visible on the live rescue map." },
  { num: "03", icon: "🚚", title: "Rescue", text: "A nearby NGO or volunteer accepts it and arranges pickup." },
  { num: "04", icon: "❤️", title: "Community", text: "The food reaches people who need it most." },
];

export default function Home() {
  const { donations } = useDonations();
  const mapPreview = donations.slice(0, 5);

  return (
    <div>
      <Hero />

      <section className="section-tight">
        <div className="container">
          <div className="stat-grid">
            <ImpactCard icon="🍱" value={impactStats.mealsRescued} suffix="+" label="Meals Rescued" />
            <ImpactCard icon="🏬" value={impactStats.restaurants} label="Restaurants Connected" />
            <ImpactCard icon="🤝" value={impactStats.ngos} label="NGOs" />
            <ImpactCard icon="♻️" value={impactStats.foodSavedTons} suffix=" Tons" label="Food Saved" />
          </div>
          <p className="demo-note">Sample statistics shown for this prototype.</p>
        </div>
      </section>

      <section className="section" id="how-it-works">
        <div className="container">
          <span className="eyebrow">How it works</span>
          <h2 className="section-heading" style={{ marginTop: 14 }}>
            From surplus plate to shared meal, in four steps.
          </h2>

          <div className="steps-rail">
            {STEPS.map((s) => (
              <div className="step-item" key={s.num}>
                <div className="step-num">{s.icon}</div>
                <div className="step-title">Step {s.num} — {s.title}</div>
                <div className="step-text">{s.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="two-col">
            <div>
              <span className="eyebrow">Live rescue map</span>
              <h2 className="section-heading" style={{ marginTop: 14 }}>
                Every donation is location-aware.
              </h2>
              <p className="section-sub">
                As soon as a restaurant posts surplus food, it appears on the
                map for nearby NGOs and volunteers to discover and rescue.
              </p>
              <div style={{ marginTop: 24 }}>
                <Button as={Link} to="/map">Open Live Map</Button>
              </div>
            </div>
            <MapView donations={mapPreview} height={380} />
          </div>
        </div>
      </section>

      <CommunityImpact />
    </div>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div>
          <h1 className="hero-title">
            Good Food Should <span className="accent">Never Go to Waste.</span>
          </h1>
          <p className="hero-sub">
            RescueSupply connects restaurants with NGOs and communities to
            rescue surplus food and turn it into meals for people who need them.
          </p>
          <div className="hero-actions">
            <Button as={Link} to="/donate">Donate Surplus Food</Button>
            <Button as={Link} to="/available-food" variant="outline">
              Explore Nearby Food
            </Button>
          </div>
        </div>

        <div className="hero-visual">
          <HeroRoute />
          <div className="floating-card fc-top">
            <div className="fc-icon">🍱</div>
            <div>
              <div className="fc-title">40 Meals Rescued</div>
              <div className="fc-sub">Today</div>
            </div>
          </div>
          <div className="floating-card fc-bottom">
            <div className="fc-icon">📍</div>
            <div>
              <div className="fc-title">1.8 km Away</div>
              <div className="fc-sub">Available for Pickup</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Simple decorative SVG illustrating Restaurant -> Rescue -> Community.
function HeroRoute() {
  return (
    <svg className="route-svg" viewBox="0 0 480 420" fill="none">
      <path
        d="M60 340 C 140 260, 160 160, 240 120 S 380 100, 420 60"
        stroke="#2fa870"
        strokeOpacity="0.55"
        strokeWidth="3"
        strokeDasharray="2 10"
        strokeLinecap="round"
      />
      <circle cx="60" cy="340" r="26" fill="#ddf3e3" />
      <text x="60" y="348" fontSize="22" textAnchor="middle">🍱</text>

      <circle cx="240" cy="120" r="26" fill="#ddf3e3" />
      <text x="240" y="128" fontSize="22" textAnchor="middle">📍</text>

      <circle cx="420" cy="60" r="26" fill="#ff9f43" />
      <text x="420" y="68" fontSize="22" textAnchor="middle">❤️</text>
    </svg>
  );
}

function CommunityImpact() {
  return (
    <section className="section" style={{ background: "var(--forest)", color: "#fff" }}>
      <div className="container">
        <span className="eyebrow" style={{ background: "rgba(255,255,255,0.12)", color: "#cfe0d5" }}>
          Community impact
        </span>
        <h2 className="section-heading" style={{ color: "#fff", marginTop: 14, maxWidth: 560 }}>
          Together, our community is turning surplus into support.
        </h2>

        <div className="two-col" style={{ marginTop: 44, alignItems: "start" }}>
          <FlowDiagram />
          <div>
            <h3 style={{ color: "#fff", fontSize: 18, marginBottom: 16 }}>
              Top contributors this month
            </h3>
            <div className="leaderboard">
              {leaderboard.map((r, i) => (
                <RestaurantCard key={r.name} name={r.name} meals={r.meals} rank={i} />
              ))}
            </div>
            <p style={{ fontSize: 12.5, color: "#9db6a6", marginTop: 14 }}>
              Demo data shown for this prototype.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FlowDiagram() {
  const rows = [
    { icon: "🏬", label: "Restaurants" },
    { icon: "🍱", label: "Food Rescued" },
    { icon: "🤝", label: "NGOs & Volunteers" },
    { icon: "👨‍👩‍👧", label: "People Served" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {rows.map((r, i) => (
        <React.Fragment key={r.label}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              background: "rgba(255,255,255,0.06)",
              borderRadius: 14,
              padding: "16px 20px",
            }}
          >
            <span style={{ fontSize: 22 }}>{r.icon}</span>
            <span style={{ fontWeight: 700 }}>{r.label}</span>
          </div>
          {i < rows.length - 1 && (
            <div style={{ textAlign: "center", color: "#5f8271", fontSize: 18 }}>↓</div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}