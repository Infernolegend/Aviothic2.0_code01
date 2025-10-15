/* ====== Registration → I-Card modal & utilities ====== */
(function(){
  // college logo url (use college website link)
  const collegeLogoURL = 'https://collegewebsite.edu/logo.png';

  // Elements
  const form = document.getElementById('regForm');
  const modal = document.getElementById('idCardModal');
  const idCardContainer = document.getElementById('idCardContainer');
  const closeBtn = document.getElementById('idModalClose') || document.querySelector('.modal .close');
  const downloadBtn = document.getElementById('downloadCardBtn');
  const printBtn = document.getElementById('printCardBtn');

  function openModal() { modal.classList.remove('hidden'); }
  function closeModal() { modal.classList.add('hidden'); }
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  // close on outside click
  modal.addEventListener('click', (ev) => { if (ev.target === modal) closeModal(); });

  // Form submit: create I-card and show modal + alert
  if (form) {
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const name = document.getElementById('regName').value.trim();
      const id = document.getElementById('regId').value.trim();
      const role = document.getElementById('regRole').value;
      const bus = document.getElementById('regBus').value;
      const fileInput = document.getElementById('regImage');
      const file = fileInput && fileInput.files && fileInput.files[0];

      if (!file) { alert('Please upload your photo.'); return; }

      const reader = new FileReader();
      reader.onload = function(ev){
        const imgData = ev.target.result;
        // build id-card HTML
        idCardContainer.innerHTML = `
          <div class="id-card">
            <img src="${collegeLogoURL}" alt="Logo" class="college-logo">
            <img src="${imgData}" alt="${name}" class="photo">
            <h3>${name}</h3>
            <p><strong>ID:</strong> ${id}</p>
            <p><strong>Role:</strong> ${role}</p>
            <p><strong>Bus:</strong> ${bus}</p>
          </div>
        `;
        // show modal and alert
        openModal();
        alert('Form Submitted Successfully ✅');
        form.reset();
      };
      reader.readAsDataURL(file);
    });
  }

  // Download card as PNG (simple)
  if (downloadBtn) {
    downloadBtn.addEventListener('click', function(){
      const cardEl = idCardContainer.querySelector('.id-card');
      if (!cardEl) { alert('No I-card to download'); return; }
      // render element to canvas (simple approach using html2canvas would be ideal,
      // but to avoid external libs we can open print dialog instead)
      // We'll use a lightweight approach: open new window with the card HTML and user can save as image/print.
      const w = window.open('', '_blank');
      w.document.write('<html><head><title>I-Card</title></head><body style="margin:0;padding:20px;background:#f4f4f4;">' + cardEl.outerHTML + '</body></html>');
      w.document.close();
    });
  }

  // Print I-card
  if (printBtn) {
    printBtn.addEventListener('click', function(){
      const cardEl = idCardContainer.querySelector('.id-card');
      if (!cardEl) { alert('No I-card to print'); return; }
      const w = window.open('', '_blank');
      w.document.write('<html><head><title>I-Card</title></head><body style="margin:0;padding:20px;background:#f4f4f4;">' + cardEl.outerHTML + '</body></html>');
      w.document.close();
      w.print();
    });
  }

  /* ===== Optional: basic search (client-side). Fill peopleData from your DB or static JS ===== */
  const peopleData = [
    { name:'Asha Kumar', id:'S101', role:'Student', bus:'Bus 1', image:'https://randomuser.me/api/portraits/women/44.jpg' },
    { name:'Rohan Verma', id:'S102', role:'Student', bus:'Bus 1', image:'https://randomuser.me/api/portraits/men/22.jpg' },
    { name:'Meera Singh', id:'F201', role:'Faculty', bus:'Bus 2', image:'https://randomuser.me/api/portraits/women/65.jpg' },
    // add more records or populate from server
  ];
  const searchInput = document.getElementById('searchInput');
  const resultsBox = document.getElementById('searchResults');

  window.searchPerson = function(){
    if (!searchInput || !resultsBox) return;
    const q = searchInput.value.trim().toLowerCase();
    resultsBox.innerHTML = '';
    if (!q) { resultsBox.classList.add('hidden'); return; }
    const matches = peopleData.filter(p => (p.name + ' ' + p.id + ' ' + p.bus).toLowerCase().includes(q));
    if (matches.length === 0) {
      resultsBox.innerHTML = '<div class="no-result">No matching person found</div>';
      resultsBox.classList.remove('hidden');
      return;
    }
    matches.forEach(p => {
      const div = document.createElement('div');
      div.className = 'person-card';
      div.innerHTML = `<img src="${p.image}" alt="${p.name}"><div style="flex:1"><strong>${p.name}</strong><div style="font-size:13px;color:#666">${p.role} • ${p.id} • ${p.bus}</div></div>`;
      div.addEventListener('click', ()=> {
        // on click show modal for that person (quick preview)
        idCardContainer.innerHTML = `
          <div class="id-card">
            <img src="${collegeLogoURL}" alt="Logo" class="college-logo">
            <img src="${p.image}" alt="${p.name}" class="photo">
            <h3>${p.name}</h3>
            <p><strong>ID:</strong> ${p.id}</p>
            <p><strong>Role:</strong> ${p.role}</p>
            <p><strong>Bus:</strong> ${p.bus}</p>
          </div>
        `;
        openModal();
      });
      resultsBox.appendChild(div);
    });
    resultsBox.classList.remove('hidden');
  };

})();
// Show section logic same rahe
function showSection(id) {
  document.querySelectorAll('.content').forEach(sec => sec.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}

const form = document.getElementById('regForm');
const allCardsContainer = document.getElementById('allIdCardsContainer');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('regName').value;
  const id = document.getElementById('regId').value;
  const role = document.getElementById('regRole').value;
  const bus = document.getElementById('regBus').value;
  const imageFile = document.getElementById('regImage').files[0];

  if (!imageFile) {
    alert("Please upload your photo!");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (event) {
    const imageSrc = event.target.result;

    // Create new I-Card
    const cardHTML = `
      <div class="id-card">
        <img src="https://yourcollegewebsite.com/logo.png" alt="College Logo" class="college-logo">
        <img src="${imageSrc}" alt="${name}">
        <h3>${name}</h3>
        <p><strong>ID:</strong> ${id}</p>
        <p><strong>Role:</strong> ${role}</p>
        <p><strong>Bus:</strong> ${bus}</p>
      </div>
    `;

    // Add new card to the gallery
    allCardsContainer.insertAdjacentHTML("beforeend", cardHTML);

    // Popup Alert
    alert("Form Submitted Successfully ✅");

    // Reset form
    form.reset();
  };

  reader.readAsDataURL(imageFile);
});
// 🔍 Search & Highlight Function
document.getElementById('searchBtn').addEventListener('click', function () {
  const query = document.getElementById('searchInput').value.toLowerCase().trim();
  const cards = document.querySelectorAll('.id-cards-gallery .id-card');
  
  if (query === "") {
    alert("Please enter a name to search!");
    return;
  }

  let found = false;
  cards.forEach(card => {
    const name = card.querySelector('h3').textContent.toLowerCase();
    if (name.includes(query)) {
      card.classList.add('highlight');
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      found = true;
    } else {
      card.classList.remove('highlight');
    }
  });

  if (!found) {
    alert("No matching record found ❌");
  }
});
// 🚌 Generate 50-seat map (10 rows of 5 seats = 50 total)
// 🚌 Generate 50-seat map (10 rows × 5 seats = 50)
function generateBusSeats() {
  const container = document.getElementById("busSeatMapContainer");
  container.innerHTML = "";

  // Front seats: driver + conductor
  const frontRow = document.createElement("div");
  frontRow.classList.add("front-row");
  frontRow.innerHTML = `
    <div class="conductor-seat">C</div>
    <div class="driver-seat">D</div>
  `;
  container.appendChild(frontRow);

  // 10 rows × (2 left + 3 right)
  let seatNum = 1;
  for (let i = 0; i < 10; i++) {
    const row = document.createElement("div");
    row.classList.add("row");

    const left = document.createElement("div");
    left.classList.add("left-seats");

    for (let j = 0; j < 2; j++) {
      const seat = document.createElement("div");
      seat.classList.add("seat", "available");
      seat.textContent = seatNum++;
      seat.addEventListener("click", toggleSeatStatus);
      left.appendChild(seat);
    }

    const right = document.createElement("div");
    right.classList.add("right-seats");

    for (let k = 0; k < 3; k++) {
      const seat = document.createElement("div");
      seat.classList.add("seat", "available");
      seat.textContent = seatNum++;
      seat.addEventListener("click", toggleSeatStatus);
      right.appendChild(seat);
    }

    row.appendChild(left);
    row.appendChild(right);
    container.appendChild(row);
  }
}

