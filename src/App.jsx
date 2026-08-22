import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import { DonationsProvider } from "./context/DonationsContext.jsx";

import Home from "./pages/Home.jsx";
import MapPage from "./pages/MapPage.jsx";
import DonateFood from "./pages/DonateFood.jsx";
import AvailableFood from "./pages/AvailableFood.jsx";
import DonationDetails from "./pages/DonationDetails.jsx";
import MyRescues from "./pages/MyRescues.jsx";
import Impact from "./pages/Impact.jsx";
import Profile from "./pages/Profile.jsx";

export default function App() {
  return (
    <DonationsProvider>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/donate" element={<DonateFood />} />
          <Route path="/available-food" element={<AvailableFood />} />
          <Route path="/donation/:id" element={<DonationDetails />} />
          <Route path="/my-rescues" element={<MyRescues />} />
          <Route path="/impact" element={<Impact />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
      <Footer />
    </DonationsProvider>
  );
}
