import React, { createContext, useContext, useMemo, useState } from "react";
import { initialDonations, STATUS, STATUS_FLOW } from "../data/donations.js";

// A single Context keeps the demo state (donations + profile role) in one
// place instead of passing props down through every page. This is a very
// common beginner-friendly pattern once prop-drilling starts getting messy.
const DonationsContext = createContext(null);

export function DonationsProvider({ children }) {
  const [donations, setDonations] = useState(initialDonations);
  const [role, setRole] = useState("Restaurant");
  const [rescuedTotal, setRescuedTotal] = useState(248); // demo impact counter

  // Restaurant posts a new surplus food donation.
  function addDonation(newDonation) {
    setDonations((prev) => {
      const nextId = prev.length ? Math.max(...prev.map((d) => d.id)) + 1 : 1;
      return [
        ...prev,
        {
          id: nextId,
          status: STATUS.AVAILABLE,
          distanceKm: (Math.random() * 3 + 0.5).toFixed(1),
          ...newDonation,
        },
      ];
    });
  }

  // Move a donation forward one step in the rescue flow.
  function advanceStatus(id) {
    setDonations((prev) =>
      prev.map((d) => {
        if (d.id !== id) return d;
        const currentIndex = STATUS_FLOW.indexOf(d.status);
        const next = STATUS_FLOW[Math.min(currentIndex + 1, STATUS_FLOW.length - 1)];
        if (next === STATUS.RESCUED && d.status !== STATUS.RESCUED) {
          setRescuedTotal((t) => t + Number(d.meals || 0));
        }
        return { ...d, status: next };
      })
    );
  }

  // NGO/volunteer accepts a donation for pickup (Available -> Pickup Pending).
  function acceptDonation(id) {
    setDonations((prev) =>
      prev.map((d) =>
        d.id === id && d.status === STATUS.AVAILABLE
          ? { ...d, status: STATUS.PENDING }
          : d
      )
    );
  }

  const myRescues = useMemo(
    () => donations.filter((d) => d.status !== STATUS.AVAILABLE),
    [donations]
  );

  const value = {
    donations,
    myRescues,
    role,
    setRole,
    rescuedTotal,
    addDonation,
    advanceStatus,
    acceptDonation,
  };

  return (
    <DonationsContext.Provider value={value}>
      {children}
    </DonationsContext.Provider>
  );
}

export function useDonations() {
  const ctx = useContext(DonationsContext);
  if (!ctx) {
    throw new Error("useDonations must be used inside a DonationsProvider");
  }
  return ctx;
}
