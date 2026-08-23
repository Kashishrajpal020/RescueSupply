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
    <div className="home-page">
      <Hero />

      <section className="section-tight home-impact-band">
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

      <section className="section home-process" id="how-it-works">
        <div className="container">
          <span className="eyebrow">How it works</span>
          <h2 className="section-heading home-section-heading">
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

      <section className="section home-map-section">
        <div className="container">
          <div className="two-col">
            <div>
              <span className="eyebrow">Live rescue map</span>
              <h2 className="section-heading home-section-heading">
                Every donation is location-aware.
              </h2>
              <p className="section-sub">
                As soon as a restaurant posts surplus food, it appears on the
                map for nearby NGOs and volunteers to discover and rescue.
              </p>
              <div className="home-map-action">
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
    <svg className="route-svg" viewBox="0 0 480 420" fill="none" aria-hidden="true">
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
    <section className="section home-community">
      <div className="container">
        <span className="eyebrow home-community-eyebrow">
          Community impact
        </span>
        <h2 className="section-heading home-community-heading">
          Together, our community is turning surplus into support.
        </h2>

        <div className="two-col home-community-grid">
          <FlowDiagram />
          <div>
            <h3 className="home-leaderboard-heading">
              Top contributors this month
            </h3>
            <div className="leaderboard">
              {leaderboard.map((r, i) => (
                <RestaurantCard key={r.name} name={r.name} meals={r.meals} rank={i} />
              ))}
            </div>
            <p className="home-community-note">
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
    <div className="home-flow">
      {rows.map((r, i) => (
        <React.Fragment key={r.label}>
          <div className="home-flow-row">
            <span className="home-flow-icon">{r.icon}</span>
            <span className="home-flow-label">{r.label}</span>
          </div>
          {i < rows.length - 1 && (
            <div className="home-flow-arrow" aria-hidden="true">↓</div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}