const events = [
  { name: "Music Fiesta", date: "2025-06-15", category: "Music", seats: 10 },
  { name: "Yoga Morning", date: "2025-07-01", category: "Health", seats: 15 },
  { name: "Tech Meetup", date: "2025-08-20", category: "Technology", seats: 20 },
  { name: "Painting Workshop", date: "2025-09-05", category: "Art", seats: 8 }
];

let registeredEvents = [];

function renderEvents(filterCategory = null) {
  const container = document.querySelector("#allEvents");
  container.innerHTML = "";

  events.forEach(event => {
    if (!filterCategory || event.category === filterCategory) {
      const card = document.createElement("div");
      card.className = "event-card";

      const title = document.createElement("h3");
      title.textContent = event.name;

      const date = document.createElement("p");
      date.innerHTML = `<strong>Date:</strong> ${event.date}`;

      const category = document.createElement("p");
      category.innerHTML = `<strong>Category:</strong> ${event.category}`;

      const seats = document.createElement("p");
      seats.innerHTML = `<strong>Seats:</strong> ${event.seats}`;

      const registerBtn = document.createElement("button");
      registerBtn.textContent = "Register";
      registerBtn.onclick = () => {
        if (!registeredEvents.includes(event.name)) {
          registeredEvents.push(event.name);
          updateMyEvents();
        }
      };

      const cancelBtn = document.createElement("button");
      cancelBtn.textContent = "Cancel";
      cancelBtn.style.marginLeft = "10px";
      cancelBtn.onclick = () => {
        registeredEvents = registeredEvents.filter(e => e !== event.name);
        updateMyEvents();
      };

      card.appendChild(title);
      card.appendChild(date);
      card.appendChild(category);
      card.appendChild(seats);
      card.appendChild(registerBtn);
      card.appendChild(cancelBtn);

      container.appendChild(card);
    }
  });
}

function updateMyEvents() {
  const list = document.querySelector("#myEventsList");
  list.innerHTML = "";
  registeredEvents.forEach(name => {
    const li = document.createElement("li");
    li.textContent = name;
    list.appendChild(li);
  });
}

function addEvent() {
  const name = document.querySelector("#eventName").value.trim();
  const date = document.querySelector("#eventDate").value;
  const category = document.querySelector("#eventCategory").value.trim();
  const seats = parseInt(document.querySelector("#eventSeats").value);

  if (name && date && category && !isNaN(seats) && seats > 0) {
    events.push({ name, date, category, seats });
    renderEvents();
    // Clear form inputs after adding
    document.querySelector("#addEventForm").reset();
  } else {
    alert("Please fill all fields correctly.");
  }
}

// Attach form submit handler using querySelector
document.querySelector("#addEventForm").addEventListener("submit", e => {
  e.preventDefault(); // Prevent page reload
  addEvent();
});

// Filter Buttons
document.querySelector("#filterMusic").onclick = () => renderEvents("Music");
document.querySelector("#showAll").onclick = () => renderEvents();

// Initial render
renderEvents();
updateMyEvents();