// 🎯 Seat Click Handler
function toggleSeatStatus(e) {
  const seat = e.target;
  const seatNo = seat.textContent;

  if (seat.classList.contains("booked")) {
    seat.classList.remove("booked");
    seat.classList.add("available");
    alert(`Seat ${seatNo} is now available ✅`);
  } else {
    seat.classList.remove("available");
    seat.classList.add("booked");
    alert(`Seat ${seatNo} booked successfully 🪑`);
  }
}

// 🔘 Popup Controls
document.getElementById("viewSeatsBtn").addEventListener("click", () => {
  generateBusSeats();
  document.getElementById("seatPopup").style.display = "flex";
});

document.getElementById("closeSeatPopup").addEventListener("click", () => {
  document.getElementById("seatPopup").style.display = "none";
});

window.addEventListener("click", (e) => {
  const popup = document.getElementById("seatPopup");
  if (e.target === popup) popup.style.display = "none";
});


// 🔘 Open & Close Popup
document.getElementById("viewSeatsBtn").addEventListener("click", () => {
  generateBusSeats();
  document.getElementById("seatPopup").style.display = "flex";
});

document.getElementById("closeSeatPopup").addEventListener("click", () => {
  document.getElementById("seatPopup").style.display = "none";
});

// Close when clicking outside popup
window.addEventListener("click", (e) => {
  const popup = document.getElementById("seatPopup");
  if (e.target === popup) popup.style.display = "none";
});
// Floating Navbar Hide/Show on Scroll
let prevScrollPos = window.pageYOffset;
const header = document.querySelector("header");

