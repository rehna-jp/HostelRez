const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static("public"));

// Endpoint to update bookings.json
app.put("/update-bookings", (req, res) => {
    const bookings = req.body;

    // Write the updated bookings to bookings.json
    fs.writeFile(path.join(__dirname, "public", "bookings.json"), JSON.stringify(bookings), (err) => {
        if (err) {
            console.error("Error writing to bookings.json:", err);
            return res.status(500).send("Error updating bookings");
        }
        res.send("Bookings updated successfully");
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});