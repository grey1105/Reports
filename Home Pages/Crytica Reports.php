<!--Current Homepage -->
<?php  
      
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <!-- Required meta tags for HTML -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=yes">
        <!-- JQuery -->
        <link href = "https://code.jquery.com/ui/1.10.4/themes/ui-lightness/jquery-ui.css" rel = "stylesheet">
        <script src = "https://code.jquery.com/jquery-1.10.2.js"></script>
        <script src = "https://code.jquery.com/ui/1.10.4/jquery-ui.js"></script>
        <!-- Need the js after the jquery -->
        <script src="http://75.140.40.245:5480/reports/bootstrap.bundle.min.js"></script>
        <!-- Bootstrap and CSS location please note that localhost was used as a path as this is in a XAMPP Env -->
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">
        <!-- Report Scripts -->
        <script type="text/javascript"  src="http://75.140.40.245:5480/reports/ReportScripts.js"></script>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/css/bootstrap-select.min.css">
        <!-- Latest compiled and minified JavaScript -->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/js/bootstrap-select.min.js"></script>
        <!-- Style Sheet for CSS location -->
        <link rel="stylesheet" href="http://75.140.40.245:5480/reports/crytica.css?v=1.0">
        <!-- This is for the calendar to display which date has data -->
        <style>
        
            
        </style>  
    </head>
  
    <body id="gray-bg" onload="renderScanChart()">
        
        <div class="d-flex flex-row justify-content-between">
            <!-- ############################## Nav  ##################################### -->
            <img class="mx-3 my-3 " src="http://75.140.40.245:5480/cs.png" width="100vw"/>
            <h1 class="d-flex align-items-center"> Audit Ledger Reports<span><h6>(Kronos Server)</h6></span></h1>
            <div class="d-flex align-items-center"  style="display:none;"> 
                <button type ="button" class="btn btn-primary py-3 mx-3" onclick="clearReport()" style="display:none;" id="clearButton"> 
                    Clear Report 
                </button>
            </div>
        </div>
        <!-- ############################## Charts  ##################################### -->
        <div class="d-flex" id="charts">
            <div class="container text-center">
                <h4>Scan Time Chart</h4>
                <canvas id="scanTime"></canvas>
                <p>Average Scan Times given the following dates. </p>
            </div>
            <div class="container text-center">
                <h4> Transmission Time Chart</h4>
                <canvas id="transmission"></canvas>
                <p>Average Transmission Time from completed scan to notification</p>
            </div>
        </div>
        
        <div class="text-center card d-flex flex-row justify-content-center py-5">
            <!-- gets a count of the amount of scans -->
            <div>
                <h4>Current Scans:</h4>
                <h3 id="count">
            </div>
            <!-- ############################## Choose a date ##################################### -->
            <div class="px-3 py-4">
                <p>Available Dates: <input type = "text" id ="datepicker"></p> 
            </div> 
            <!-- ############################## Choose a Time ##################################### -->       
            <div class="dropdown px-3 py-3">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" 
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Choose a Time
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenu2" id="dropDownSelection">
                
                </div>
            </div>
            
            <!-- ############################## Choose a report ##################################### -->
            <div class="dropdown px-3 py-3">
                <button class="btn btn-secondary dropdown-toggle " type="button" id="dropdownMenu2" 
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Choose a Report
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                    <button type="button" class="dropdown-item" onclick="getReportQuery(1)">Scan Time Report</button>
                    <button type="button" class="dropdown-item" onclick="getReportQuery(2)">Transmission Time Report</button>
                    <button type="button" class="dropdown-item" onclick="getReportQuery(3)">Crytica Standard Report</button>
                    <button type="button" class="dropdown-item" onclick="getReportQuery(4)">State-Change Notification Report</button>
                    <button type="button" class="dropdown-item" onclick="getReportQuery(5)">State-Change Notification Report (CS)</button>
                    <button type="button" class="dropdown-item" onclick="getReportQuery(6)">Alert Specific Report</button>
                </div>
            </div>
            <!-- ############################## Create Report ##################################### -->
            <div class="px-3 py-3">
                <button type ="button" class="btn btn-primary" onclick="getReport()"> Build Report</button>
            </div> 
        </div>
        <!-- ############################## Reports Rendered Here ##################################### -->
        <div class="my-3"> 
            <h3 class="text-center py-3" id="report-name"></h3>
            <h5 class="text-center px-2" id="dateTime"></h3>
        <div class ="container">
        <!-- Generate Report here -->
            <div id="report">
                <!--render -->
            </div>
        </div>
        <!-- ############################## Next and Prev Buttons ##################################### -->
        <div class="container d-flex-row justify-content-around text-center" id="dateButtons" style="display:none;">
            <button type ="button" class="btn btn-primary" onclick="prevTimes()" id="prevTimeButton"> Prev </button>
            <button type ="button" class="btn btn-primary" onclick="nextTimes()" id="nextTimeButton"> Next </button>
        </div>
        <!-- ############################## JS Script ##################################### -->
        <script src="http://75.140.40.245:5480/reports/testingTimes.js"></script>
        <!-- Calendar Scripts -->
        <script src="http://75.140.40.245:5480/reports/calendarScripts.js"></script> 
        <!-- Moment.js -->
        <script src="http://75.140.40.245:5480/reports/moment.min.js"></script> 
        <!-- Chart Scripts -->
        <script src="http://75.140.40.245:5480/reports/queryToChart.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.js"></script>  
    </body>
</html>