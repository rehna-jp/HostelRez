document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("reservation-modal");
    const closeModal = document.querySelector(".close-btn");
    const images = document.querySelectorAll(".image-container img");
    let roomMetadata = [];

    // Load room metadata from JSON
    fetch("metadata.json")
        .then(response => response.json())
        .then(data => roomMetadata = data)
        .catch(error => console.error("Error loading metadata:", error));

    // When image is clicked, show form with metadata
    images.forEach(img => {
        img.addEventListener("click", function () {
            const roomId = this.getAttribute("alt").toLowerCase().replace(/\s+/g, "");
            const room = roomMetadata.find(r => r.id === roomId);
            if (room) {
                document.getElementById("roomType").value = room.roomType;
                document.getElementById("price").value = room.price;
                modal.style.display = "block";
            }
        });
    });

    // Close modal
    closeModal.addEventListener("click", () => modal.style.display = "none");

    // Handle booking submission
    document.getElementById("bookingForm").addEventListener("submit", function (event) {
        event.preventDefault();

        // Collect booking data
        const booking = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            roomType: document.getElementById("roomType").value,
            price: document.getElementById("price").value
        };

        // Fetch existing bookings from bookings.json
        fetch("bookings.json")
            .then(response => response.json())
            .then(existingBookings => {
                // Append new booking to existing bookings
                existingBookings.push(booking);

                // Save updated bookings back to bookings.json
                return fetch("bookings.json", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(existingBookings)
                });
            })
            .then(() => {
                alert("Booking Confirmed!");
                modal.style.display = "none";
            })
            .catch(error => console.error("Error saving booking:", error));
    });
});