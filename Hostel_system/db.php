<?php
// Database connection settings
$host = "localhost";
$user = "root";  // Default XAMPP MySQL user
$password = "";  // Default XAMPP MySQL password (leave empty)
$database = "hostel_db";

// Create connection
$conn = new mysqli($host, $user, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = trim($_POST['name']);
    $email = trim($_POST['email']);
    $check_in = $_POST['check-in'];
    $check_out = $_POST['check-out'];
    $room_type = $_POST['room'];

    // Validate inputs
    if (empty($name) || empty($email) || empty($check_in) || empty($check_out) || empty($room_type)) {
        die("Please fill in all fields.");
    }

    // Prepare SQL statement
    $stmt = $conn->prepare("INSERT INTO reservations (name, email, check_in, check_out, room_type) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $name, $email, $check_in, $check_out, $room_type);

    // Execute and check if successful
    if ($stmt->execute()) {
        echo "<h2>Reservation Successful!</h2>";
        echo "<a href='index.html'>Go Back</a>";
    } else {
        echo "Error: " . $stmt->error;
    }

    // Close connection
    $stmt->close();
    $conn->close();
}
?>
