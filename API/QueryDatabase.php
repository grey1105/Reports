
<?php
   //Here is my function to query the DB
   //$Date is the date of the report ex of a hard coded date 2001-02-03
   // Filter on time every 15 min
   // Filter Time and date, with a limit of 15 min at a time 
   //$reportName ="";
   // Rev 4 by GR 7-25-2020
   // v6 by GR 
   // 11-18-2020 ADD
   // variable to function to accept a server IP and port
   // allow to connect to another remote server
   function query_DB($queryParams,$date, $time)
   {
      $dbc = new mysqli('server_IP', 'user', 'password');
      // Check connection
      if ($dbc->connect_error) 
      {
         die("Connection failed: " . $dbc->connect_error);
      }
      // 11-18-2020 create a DB name so that it can reference another remote DB
      $startofString = "SELECT ";
      $fromDB = " FROM cs_audit.v_alert_log ";
      $times = explode(",",$time);
      $timeDiff = 'Between"' . $times[0] . '" AND "'. $times[1] . '"';
      $where = "WHERE scan_date ". $timeDiff; 
        

      $concatDB = $startofString . convertToDBparams($queryParams) . $fromDB . $where;
      // Split the query parameters into a params array

      //$params = explode(",",$queryParams);

      
      
      // My bug begins here, becaus I am calling datediff(blah, blah)
      // we have a comma!
      $paramNames = getNames($queryParams);
      //clear out any empty array elements
      array_filter($paramNames);

      

      $response = @mysqli_query($dbc,$concatDB);
      $fullReport ="";
      if($response)
      {
         $header_of_Report = '<div class="container text-center">
                <table class="table table-dark">
                <thead>
                <tr>
        
                <th scope="col">#</th>
         ';
            
         for ($i = 0; $i < count($paramNames); $i++)
         {
	         $header_of_Report .= '<th scope="col">' . $paramNames[$i] . "</th>";
	            
         }
         //  Close the table headers for html
         $header_of_Report .= "</tr> </thead><tbody>";
         // This is for the table body

         $i = 1;
            
         $report ="";
         while($row = mysqli_fetch_array($response))
         {
            $report .= '<tr>'. 
            // Now we do the params 
            '<th scope="row">'. $i . '</th>';

                
            for($a = 0; $a < count($paramNames); $a++)
            {
               $report .= '<td>'. $row[$a] . '</td>';
            }
    
            $report .= '</tr>';
            $i++;
         }
         // Close the table body 
         $report .='</tbody></table></div>';

      }
      else
      {
         echo "Error with getting query from QueryDatabase.php";
      }
       
      $fullReport = $header_of_Report . $report;
      // Close the connection
      mysqli_close($dbc);
      echo $fullReport;
   }

   // Once we get query params and its not empty
   $query  = isset($_POST['query']) ? $_POST['query'] : null;
   $dt  = isset($_POST['dt']) ? $_POST['dt'] : null;
   $time  = isset($_POST['time']) ? $_POST['time'] : null;
   
   // Then we call our function
   if($query)
   {
      query_DB($query,$dt,$time);
   }

    
   function getNames($dbNames)
   {
      $temp = explode('.',$dbNames);
      $temp2 = array();
      for($i =0; $i < count($temp); $i++)
      {
         switch($temp[$i])
         {
            case "alert_id":
               $temp[$i] = "Alert ID";
            break;
            case "probe_id":
               $temp[$i] = "Probe ID";
            break;
            case "device_identifier":
               $temp[$i] = "MAC Address";
            break;
            case "scan_date":
               $temp[$i] = "Alert Scan Date";
            break;
            case "alert_process_date":
               $temp[$i] = "Alert Process Date";
            break;
            case "alert_notify_date":
               $temp[$i] = "Alert Notify Date";
            break;
            case "alert_acknowledge_date":
               $temp[$i] = "Alert Acknowledge Date";
            break;
            case "monitor_id":
               $temp[$i] = "Monitor ID";
            break;
            case "monitor_id":
               $temp[$i] = "Monitor ID";
            break;
            case "DATEDIFF(alert_process_date,scan_date)":
               $temp[$i] = "Scan Time";
            break;
            case "alert_time_diff":
               $temp[$i] = "Time Difference hh:mm:ss";
            break;
                 
            case "DATEDIFF(alert_notify_date,alert_process_date)":
               $temp[$i] = "Transmission Time";
            break;
            case "c":
               $temp[$i] = "Time Difference hh:mm:ss";
            break;
            default:
               $temp[$i] = $temp[$i];
            break;
         }
         //$temp2 .= $temp[$i]. ",";
      }
      return $temp;
   } 

   function convertToDBparams($names)
   {
      // For the sake of making this file/class
      // more polymorphic, we will take in different param_names
      // convert them from csv to 
      $temp = explode(".",$names);
      $dbStr = '';
      for ($i = 0; $i < count($temp); $i++)
      {
         if($i == count($temp) - 1)
         {
            $dbStr .= $temp[$i];
         }
         else
         {
            $dbStr .= $temp[$i] .',';
         }
        
      }
      return $dbStr;
   } 

   //Testing s
?>


