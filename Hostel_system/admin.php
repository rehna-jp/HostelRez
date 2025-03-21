
<?php
session_start();

// Redirect if not logged in
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header("Location: login.php");
    exit();
}

// Database connection
$conn = new mysqli("localhost", "root", "", "hostel_db");
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle validation actions
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['reservation_id'])) {
    $reservation_id = $_POST['reservation_id'];
    $new_status = $_POST['status'];

    // Update reservation status
    $sql = "UPDATE reservations SET status='$new_status' WHERE id='$reservation_id'";
    $conn->query($sql);
}

// Fetch reservations
$sql = "SELECT * FROM reservations ORDER BY check_in ASC";
$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard - Validate Reservations</title>
    <link rel="stylesheet" href="styles.css">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            text-align: center;
        }
        table {
            width: 90%;
            margin: 20px auto;
            border-collapse: collapse;
            background: white;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        th, td {
            padding: 10px;
            border: 1px solid #ddd;
            text-align: left;
        }
        th {
            background: #007bff;
            color: white;
        }
        .approved { color: green; font-weight: bold; }
        .rejected { color: red; font-weight: bold; }
        .pending { color: orange; font-weight: bold; }
        form {
            display: inline-block;
            margin: 0;
        }
        button {
            border: none;
            padding: 8px 12px;
            cursor: pointer;
            border-radius: 5px;
            color: white;
        }
        .approve { background: green; }
        .reject { background: red; }
        .approve:hover { background: darkgreen; }
        .reject:hover { background: darkred; }
    </style>
</head>
<body>

    <h2>Admin Dashboard - Validate Reservations</h2>

    <table>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Check-in</th>
            <th>Check-out</th>
            <th>Room Type</th>
            <th>Status</th>
            <th>Action</th>
        </tr>
        <?php
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $status_class = strtolower($row['status']);
                echo "<tr>
                        <td>{$row['id']}</td>
                        <td>{$row['name']}</td>
                        <td>{$row['email']}</td>
                        <td>{$row['check_in']}</td>
                        <td>{$row['check_out']}</td>
                        <td>{$row['room_type']}</td>
                        <td class='$status_class'>{$row['status']}</td>
                        <td>
                            <form method='POST'>
                                <input type='hidden' name='reservation_id' value='{$row['id']}'>
                                <button type='submit' name='status' value='Approved' class='approve'>Approve</button>
                                <button type='submit' name='status' value='Rejected' class='reject'>Reject</button>
                            </form>
                        </td>
                    </tr>";
            }
        } else {
            echo "<tr><td colspan='8'>No reservations found</td></tr>";
        }
        ?>
    </table>

    <a href="logout.php" class="logout-btn">Logout</a>

</body>
</html>

<?php
$conn->close();
?>
