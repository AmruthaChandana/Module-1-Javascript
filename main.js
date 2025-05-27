// Initial list of events
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

// ✅ 1. Add new event using .push()
events.push({
  name: "Baking Basics",
  date: "2025-10-01",
  category: "Music",
  seats: 12
});

// ✅ 2. Filter only Music events
const musicEvents = events.filter(event => event.category === "Music");

// ✅ 3. Format names using .map()
const formattedEvents = events.map(event => {
  return {
    ...event,
    name: `Workshop on ${event.name}`
  };
});

// 🔁 Render Events (all or filtered/formatted)
function renderEvents(data = formattedEvents) {
  const container = document.getElementById('eventsContainer');
  container.innerHTML = '';

  data.forEach(eventItem => {
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
      registerForEvent(eventItem.name);
    });

    card.appendChild(registerBtn);
    container.appendChild(card);
  });

  displayRegisteredEvents();
}

// 🟡 Registration logic by event name
function registerForEvent(eventName) {
  const eventItem = events.find(e => `Workshop on ${e.name}` === eventName || e.name === eventName);

  if (eventItem && eventItem.seats > 0) {
    eventItem.seats--;

    let registered = JSON.parse(localStorage.getItem('registeredEvents')) || [];

    if (!registered.includes(eventItem.name)) {
      registered.push(eventItem.name);
      localStorage.setItem('registeredEvents', JSON.stringify(registered));
    }

    alert(`Registered for ${eventItem.name}!`);
    renderEvents(); // re-render
  } else {
    alert("No seats available for this event.");
  }
}

// ✅ Show registered events
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

// Initial render
document.addEventListener('DOMContentLoaded', () => {
  renderEvents();
});

