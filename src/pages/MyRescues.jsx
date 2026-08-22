import React from "react";
import Button from "../components/Button.jsx";
import StatusBadge from "../components/StatusBadge.jsx";
import { useDonations } from "../context/DonationsContext.jsx";
import { STATUS_FLOW, STATUS } from "../data/donations.js";

const TIMELINE_LABELS = [
  { status: STATUS.AVAILABLE, title: "Donation Created", sub: "Restaurant posted the surplus food" },
  { status: STATUS.PENDING, title: "Pickup Accepted", sub: "You accepted this donation for pickup" },
  { status: STATUS.PICKED_UP, title: "Food Collected", sub: "Food has been picked up from the restaurant" },
  { status: STATUS.RESCUED, title: "Delivered", sub: "Food delivered to the community — fully rescued" },
];

export default function MyRescues() {
  const { myRescues, advanceStatus } = useDonations();

  return (
    <div className="container">
      <div className="page-header">
        <span className="eyebrow">My rescues</span>
        <h1 className="section-heading" style={{ marginTop: 14 }}>
          Your pickups &amp; rescue history
        </h1>
        <p className="section-sub">
          Track every donation you've accepted, from pickup to delivery.
        </p>
      </div>

      {myRescues.length === 0 ? (
        <div className="empty-state">
          You haven't accepted any pickups yet. Head to Available Food to get started.
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {myRescues.map((donation) => {
            const currentIndex = STATUS_FLOW.indexOf(donation.status);
            const isFinal = donation.status === STATUS.RESCUED;

            return (
              <div key={donation.id} className="card fade-up" style={{ padding: 26 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                  <div>
                    <div className="donation-restaurant">🍛 {donation.restaurant}</div>
                    <div className="donation-food">{donation.food} · {donation.meals} meals</div>
                  </div>
                  <StatusBadge status={donation.status} />
                </div>

                <div className="timeline">
                  {TIMELINE_LABELS.map((step, i) => {
                    const done = i <= currentIndex;
                    const current = i === currentIndex;
                    return (
                      <div className="timeline-step" key={step.status}>
                        <div className="timeline-marker">
                          <div className={`timeline-dot ${done ? "done" : ""} ${current ? "current" : ""}`}>
                            {done ? "✓" : i + 1}
                          </div>
                          {i < TIMELINE_LABELS.length - 1 && (
                            <div className={`timeline-line ${i < currentIndex ? "done" : ""}`} />
                          )}
                        </div>
                        <div className="timeline-content">
                          <div className="timeline-title">{step.title}</div>
                          <div className="timeline-sub">{step.sub}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {!isFinal && (
                  <Button size="sm" onClick={() => advanceStatus(donation.id)}>
                    Mark as “{TIMELINE_LABELS[currentIndex + 1]?.title}”
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
