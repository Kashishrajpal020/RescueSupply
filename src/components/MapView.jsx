import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from "@react-google-maps/api";
import { STATUS } from "../data/donations.js";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const STATUS_META = {
  [STATUS.AVAILABLE]: { emoji: "🟢", markerClass: "marker-available", hex: "#1F8A5B", label: "Available" },
  [STATUS.PENDING]: { emoji: "🟡", markerClass: "marker-pending", hex: "#FF9F43", label: "Pickup Pending" },
  [STATUS.PICKED_UP]: { emoji: "🔵", markerClass: "marker-picked", hex: "#2F7FD6", label: "Picked Up" },
  [STATUS.RESCUED]: { emoji: "❤️", markerClass: "marker-rescued", hex: "#E0577C", label: "Rescued" },
};

/**
 * MapView is the single component every page uses to show donations on a map.
 *
 * - If VITE_GOOGLE_MAPS_API_KEY is set in .env, it renders a real Google Map
 *   using @react-google-maps/api.
 * - If no key is configured, it automatically falls back to a hand-styled
 *   custom map so the app still looks and works great out of the box.
 *
 * Either way, the donation data (statuses, popups, "View Donation" link)
 * behaves identically — only the background map technology changes.
 */
export default function MapView({ donations, height = 460 }) {
  if (GOOGLE_MAPS_API_KEY) {
    return <RealGoogleMap donations={donations} height={height} />;
  }
  return <FallbackMap donations={donations} height={height} />;
}

/* ---------------- Real Google Maps implementation ---------------- */

function RealGoogleMap({ donations, height }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });
  const [active, setActive] = useState(null);

  const center = useMemo(() => {
    if (!donations.length) return { lat: 30.35, lng: 76.82 };
    const lat = donations.reduce((sum, d) => sum + d.latitude, 0) / donations.length;
    const lng = donations.reduce((sum, d) => sum + d.longitude, 0) / donations.length;
    return { lat, lng };
  }, [donations]);

  if (!isLoaded) {
    return (
      <div className="map-frame" style={{ height }}>
        <div className="empty-state">Loading Google Map…</div>
      </div>
    );
  }

  return (
    <div className="map-frame" style={{ height }}>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={center}
        zoom={12}
        options={{ streetViewControl: false, mapTypeControl: false }}
      >
        {donations.map((d) => (
          <Marker
            key={d.id}
            position={{ lat: d.latitude, lng: d.longitude }}
            onClick={() => setActive(d)}
          />
        ))}

        {active && (
          <InfoWindow
            position={{ lat: active.latitude, lng: active.longitude }}
            onCloseClick={() => setActive(null)}
          >
            <PopupContent donation={active} />
          </InfoWindow>
        )}
      </GoogleMap>
      <Legend />
    </div>
  );
}

/* ---------------- Fallback custom map (default, no API key needed) ---------------- */

function FallbackMap({ donations, height }) {
  const [activeId, setActiveId] = useState(null);

  // Normalize lat/long into 0-100% positions so pins spread nicely
  // across the card regardless of the real-world coordinate range.
  const bounds = useMemo(() => {
    const lats = donations.map((d) => d.latitude);
    const lngs = donations.map((d) => d.longitude);
    return {
      minLat: Math.min(...lats),
      maxLat: Math.max(...lats),
      minLng: Math.min(...lngs),
      maxLng: Math.max(...lngs),
    };
  }, [donations]);

  function toPosition(d) {
    const latRange = bounds.maxLat - bounds.minLat || 1;
    const lngRange = bounds.maxLng - bounds.minLng || 1;
    const top = 12 + (1 - (d.latitude - bounds.minLat) / latRange) * 76;
    const left = 10 + ((d.longitude - bounds.minLng) / lngRange) * 80;
    return { top: `${top}%`, left: `${left}%` };
  }

  const active = donations.find((d) => d.id === activeId);

  return (
    <div className="map-frame" style={{ height }}>
      <div className="fallback-map" onClick={() => setActiveId(null)}>
        <RoadBackground />

        {donations.map((d) => {
          const pos = toPosition(d);
          const meta = STATUS_META[d.status];
          return (
            <div
              key={d.id}
              className="map-marker"
              style={pos}
              onClick={(e) => {
                e.stopPropagation();
                setActiveId(d.id === activeId ? null : d.id);
              }}
            >
              <div className={`marker-pin ${meta.markerClass}`}>
                <span>{meta.emoji}</span>
              </div>
            </div>
          );
        })}

        {active && (
          <div
            className="map-popup"
            style={toPosition(active)}
            onClick={(e) => e.stopPropagation()}
          >
            <PopupContent donation={active} />
          </div>
        )}
      </div>
      <Legend />
      <div className="map-config-note">
        This is a custom fallback map — no Google Maps API key detected. Add{" "}
        <code>VITE_GOOGLE_MAPS_API_KEY</code> to a <code>.env</code> file to
        switch to a real Google Map automatically.
      </div>
    </div>
  );
}

function PopupContent({ donation }) {
  const meta = STATUS_META[donation.status];
  return (
    <div>
      <div className="map-popup-title">{donation.restaurant}</div>
      <div className="map-popup-food">
        🍛 {donation.food} · {donation.meals} meals
      </div>
      <div className="map-popup-meta">
        <span>📍 {donation.distanceKm} km away</span>
        <span>⏰ Available until {donation.availableUntil}</span>
        <span>{meta.emoji} {meta.label}</span>
      </div>
      <Link to={`/donation/${donation.id}`}>
        <button className="btn btn-primary btn-sm" style={{ marginTop: 10, width: "100%" }}>
          View Donation
        </button>
      </Link>
    </div>
  );
}

function Legend() {
  return (
    <div className="map-legend" style={{ padding: "0 20px 18px" }}>
      {Object.values(STATUS_META).map((m) => (
        <span key={m.label}>
          <span className="legend-dot" style={{ background: m.hex }} />
          {m.label}
        </span>
      ))}
    </div>
  );
}

// A subtle abstract "streets" pattern drawn with plain SVG lines so the
// fallback map reads as a map, not just a blank card with pins on it.
function RoadBackground() {
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="none">
      <rect width="400" height="300" fill="#eaf2ea" />
      {[40, 110, 180, 250, 320].map((x) => (
        <line key={`v${x}`} x1={x} y1="0" x2={x} y2="300" stroke="#d7e6da" strokeWidth="6" />
      ))}
      {[40, 100, 160, 220, 280].map((y) => (
        <line key={`h${y}`} x1="0" y1={y} x2="400" y2={y} stroke="#d7e6da" strokeWidth="6" />
      ))}
      <circle cx="200" cy="150" r="120" fill="#e2eee3" opacity="0.6" />
    </svg>
  );
}