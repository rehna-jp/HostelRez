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
        // Auto-hide after 3 seconds
        setTimeout(hidePopover, 3000);
    }

    function hidePopover() {
        confirmationPopover.style.display = "none";
        popoverOverlay.style.display = "none";
    }

    function showModal() {
        modal.style.display = "block";
        document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
    }

    function hideModal() {
        modal.style.display = "none";
        document.body.style.overflow = ""; // Restore scrolling
    }

    popoverCloseBtn.addEventListener("click", hidePopover);
    popoverOverlay.addEventListener("click", hidePopover);

    // Load room metadata from JSON
    fetch("metadata.json")
        .then(response => {
            if (!response.ok) throw new Error("Failed to load room metadata");
            return response.json();
        })
        .then(data => {
            roomMetadata = data;
            console.log("Room metadata loaded successfully");
        })
        .catch(error => {
            console.error("Error loading metadata:", error);
            alert("Failed to load room information. Please refresh the page.");
        });

    // When image is clicked, show form with metadata
    images.forEach(img => {
        img.addEventListener("click", function () {
            // Extract room type from the alt text (e.g., "Single Bed Room 1" -> "Single Bed")
            const altText = this.getAttribute("alt");
            const roomType = altText.split(" Room")[0];
            
            // Find the corresponding room in metadata
            const room = roomMetadata.find(r => r.roomType === roomType);
            
            if (room) {
                document.getElementById("roomType").value = room.roomType;
                document.getElementById("price").value = room.price;
                showModal();
            } else {
                console.error("Room metadata not found for:", roomType);
                alert("Sorry, room information is not available at the moment.");
            }
        });
    });

    // Close modal
    closeModal.addEventListener("click", hideModal);

    // Close modal when clicking outside
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            hideModal();
        }
    });

    // Handle booking submission
    document.getElementById("bookingForm").addEventListener("submit", function (event) {
        event.preventDefault();
    
        // Collect booking data
        const booking = {
            name: document.getElementById("name").value.trim(),
            email: document.getElementById("email").value.trim(),
            roomType: document.getElementById("roomType").value,
            price: document.getElementById("price").value,
            bookingDate: new Date().toISOString()
        };
    
        // Basic validation
        if (!booking.name || !booking.email) {
            alert("Please fill in all required fields.");
            return;
        }
    
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(booking.email)) {
            alert("Please enter a valid email address.");
            return;
        }
    
        // Fetch existing bookings from bookings.json
        fetch("bookings.json")
            .then(response => {
                if (!response.ok) throw new Error("Failed to fetch existing bookings");
                return response.json();
            })
            .then(existingBookings => {
                // Append new booking to existing bookings
                existingBookings.push(booking);
    
                // Send updated bookings to the server
                return fetch("/update-bookings", {
                    method: "PUT",
                    headers: { 
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify(existingBookings)
                });
            })
            .then(response => {
                if (!response.ok) throw new Error("Failed to update bookings");
                return response.text();
            })
            .then(() => {
                showPopover();
                hideModal();
                // Reset form
                document.getElementById("bookingForm").reset();
            })
            .catch(error => {
                console.error("Error saving booking:", error);
                alert("Failed to save booking. Please try again.");
            });
    });

    // Add keyboard support for closing modal
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            hideModal();
            hidePopover();
        }
    });
});