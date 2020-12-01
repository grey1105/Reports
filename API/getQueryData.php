<?php
  
    function getJSONData($myQuery)
    {
        $dbc = new mysqli('server_IP', 'userName', 'PASSWORD');
        $query = @mysqli_query($dbc,$myQuery);
        if ($dbc->connect_error) 
        {
            die("Connection failed: " . $dbc->connect_error);
        }
        if (!$query ) 
        {
            echo 'Error in Query, from queryToData.php';
            die;
        }
    
        $data = array();
    
        for ($x = 0; $x < mysqli_num_rows($query); $x++) 
        {
            $data[] = mysqli_fetch_assoc($query);
        }
    
        echo json_encode($data);     
     
        mysqli_close($dbc);
    }

    $query  = isset($_POST['query']) ? $_POST['query'] : null;
    if($query)
    {
        getJSONData($query);
    }
?>