window.onscroll = function () {
  let currentScrollPos = window.pageYOffset;

  if (prevScrollPos > currentScrollPos) {
    // Scroll Up → show navbar
    header.style.top = "0";
  } else {
    // Scroll Down → hide navbar
    header.style.top = "-90px"; // adjust as per navbar height
  }
  prevScrollPos = currentScrollPos;
};

// Function to open map popup with specific route map
function openMapPopup(route) {
  const popup = document.getElementById("mapPopup");
  const iframe = document.getElementById("routeMapFrame");

  // Different maps for each route — tum yahan apne route ke Google Map embed link daal sakte ho
  const maps = {
    route1: 'https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d114298.41230361754!2d80.26403459050903!3d26.46135696276596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e6!4m5!1s0x399c30b106d0fdeb%3A0xa3ee48b16d8be481!2sBithoor%20Rd%2C%20Uttar%20Pradesh!3m2!1d26.558754699999998!2d80.2624915!4m5!1s0x399c4224d727667f%3A0xb4fca6542e514125!2sKanpur%20Institute%20of%20Technology%2C%20A1%2C%20UPSIDC%20Industrial%20Area%2C%20Chakeri%20Ward%2C%20Rooma%2C%20Kanpur%2C%20Uttar%20Pradesh%20208007!3m2!1d26.3699791!2d80.42424059999999!5e0!3m2!1sen!2sin!4v1760506252330!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade">',
    route2: 'https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d114316.91689476454!2d80.23887908980092!3d26.44271457439408!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e6!4m5!1s0x399c36fcbd168daf%3A0x3d376e4a91569554!2sRatanpur%20Rd%2C%20Nankari%2C%20Kalyanpur%2C%20Kanpur%2C%20Uttar%20Pradesh%20208016!3m2!1d26.5186012!2d80.226868!4m5!1s0x399c4224d727667f%3A0xb4fca6542e514125!2sKanpur%20Institute%20of%20Technology%2C%20A1%2C%20UPSIDC%20Industrial%20Area%2C%20Chakeri%20Ward%2C%20Rooma%2C%20Kanpur%2C%20Uttar%20Pradesh%20208007!3m2!1d26.3699791!2d80.42424059999999!5e0!3m2!1sen!2sin!4v1760506942083!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade">',
    route3: 'https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d114372.19345225776!2d80.30909188768553!3d26.386953609234514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e6!4m5!1s0x399c465bf40a0915%3A0x6731a638ebd4e125!2sNaubasta%20Bamba%2C%20Naubasta%2C%20Kanpur%2C%20Uttar%20Pradesh!3m2!1d26.4031058!2d80.314521!4m5!1s0x399c4224d727667f%3A0xb4fca6542e514125!2sKanpur%20Institute%20of%20Technology%2C%20A1%2C%20UPSIDC%20Industrial%20Area%2C%20Chakeri%20Ward%2C%20Rooma%2C%20Kanpur%2C%20Uttar%20Pradesh%20208007!3m2!1d26.3699791!2d80.42424059999999!5e0!3m2!1sen!2sin!4v1760507074219!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade">',
    route4: 'https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d114336.78182121897!2d80.2835791390407!3d26.42268813689665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e6!4m5!1s0x399c3900275b0f6b%3A0x85fdf25ea8512da1!2sRawatpur%20crossing%2C%20Moti%20Vihar%20Society%2C%20Rawat%20Pur%2C%20Kanpur%2C%20Uttar%20Pradesh!3m2!1d26.481417!2d80.30002999999999!4m5!1s0x399c4224d727667f%3A0xb4fca6542e514125!2sKanpur%20Institute%20of%20Technology%2C%20A1%2C%20UPSIDC%20Industrial%20Area%2C%20Chakeri%20Ward%2C%20Rooma%2C%20Kanpur%2C%20Uttar%20Pradesh%20208007!3m2!1d26.3699791!2d80.42424059999999!5e0!3m2!1sen!2sin!4v1760507172859!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade">',
  };

  iframe.src = maps[route] || "";
  popup.style.display = "flex";
}

