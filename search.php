<html>
<head>
    <title>Display Records</title>
</head>
<body>
<table border="3" >

<tr>
    <th>S.No.</th>
    <th>Name</th>
    <th>College Email</th>
    <th>AFN/Roll No.</th>
    <th>Phone no.</th>
    <th>Role</th>
    <th>Bus No.</th>
</tr>

<?php
error_reporting(E_ALL);
include("register.php");

$query = "SELECT * FROM students";
$data = mysqli_query($con, $query);
$total = mysqli_num_rows($data);

if($total != 0) {
    while($result = mysqli_fetch_assoc($data)) {
        echo "
        <tr>
            <td>".$result['id']."</td>
            <td>".$result['name']."</td>
            <td>".$result['email']."</td>
            <td>".$result['afn_roll_number']."</td>
            <td>".$result['phone']."</td>
            <td>".$result['role']."</td>
            <td>".$result['bus']."</td>
        </tr>
        ";
    }
} else {
    echo "<tr><td colspan='7'>No records found</td></tr>";
}

mysqli_close($con);
?>

</table>
</body>
</html>
