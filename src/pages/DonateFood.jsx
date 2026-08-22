import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button.jsx";
import { useDonations } from "../context/DonationsContext.jsx";
import { FOOD_CATEGORIES } from "../data/donations.js";

const EMPTY_FORM = {
  restaurant: "",
  category: "Meals",
  food: "",
  description: "",
  meals: "",
  address: "",
  availableUntil: "",
  condition: "",
  contact: "",
};

export default function DonateFood() {
  const { addDonation } = useDonations();
  const navigate = useNavigate();
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    addDonation({
      restaurant: form.restaurant,
      category: form.category,
      food: form.food,
      description: form.description,
      meals: Number(form.meals) || 0,
      address: form.address,
      availableUntil: form.availableUntil,
      condition: form.condition,
      contact: form.contact,
      // Demo prototype: place the new pin near the existing cluster.
      latitude: 30.35 + (Math.random() - 0.5) * 0.03,
      longitude: 76.82 + (Math.random() - 0.5) * 0.03,
    });

    setSubmitted(true);
    setForm(EMPTY_FORM);

    setTimeout(() => navigate("/available-food"), 1400);
  }

  return (
    <div className="container">
      <div className="page-header">
        <span className="eyebrow">For restaurants</span>
        <h1 className="section-heading" style={{ marginTop: 14 }}>
          Post your surplus food
        </h1>
        <p className="section-sub">
          Takes less than a minute. Nearby NGOs and volunteers will see it instantly.
        </p>
      </div>

      <form className="card form-card fade-up" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="field full">
            <label>Restaurant Name</label>
            <input
              name="restaurant"
              value={form.restaurant}
              onChange={handleChange}
              placeholder="e.g. Green Leaf Restaurant"
              required
            />
          </div>

          <div className="field">
            <label>Food Type</label>
            <input
              name="food"
              value={form.food}
              onChange={handleChange}
              placeholder="e.g. Rice + Dal"
              required
            />
          </div>

          <div className="field">
            <label>Food Category</label>
            <select name="category" value={form.category} onChange={handleChange}>
              {FOOD_CATEGORIES.filter((c) => c !== "All").map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="field full">
            <label>Food Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Briefly describe the food, how it was prepared, and any allergens."
            />
          </div>

          <div className="field">
            <label>Number of Meals</label>
            <input
              type="number"
              min="1"
              name="meals"
              value={form.meals}
              onChange={handleChange}
              placeholder="e.g. 40"
              required
            />
          </div>

          <div className="field">
            <label>Available Until</label>
            <input
              name="availableUntil"
              value={form.availableUntil}
              onChange={handleChange}
              placeholder="e.g. 9:00 PM"
              required
            />
          </div>

          <div className="field full">
            <label>Pickup Address</label>
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Street, area, landmark"
              required
            />
          </div>

          <div className="field">
            <label>Food Condition</label>
            <input
              name="condition"
              value={form.condition}
              onChange={handleChange}
              placeholder="e.g. Freshly cooked, still hot"
            />
          </div>

          <div className="field">
            <label>Contact Information</label>
            <input
              name="contact"
              value={form.contact}
              onChange={handleChange}
              placeholder="Phone number"
              required
            />
          </div>
        </div>

        <div style={{ marginTop: 28 }}>
          <Button type="submit" block>Post Donation</Button>
        </div>

        {submitted && (
          <div className="success-banner">
            ✅ Donation posted successfully! Nearby NGOs can now discover your
            food donation. Redirecting to Available Food…
          </div>
        )}
      </form>
    </div>
  );
}
