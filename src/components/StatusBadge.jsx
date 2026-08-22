import React from "react";
import { STATUS } from "../data/donations.js";

const STATUS_CONFIG = {
  [STATUS.AVAILABLE]: { label: "Available", className: "badge-available" },
  [STATUS.PENDING]: { label: "Pickup Pending", className: "badge-pending" },
  [STATUS.PICKED_UP]: { label: "Picked Up", className: "badge-picked" },
  [STATUS.RESCUED]: { label: "Rescued", className: "badge-rescued" },
};

export default function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG[STATUS.AVAILABLE];
  return (
    <span className={`badge ${config.className}`}>
      <span className="badge-dot" />
      {config.label}
    </span>
  );
}
