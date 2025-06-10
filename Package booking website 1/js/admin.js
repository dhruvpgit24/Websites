document.addEventListener('DOMContentLoaded', function () {
    // Initial setup
    const activeSectionId = localStorage.getItem('activeSectionId');
    if (activeSectionId) {
        showSection(activeSectionId);
    } else {
        showSection('addPackageSection'); // Show Add Package section by default
    }

    // Event listener for sidebar buttons
    document.querySelectorAll('.sidebar button').forEach(button => {
        button.addEventListener('click', function () {
            const sectionId = this.dataset.sectionId;
            showSection(sectionId);
            localStorage.setItem('activeSectionId', sectionId); // Store active section ID
        });
    });

    // Event listener for refreshing bookings
    document.getElementById('refreshBookings').addEventListener('click', function () {
        this.classList.add('spin');
        document.getElementById('refreshText').textContent = 'Refreshing...';
        fetchBookings();
    });

    // Event listener for adding package
    document.getElementById('addPackageForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const packageName = document.getElementById('packageName').value;
        const packageDescription = document.getElementById('packageDescription').value;
        const packageImage = document.getElementById('packageImage').files[0];

        const formData = new FormData();
        formData.append('name', packageName);
        formData.append('description', packageDescription);
        formData.append('image', packageImage);

        fetch('http://localhost:4000/addPackage', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log('Package added successfully:', data);
            // Clear the form inputs
            document.getElementById('packageName').value = '';
            document.getElementById('packageDescription').value = '';
            document.getElementById('packageImage').value = '';
        })
        .catch(error => {
            console.error('Error adding package:', error);
        });
    });

    // Event listener for deleting booking
    document.getElementById('bookingCards').addEventListener('click', function (event) {
        if (event.target.classList.contains('delete-btn')) {
            event.preventDefault(); // Prevent default behavior
            const bookingId = event.target.dataset.bookingId;
            deleteBooking(event, bookingId); // Pass event object to the function
        } else if (event.target.closest('.delete-btn')) {
            event.preventDefault(); // Prevent default behavior
            const bookingId = event.target.closest('.delete-btn').dataset.bookingId;
            deleteBooking(event, bookingId); // Pass event object to the function
        }
    });

    // Event listener for logging out
    document.getElementById('logoutButton').addEventListener('click', logout);

    // Event listener for managing packages
    document.querySelector('.sidebar button[data-section-id="managePackages"]').addEventListener('click', function () {
        showSection('managePackagesSection');
        fetchPackages();
    });

    // Fetch packages function
    function fetchPackages() {
        fetch('db.json')
            .then(response => response.json())
            .then(data => {
                displayPackages(data.packages);
            })
            .catch(error => {
                console.error('Error loading the packages:', error);
            });
    }

    // Display packages function
    function displayPackages(packages) {
        const container = document.getElementById('packageCards');
        container.innerHTML = '';

        if (packages.length === 0) {
            const noPackageMsg = document.createElement('p');
            noPackageMsg.textContent = 'No packages available.';
            noPackageMsg.className = 'no-packages';
            container.appendChild(noPackageMsg);
        } else {
            packages.forEach(pkg => {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                    <div class="card-header">
                        ${pkg.name}
                        <button type="button" class="delete-package-btn" data-package-id="${pkg.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                    <div class="card-body">
                        <img src="${pkg.image}" alt="${pkg.name}" class="package-image">
                        <p>${pkg.description}</p>
                    </div>
                `;
                container.appendChild(card);
            });
        }
    }

    // Event listener for deleting package
    document.getElementById('packageCards').addEventListener('click', function (event) {
        if (event.target.classList.contains('delete-package-btn')) {
            event.preventDefault(); // Prevent default behavior
            const packageId = event.target.dataset.packageId;
            deletePackage(event, packageId);
        } else if (event.target.closest('.delete-package-btn')) {
            event.preventDefault(); // Prevent default behavior
            const packageId = event.target.closest('.delete-pacakge-btn').dataset.packageId;
            deletePackage(event, packageId); // Pass event object to the function
        }
        });

    // Function to delete package
    function deletePackage(event, packageId) {
        event.preventDefault();
        fetch(`http://localhost:4000/packages/${packageId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                console.log('Package deleted:', packageId);
                fetchPackages(); // Fetch packages again to update UI
            } else {
                throw new Error('Failed to delete package');
            }
        })
        .catch(error => {
            console.error('Error deleting package:', error);
        });
    }

    // Update clock
    updateClock();
    fetchBookings();
});