// Function to close map popup
function closeMapPopup() {
  document.getElementById("mapPopup").style.display = "none";
  document.getElementById("routeMapFrame").src = "";
}

// Attach event listener to "View Map" buttons
document.querySelectorAll(".view-details").forEach((btn, index) => {
  btn.addEventListener("click", () => openMapPopup(`route${index + 1}`));
});

document.addEventListener("DOMContentLoaded", function() {
    const searchBox = document.getElementById("search-box");
    const searchBtn = document.getElementById("searchBtn");
    const table = document.querySelector("#student-info table tbody");
    const rows = table.getElementsByTagName("tr");

    function searchTable() {
        const query = searchBox.value.toLowerCase();
        for (let i = 0; i < rows.length; i++) {
            const cells = rows[i].getElementsByTagName("td");
            let match = false;
            for (let j = 0; j < cells.length; j++) {
                if (cells[j].textContent.toLowerCase().includes(query)) {
                    match = true;
                    break;
                }
            }
            rows[i].style.display = match ? "" : "none";
        }
    }

    searchBtn.addEventListener("click", searchTable);

    // Optional: Search while typing
    searchBox.addEventListener("keyup", searchTable);
});

document.addEventListener("DOMContentLoaded", function() {
    // --- STUDENT SEARCH ---
    const studentSearchBox = document.getElementById("search-box");
    const studentSearchBtn = document.getElementById("searchBtn");
    const studentTable = document.querySelector("#student-info table tbody");
    const studentRows = studentTable.getElementsByTagName("tr");

    function searchStudentTable() {
        const query = studentSearchBox.value.toLowerCase();
        for (let i = 0; i < studentRows.length; i++) {
            const cells = studentRows[i].getElementsByTagName("td");
            let match = false;
            for (let j = 0; j < cells.length; j++) {
                if (cells[j].textContent.toLowerCase().includes(query)) {
                    match = true;
                    break;
                }
            }
            studentRows[i].style.display = match ? "" : "none";
        }
    }

    studentSearchBtn.addEventListener("click", searchStudentTable);
    studentSearchBox.addEventListener("keyup", searchStudentTable);


    // --- FACULTY SEARCH ---
    const facultySearchBox = document.getElementById("faculty-search");
    const facultySearchBtn = document.querySelector("#faculty-info .btn-primary");
    const facultyTable = document.querySelector("#faculty-info table tbody");
    const facultyRows = facultyTable.getElementsByTagName("tr");

    function searchFacultyTable() {
        const query = facultySearchBox.value.toLowerCase();
        for (let i = 0; i < facultyRows.length; i++) {
            const cells = facultyRows[i].getElementsByTagName("td");
            let match = false;
            for (let j = 0; j < cells.length; j++) {
                if (cells[j].textContent.toLowerCase().includes(query)) {
                    match = true;
                    break;
                }
            }
            facultyRows[i].style.display = match ? "" : "none";
        }
    }

    facultySearchBtn.addEventListener("click", searchFacultyTable);
    facultySearchBox.addEventListener("keyup", searchFacultyTable);
});
// 🚌 Generate 50-seat map (10 rows × 5 seats = 50)
function generateBusSeats() {
  const container = document.getElementById("busSeatMapContainer");
  container.innerHTML = "";

  // Front seats: driver + conductor
  const frontRow = document.createElement("div");
  frontRow.classList.add("front-row");
  frontRow.innerHTML = `
    <div class="conductor-seat">C</div>
    <div class="driver-seat">D</div>
  `;
  container.appendChild(frontRow);

  // 10 rows × (2 left + 3 right)
  let seatNum = 1;
  for (let i = 0; i < 10; i++) {
    const row = document.createElement("div");
    row.classList.add("row");

    const left = document.createElement("div");
    left.classList.add("left-seats");

    for (let j = 0; j < 2; j++) {
      const seat = document.createElement("div");
      seat.classList.add("seat", "available");
      seat.textContent = seatNum++;
      seat.addEventListener("click", toggleSeatStatus);
      left.appendChild(seat);
    }

    const right = document.createElement("div");
    right.classList.add("right-seats");

    for (let k = 0; k < 3; k++) {
      const seat = document.createElement("div");
      seat.classList.add("seat", "available");
      seat.textContent = seatNum++;
      seat.addEventListener("click", toggleSeatStatus);
      right.appendChild(seat);
    }

    row.appendChild(left);
    row.appendChild(right);
    container.appendChild(row);
  }
}

// 🎯 Seat Click Handler
function toggleSeatStatus(e) {
  const seat = e.target;
  const seatNo = seat.textContent;

  if (seat.classList.contains("booked")) {
    seat.classList.remove("booked");
    seat.classList.add("available");
    alert(`Seat ${seatNo} is now available ✅`);
  } else {
    seat.classList.remove("available");
    seat.classList.add("booked");
    alert(`Seat ${seatNo} booked successfully 🪑`);
  }
}

// 🔘 Popup Controls
document.getElementById("viewSeatsBtn").addEventListener("click", () => {
  generateBusSeats();
  document.getElementById("seatPopup").style.display = "flex";
});

document.getElementById("closeSeatPopup").addEventListener("click", () => {
  document.getElementById("seatPopup").style.display = "none";
});

window.addEventListener("click", (e) => {
  const popup = document.getElementById("seatPopup");
  if (e.target === popup) popup.style.display = "none";
});
