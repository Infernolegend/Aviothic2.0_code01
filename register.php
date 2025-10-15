<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// ✅ Database connection
$con = mysqli_connect('localhost', 'root', '639277', 'college_student');

if (!$con) {
    die("❌ Database connection failed: " . mysqli_connect_error());
}

// ✅ Check if form submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Collect form data
    $sname = $_POST['name'];
    $mail = $_POST['college_email'];
    $s_afn = $_POST['afn_roll_number'];  
    $phone_no = $_POST['phone_number'];
    $s_role = $_POST['role'];
    $select_bus = $_POST['bus'];

    $query = "INSERT INTO students (name, email, afn_roll_number, phone, role, bus)
              VALUES ('$sname', '$mail', '$s_afn', '$phone_no', '$s_role', '$select_bus')";

    $run = mysqli_query($con, $query);

    if ($run) {
        echo "<p style='color: green; font-weight: bold;'>✅ Data inserted successfully!</p>";
    } else {
        echo "<p style='color: red; font-weight: bold;'>❌ Error inserting data: " . mysqli_error($con) . "</p>";
    }
}
?>
