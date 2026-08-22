// Demo/mock data for the RescueSupply prototype.
// In a real product this would come from a backend + database.
// Coordinates are centered around a sample North-India city so the
// fallback map has a realistic, tight cluster of markers.

export const STATUS = {
  AVAILABLE: "Available",
  PENDING: "Pickup Pending",
  PICKED_UP: "Picked Up",
  RESCUED: "Rescued",
};

// Order in which a donation naturally progresses.
export const STATUS_FLOW = [
  STATUS.AVAILABLE,
  STATUS.PENDING,
  STATUS.PICKED_UP,
  STATUS.RESCUED,
];

export const FOOD_CATEGORIES = [
  "All",
  "Meals",
  "Bakery",
  "Fruits",
  "Vegetables",
  "Packaged Food",
];

export const initialDonations = [
  {
    id: 1,
    restaurant: "Green Leaf Restaurant",
    category: "Meals",
    food: "Rice + Dal",
    description:
      "Freshly cooked steamed rice with mixed lentil dal, prepared in surplus for a cancelled catering order.",
    meals: 40,
    condition: "Freshly cooked, still hot",
    contact: "+91 98765 43210",
    address: "SCO 14, Sector 22, near City Bus Stand",
    availableUntil: "9:00 PM",
    latitude: 30.352,
    longitude: 76.824,
    status: STATUS.AVAILABLE,
    distanceKm: 1.4,
  },
  {
    id: 2,
    restaurant: "Spice Hub",
    category: "Meals",
    food: "Roti + Sabzi",
    description:
      "Mixed vegetable curry with whole wheat rotis, made in excess for an evening event.",
    meals: 25,
    condition: "Freshly cooked, packed and sealed",
    contact: "+91 98765 11223",
    address: "Model Town Market, Shop 8",
    availableUntil: "8:30 PM",
    latitude: 30.36,
    longitude: 76.808,
    status: STATUS.AVAILABLE,
    distanceKm: 2.1,
  },
  {
    id: 3,
    restaurant: "Urban Bites",
    category: "Packaged Food",
    food: "Sandwiches",
    description:
      "Assorted vegetable and paneer sandwiches, individually wrapped and refrigerated.",
    meals: 30,
    condition: "Refrigerated, best before tonight",
    contact: "+91 98765 55667",
    address: "Phase 3B2, Industrial Area",
    availableUntil: "10:00 PM",
    latitude: 30.34,
    longitude: 76.79,
    status: STATUS.PENDING,
    distanceKm: 3.6,
  },
  {
    id: 4,
    restaurant: "Food Corner",
    category: "Meals",
    food: "Biryani",
    description:
      "Vegetable biryani cooked for a wedding function with a large surplus batch remaining.",
    meals: 50,
    condition: "Freshly cooked, still hot",
    contact: "+91 98765 99887",
    address: "Sector 17 Plaza, Gate 2",
    availableUntil: "9:30 PM",
    latitude: 30.365,
    longitude: 76.836,
    status: STATUS.AVAILABLE,
    distanceKm: 0.9,
  },
  {
    id: 5,
    restaurant: "Cafe Aroma",
    category: "Bakery",
    food: "Bread + Snacks",
    description:
      "End-of-day bakery surplus: bread loaves, muffins and savoury pastries.",
    meals: 20,
    condition: "Room temperature, packed today",
    contact: "+91 98765 33445",
    address: "Elante Road, Cafe Row",
    availableUntil: "7:00 PM",
    latitude: 30.33,
    longitude: 76.815,
    status: STATUS.RESCUED,
    distanceKm: 4.2,
  },
];

// Demo leaderboard shown on the Home page and Impact page.
export const leaderboard = [
  { name: "Green Leaf Restaurant", meals: 480 },
  { name: "Spice Hub", meals: 420 },
  { name: "Food Corner", meals: 380 },
];

// Demo weekly chart data for the Impact dashboard.
export const weeklyMeals = [
  { day: "Mon", meals: 180 },
  { day: "Tue", meals: 220 },
  { day: "Wed", meals: 160 },
  { day: "Thu", meals: 260 },
  { day: "Fri", meals: 310 },
  { day: "Sat", meals: 340 },
  { day: "Sun", meals: 240 },
];

// Sample top-line impact statistics (demo/prototype numbers).
export const impactStats = {
  mealsRescued: 12480,
  restaurants: 86,
  ngos: 32,
  foodSavedTons: 4.8,
};