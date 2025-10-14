<html>
<head>
    <title>Display rercords</title>
</head>
<body>
<table border="3" >

<tr>
    <th>S.No.</th>
    <th>Name</th>
    <th>Student_id</th>
    <th>Email</th>
    <th>Phone no.</th>
    <th>Bus route</th>
    <th>Address</th>
</tr>


<?php
error_reporting(0);

include("register.php");

$query = "SELECT * FROM students";
$data = mysqli_query($con, $query);
$total = mysqli_num_rows($data);
$result = mysqli_fetch_assoc($data);

if($total !=0)
{
    $result = mysqli_fetch_assoc($data);
    while($result = mysqli_fetch_assoc($data))
    {
        echo "
        <tr>
            <td>".$result['id']."</td>
            <td>".$result['name']."</td>
            <td>".$result['student_id']."</td>
            <td>".$result['email']."</td>
            <td>".$result['phone']."</td>
            <td>".$result['route']."</td>
            <td>".$result['address']."</td>
        </tr>
        ";
    }

}
else
{
    echo "No records found";
}

?>

</table>
</body>
</html>
