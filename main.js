const events = [
  { name: "Music Fiesta", date: "2025-06-15", category: "Music", seats: 10 },
  { name: "Yoga Morning", date: "2025-07-01", category: "Health", seats: 15 },
  { name: "Tech Meetup", date: "2025-08-20", category: "Technology", seats: 20 },
  { name: "Painting Workshop", date: "2025-09-05", category: "Art", seats: 8 }
];

let registeredEvents = [];

function renderEvents(filterCategory = null, searchTerm = "") {
  const container = document.querySelector("#allEvents");
  container.innerHTML = "";

  const normalizedSearch = searchTerm.trim().toLowerCase();

  events.forEach(event => {
    const matchesCategory = !filterCategory || event.category === filterCategory;
    const matchesSearch = event.name.toLowerCase().includes(normalizedSearch);

    if (matchesCategory && matchesSearch) {
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
  const list = document.getElementById("myEventsList");
  list.innerHTML = "";
  registeredEvents.forEach(name => {
    const li = document.createElement("li");
    li.textContent = name;
    list.appendChild(li);
  });
}

function addEvent() {
  const name = document.getElementById("eventName").value;
  const date = document.getElementById("eventDate").value;
  const category = document.getElementById("eventCategory").value;
  const seats = parseInt(document.getElementById("eventSeats").value);

  if (name && date && category && !isNaN(seats)) {
    events.push({ name, date, category, seats });
    renderEvents(currentCategoryFilter, currentSearchTerm);
  }
}

// Handle form submit to add event
document.getElementById("addEventForm").onsubmit = (e) => {
  e.preventDefault(); // prevent page reload
  addEvent();

  // Clear form inputs after adding
  e.target.reset();
};

// Track current filters/search
let currentCategoryFilter = null;
let currentSearchTerm = "";

// Category dropdown onchange event
document.querySelector("#categoryFilter").onchange = (e) => {
  currentCategoryFilter = e.target.value || null;
  renderEvents(currentCategoryFilter, currentSearchTerm);
};

// Search input keydown event (using input event for instant feedback)
document.querySelector("#searchInput").addEventListener("input", (e) => {
  currentSearchTerm = e.target.value;
  renderEvents(currentCategoryFilter, currentSearchTerm);
});

// Filter buttons onclick events
document.querySelector("#filterMusic").onclick = () => {
  currentCategoryFilter = "Music";
  currentSearchTerm = "";
  document.querySelector("#categoryFilter").value = "Music";
  document.querySelector("#searchInput").value = "";
  renderEvents(currentCategoryFilter, currentSearchTerm);
};

document.querySelector("#showAll").onclick = () => {
  currentCategoryFilter = null;
  currentSearchTerm = "";
  document.querySelector("#categoryFilter").value = "";
  document.querySelector("#searchInput").value = "";
  renderEvents();
};

// Initial render
renderEvents();
updateMyEvents();