// Function to fetch bookings
function fetchBookings() {
    fetch('db.json')
        .then(response => response.json())
        .then(data => {
            displayBookings(data.bookings);
            setTimeout(() => {
                document.getElementById('refreshBookings').classList.remove('spin');
                document.getElementById('refreshText').textContent = 'Refresh';
            }, 1000);
        })
        .catch(error => {
            console.error('Error loading the bookings:', error);
            setTimeout(() => {
                document.getElementById('refreshBookings').classList.remove('spin');
                document.getElementById('refreshText').textContent = 'Refresh';
            }, 1000);
        });
}

// Function to display bookings
function displayBookings(bookings) {
    const container = document.getElementById('bookingCards');
    container.innerHTML = '';

    if (bookings.length === 0) {
        const noBookingMsg = document.createElement('p');
        noBookingMsg.textContent = 'No bookings Received.';
        noBookingMsg.className = 'no-bookings';
        container.appendChild(noBookingMsg);
    } else {
        bookings.forEach(booking => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <div class="card-header">
                    ${booking.name}
                    <button type="button" class="delete-btn" data-booking-id="${booking.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
                <div class="card-body">
                    <p>Email: ${booking.email}</p>
                    <p>Phone: ${booking.phone}</p>
                    <p>Address: ${booking.address}</p>
                    <p>Location: ${booking.location}</p>
                    <p>Guests: ${booking.guests}</p>
                    <p>Arrival: ${booking.arrivals}</p>
                    <p>Leaving: ${booking.leaving}</p>
                    <button type="button" class="mail-btn" onclick="mailCustomer('${booking.name}', '${booking.email}', '${booking.phone}', '${booking.address}', '${booking.location}', '${booking.guests}', '${booking.arrivals}', '${booking.leaving}')">Email Now</button>
                </div>
            `;
            container.appendChild(card);
        });
    }
}

// Function to delete booking
function deleteBooking(event, id) {
    event.preventDefault(); // Prevent default form submission behavior

    fetch(`http://localhost:3000/bookings/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            console.log('Deleted:', id);
            fetchBookings(); // Fetch bookings again to update UI
        } else {
            throw new Error('Failed to delete booking');
        }
    })
    .catch(error => {
        console.error('Error deleting booking:', error);
    });
}

// Function to show a specific section
function showSection(sectionId) {
    const sections = document.getElementsByClassName('content-section');
    for (let section of sections) {
        section.classList.add('hidden');
    }
    document.getElementById(sectionId).classList.remove('hidden');
}

// Function to logout
function logout() {
    window.location.href = "admin.html";
}

// Function to update clock
function updateClock() {
    const dateElement = document.getElementById('date');
    const timeElement = document.getElementById('time');

    function refreshClock() {
        const now = new Date();
        const date = now.toDateString();
        const time = now.toLocaleTimeString();

        dateElement.textContent = date;
        timeElement.textContent = time;
    }

    refreshClock();
    setInterval(refreshClock, 1000);
}

// Function to mail customer
function mailCustomer(name, email, phone, address, location, guests, arrival, leaving) {
    const subject = encodeURIComponent('Booking Confirmation');
    const body = encodeURIComponent(`Hello dear ${name},\n\nThank you for your booking with us. We have received your booking details and are arranging your trip. Your booking details are as follows:\n\nEmail: ${email}\nPhone: ${phone}\nAddress: ${address}\nLocation: ${location}\nGuests: ${guests}\nArrival: ${arrival}\nLeaving: ${leaving}\n\nWe will get in touch with you shortly.\n\nBest regards,\nTravel. Agency\nDirectors:\n Kashif Abbas Kazmi\n Muhammad Sarim`);
    window.open(`mailto:${email}?subject=${subject}&body=${body}`);
}
