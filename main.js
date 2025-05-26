// --- Task 1: Console & Alert ---
console.log("Welcome to the Community Portal");
window.addEventListener("load", () => {
  alert("Page has fully loaded. Enjoy browsing community events!");
});

// --- Task 2: Event Info and Seat Management ---
const eventName = "Music Fiesta";
const eventDate = "2025-06-15";
let availableSeats = 50;

// Display data in HTML
document.getElementById("eventName").textContent = eventName;
document.getElementById("eventDate").textContent = eventDate;
document.getElementById("seatCount").textContent = availableSeats;

// Register function
function registerUser() {
  if (availableSeats > 0) {
    availableSeats--;
    document.getElementById("seatCount").textContent = availableSeats;
    alert("You have successfully registered!");
  } else {
    alert("Sorry, no seats available!");
  }
}

// --- Task 3: Event Filtering, Looping, Error Handling ---

const events = [
  { name: "Music Fiesta", date: "2025-06-15", seats: 10 },
  { name: "Yoga Morning", date: "2025-10-10", seats: 0 },
  { name: "Tech Meetup", date: "2025-08-20", seats: 25 },
  { name: "Art Workshop", date: "2024-12-10", seats: 5 }, // Past event
];

// Utility: Check if event is in the future and has seats
function isValidEvent(event) {
  const today = new Date();
  const eventDate = new Date(event.date);
  return eventDate > today && event.seats > 0;
}

// Render valid events
const container = document.createElement("div");
document.body.appendChild(container);

events.forEach((event, index) => {
  if (isValidEvent(event)) {
    const card = document.createElement("div");
    card.className = "event-card";
    card.innerHTML = `
      <h3>${event.name}</h3>
      <p><strong>Date:</strong> ${event.date}</p>
      <p><strong>Seats:</strong> <span id="seat-${index}">${event.seats}</span></p>
      <button onclick="tryRegister(${index})">Register</button>
    `;
    container.appendChild(card);
  }
});

// Safe registration with error handling
function tryRegister(index) {
  try {
    const event = events[index];
    if (event.seats > 0) {
      event.seats--;
      document.getElementById(`seat-${index}`).textContent = event.seats;
      alert(`Successfully registered for ${event.name}`);
    } else {
      throw new Error("No seats available.");
    }
  } catch (error) {
    console.error("Registration failed:", error.message);
    alert("Error: " + error.message);
  }
}
