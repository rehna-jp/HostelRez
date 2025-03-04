document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("reservation-modal");
    const closeModal = document.querySelector(".close-btn");
    const images = document.querySelectorAll(".image-container img");
    const confirmationPopover = document.getElementById("confirmation-popover");
    const popoverOverlay = document.getElementById("popover-overlay");
    const popoverCloseBtn = document.querySelector(".popover-close-btn");
    let roomMetadata = [];

    function showPopover() {
        confirmationPopover.style.display = "block";
        popoverOverlay.style.display = "block";
    }

    function hidePopover() {
    confirmationPopover.style.display = "none";
    popoverOverlay.style.display = "none";
    }

    popoverCloseBtn.addEventListener("click", hidePopover);

    popoverOverlay.addEventListener("click", hidePopover);

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
    
                // Send updated bookings to the server
                return fetch("/update-bookings", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(existingBookings)
                });
            })
            .then(response => {
                if (response.ok) {
                    showPopover();
                    modal.style.display = "none";
                } else {
                    throw new Error("Failed to update bookings");
                }
            })
            .catch(error => {
                console.error("Error saving booking:", error);
                alert("Failed to save booking. Please try again.");
            });
    });
});