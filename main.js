// --- Data: Event List ---
let events = [
  { id: 1, name: "Music Fiesta", date: "2025-06-15", seats: 10, category: "Music" },
  { id: 2, name: "Yoga Morning", date: "2025-07-01", seats: 15, category: "Health" },
  { id: 3, name: "Tech Meetup", date: "2025-08-20", seats: 20, category: "Technology" },
  { id: 4, name: "Painting Workshop", date: "2025-09-05", seats: 8, category: "Art" },
];

// --- Closure: Track registrations per category ---
function createCategoryTracker() {
  const categoryCount = {};
  return function (category) {
    if (!categoryCount[category]) {
      categoryCount[category] = 0;
    }
    categoryCount[category]++;
    console.log(`Registrations for ${category}: ${categoryCount[category]}`);
  };
}
const trackRegistration = createCategoryTracker();

// --- Reusable Function: Add New Event ---
function addEvent(name, date, seats, category) {
  const newEvent = {
    id: events.length + 1,
    name,
    date,
    seats,
    category,
  };
  events.push(newEvent);
  console.log(`Event '${name}' added successfully.`);
}

// --- Reusable Function: Register a User ---
function registerUser(eventId) {
  const event = events.find((e) => e.id === eventId);
  if (!event) return alert("Event not found");

  if (event.seats > 0) {
    event.seats--;
    document.getElementById(`seat-${event.id}`).textContent = event.seats;
    alert(`Registered for ${event.name}`);
    trackRegistration(event.category);
  } else {
    alert("No seats available");
  }
}

// --- Higher-Order Function: Filter Events by Custom Callback ---
function filterEvents(callback) {
  return events.filter(callback);
}

// --- Example: Filter by Category (e.g., Music) ---
const musicEvents = filterEvents((event) => event.category === "Music");
console.log("Music Events:", musicEvents);

// --- Render Events ---
function renderEvents(eventList) {
  const container = document.getElementById("eventsContainer");
  container.innerHTML = ""; // clear previous

  eventList.forEach((event) => {
    const card = document.createElement("div");
    card.className = "event-card";
    card.innerHTML = `
      <h3>${event.name}</h3>
      <p><strong>Date:</strong> ${event.date}</p>
      <p><strong>Category:</strong> ${event.category}</p>
      <p><strong>Seats:</strong> <span id="seat-${event.id}">${event.seats}</span></p>
      <button onclick="registerUser(${event.id})">Register</button>
    `;
    container.appendChild(card);
  });
}

// --- Initial Render ---
window.onload = function () {
  renderEvents(events);
};
