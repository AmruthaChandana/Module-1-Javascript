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
