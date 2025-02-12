document.getElementById('bookingForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const duration = document.getElementById('duration').value;
    const roomType = document.getElementById('roomType').value;

    // Display confirmation message
    const confirmationMessage = `
        Thank you, ${name}! Your booking for a ${roomType} for ${duration} has been confirmed.
    `;
    document.getElementById('confirmationMessage').innerText = confirmationMessage;
        // Clear the form fields after submission
        document.getElementById('bookingForm').reset();
    });

    const availableRooms = {
        single: 5,
        double: 3,
        shared: 10
    };
    
    // document.getElementById('bookingForm').addEventListener('submit', function(event) {
    //     event.preventDefault();
    
    //     const roomType = document.getElementById('roomType').value;
    
    //     if (availableRooms[roomType] > 0) {
    //         availableRooms[roomType]--; // Decrease the available room count
    //         const name = document.getElementById('name').value;
    //         const duration = document.getElementById('duration').value;
    
    //         const confirmationMessage = `
    //             Thank you, ${name}! Your booking for a ${roomType} for ${duration} has been confirmed.
    //         `;
    //         document.getElementById('confirmationMessage').innerText = confirmationMessage;
    //     } else {
    //         document.getElementById('confirmationMessage').innerText = `Sorry, no ${roomType} rooms are available.`;
    //     }
    
    //     document.getElementById('bookingForm').reset();
    // });


    document.addEventListener("DOMContentLoaded", function () {
        const modal = document.getElementById("reservation-modal");
        const closeModal = document.querySelector(".close-btn");
        const images = document.querySelectorAll(".image-container img");
        let roomMetadata = {};
    
        // Load room metadata from JSON
        fetch("metadata.json")
            .then(response => response.json())
            .then(data => roomMetadata = data);
    
        // When image is clicked, show form with metadata
        images.forEach(img => {
            img.addEventListener("click", function () {
                const roomId = this.getAttribute("alt").replace(/\s+/g, "").toLowerCase(); 
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
            const booking = {
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                roomType: document.getElementById("roomType").value,
                price: document.getElementById("price").value
            };
    
            // Save booking data in a JSON file
            fetch("bookings.json", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(booking)
            }).then(() => {
                alert("Booking Confirmed!");
                modal.style.display = "none";
            });
        });
    });
    