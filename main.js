// Sample list of events
const events = [
  {
    name: "Music Fiesta",
    date: "2025-06-15",
    category: "Music",
    seats: 10
  },
  {
    name: "Yoga Morning",
    date: "2025-07-01",
    category: "Health",
    seats: 15
  },
  {
    name: "Tech Meetup",
    date: "2025-08-20",
    category: "Technology",
    seats: 20
  },
  {
    name: "Painting Workshop",
    date: "2025-09-05",
    category: "Art",
    seats: 8
  }
];

// Function to render events on the page
function renderEvents() {
  const container = document.getElementById('eventsContainer');
  container.innerHTML = '';

  events.forEach(eventItem => {
    const card = document.createElement('div');
    card.className = 'event-card';
    
    card.innerHTML = `
      <h3>${eventItem.name}</h3>
      <p><strong>Date:</strong> ${eventItem.date}</p>
      <p><strong>Category:</strong> ${eventItem.category}</p>
      <p><strong>Seats:</strong> ${eventItem.seats}</p>
    `;

    const registerBtn = document.createElement('button');
    registerBtn.textContent = "Register";
    registerBtn.addEventListener('click', () => {
      registerForEvent(eventItem);
    });

    card.appendChild(registerBtn);
    container.appendChild(card);
  });

  displayRegisteredEvents();
}

// Function to handle registration and update localStorage
function registerForEvent(eventItem) {
  if (eventItem.seats > 0) {
    eventItem.seats--;

    // Get existing registrations
    let registered = JSON.parse(localStorage.getItem('registeredEvents')) || [];

    // Add event if not already registered
    if (!registered.includes(eventItem.name)) {
      registered.push(eventItem.name);
      localStorage.setItem('registeredEvents', JSON.stringify(registered));
    }

    alert(`Registered for ${eventItem.name}!`);
    renderEvents(); // Re-render to update seat count and list
  } else {
    alert("No seats available for this event.");
  }
}

// Function to display user's registered events
function displayRegisteredEvents() {
  const list = document.getElementById('myEventsList');
  list.innerHTML = '';

  const registered = JSON.parse(localStorage.getItem('registeredEvents')) || [];

  if (registered.length === 0) {
    list.innerHTML = '<li>No events registered yet.</li>';
    return;
  }

  registered.forEach(eventName => {
    const li = document.createElement('li');
    li.textContent = eventName;
    list.appendChild(li);
  });
}

// Initial call on page load
document.addEventListener('DOMContentLoaded', () => {
  renderEvents();
});
