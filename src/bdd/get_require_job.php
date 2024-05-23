<?php
include 'config.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

if (isset($_GET['idJobs']) && is_string($_GET['idJobs'])) {
    $idJobs = intval($_GET['idJobs']);

    $stmt = $conn->prepare("SELECT * FROM jobRequirement WHERE idJobs = ?");
    $stmt->bind_param("i", $idJobs);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        echo json_encode($row);
    } else {
        echo json_encode(["error" => "User not found"]); 
    }

    $stmt->close();
} else {
    http_response_code(400);
    echo json_encode(["error" => "Invalid profile ID"]);
}

$conn->close();
?>