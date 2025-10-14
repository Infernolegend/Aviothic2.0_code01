<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$con = mysqli_connect('localhost','root','639277','college_student');

if (!$con) {
    die("Database connection failed: " . mysqli_connect_error());
}

if (isset($_POST['sb'])) 
{
    $sname = $_POST['name'];
    $stud_id = $_POST['student_id'];
    $mail = $_POST['email'];
    $phone_no = $_POST['phone'];
    $bus_route = $_POST['route'];
    $stud_address = $_POST['address'];

    $query = "INSERT INTO students(name, student_id, email, phone, route, address)
              VALUES('$sname', '$stud_id', '$mail', '$phone_no', '$bus_route', '$stud_address')";

    $run = mysqli_query($con, $query);

    if ($run) {
        echo "✅ Data inserted successfully!";
    } else {
        echo "❌ Error inserting data: " . mysqli_error($con);
    }
}
?>
