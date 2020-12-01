// From step 1 we choose a date, the date is then saved in a variable 
// this will later be outputted to a query.
// 7-18-2020 Rev 3 by GR
//7-24-2020 Rev 4 by GR
//8-13-2020 Rev 5

let date;
let report;
let reportName;
let reportQuery;
let reportTime;
const serverPathQuery ="http://75.140.40.245:5480/reports/QueryDatabase.php";
const serverPathTime ="http://75.140.40.245:5480/reports/getTimes.php";
let timeArray;
let timeIndex;

// Once clicked the report buttons, call this function to 
// get the inner text and select the search query for the DB
function getReportQuery(elem)
{
    
    var txt = elem.textContent || elem.innerText;
    report = txt;
    //console.log(reportName);
    
    switch(elem)
    {
        case 1:
            // Missing scan complete date
            // 11-16y-2020 device_identifier not found on v_alert_log
            reportQuery = 'alert_id.probe_id.scan_date.alert_process_date.DATEDIFF(alert_process_date,scan_date).DATEDIFF(alert_notify_date,alert_process_date)';
            reportName ="Scan Time Report";
            console.log(reportName);
            break;
        case 2:
            // missing scan_start_trans_date = alert_notify_date
            // scan_received_trans_date = alert_acknowledge_date
            // calculation scan_transmit_time
            reportQuery = "alert_id.probe_id.device_id.alert_notify_date.alert_acknowledge_date";
            reportName ="Transmission Report";
            break;
        case 3:
            // missing scan_start_compare_date
            // scan_completed_compare_date
            // Calculation    scan_compare_time
            
            reportQuery = "alert_id.probe_id.device_id.monitor_id";
            reportName ="Gold Standard Comparison";
            break;
        case 4:
            // alert_compare_date
            // Calculation scan2notify_time
            // Calculation scan2notify_time
            reportQuery = "alert_id.probe_id.device_id.alert_notify_date";
            reportName="State Change-Notification Report";
            break;
        case 5:
            // Calculation Totalscan2notify_time
            reportQuery = "alert_id.probe_id.device_id.scan_date.alert_notify_date";
            reportName="State Change-Notification Report";
            break;
        case 6:
            reportQuery = "probe_id.monitor_id.alert_id.element_name.scan_date.alert_process_date";
            reportName="Alert Specific Report";
        default:
        break;
        
            
    }
}
/// Clears Report Data and globals to restart a new report
function clearReport()
{
    //reportQuery ="";
    // $('report').remove();
    reportQuery ="";
    date ="";
    reportTime ="";
    // console.log('hello');
   //alert("alert acticated!");
    document.getElementById("report").innerHTML = "";
    document.getElementById("report-name").innerHTML = "";
    //reportCard.style.display ="block";
    dateButtons.style.display ="none";
    clearButton.style.display ="none";
    dateTime.style.display="none";
    charts.style.display ="block";
    $('#scanTime').show();
    $('#transmission').show();
    
}

/// Checks to make sure globals contain data and if so, 
/// calls for report to get rendered
function getReport()
{
    
    // Jquery to get date from the php file sending 2 params of data.
    //change localPathQery to Server if working on linux(Hermes) server.
     // Hide the cards that display the report fields.
    // The heading of the reportName is updated based on pressed button
    // Ditto for report, the report gets displayed with data coming from jquery.
    if(reportTime == undefined)
    {
        alert("Please Select a Time");
    }
    else if(reportName == undefined){
        alert("Please Select a Report");
    }
    else if(date == undefined){
        alert("Please Select a Date");
    }
    else
    {
        //$('#charts').hide();
        $('#scanTime').hide();
        $('#transmission').hide();
        $('#charts').hide();
        //generateReport();
        //TESTING NEW JS CODE THIS IS PHP RENDERING REPORT
        $.post(serverPathQuery, {query:reportQuery, dt:date, time:reportTime})
        .done(function(data) 
        {
            //reportCard.style.display ="none";
            document.getElementById("report-name").innerHTML = reportName;
            document.getElementById("report").innerHTML = data;
            clearButton.style.display = "block";
            
            dateButtons.style.display = "block";  
            //displayTimeButtons();
            if(timeArray.length <= 1 )
            {
                nextTimeButton.style.display = "none";
                prevTimeButton.style.display = "none";
            }
            else
            {
                nextTimeButton.style.display = "block";
                prevTimeButton.style.display = "block";
            }
        });
        
    }
            
}  
/// Gets the report chunk clicked event from chunk times function
/// sets it to global
function getReportTimes(chunk)
{
    reportTime = chunk;
}
/// Once we get the clicked time chunk we load this to our globals
function getTimeArrayWithIndex(timeArr, index)
{
    //to global 
    timeArray = timeArr;
    timeIndex = index;
}
/// Loads a previous chunk of times report
function prevTimes()
{
    
    if(timeIndex > 0)
    {
        timeIndex--;
        newTime = timeArray[timeIndex][timeArray[timeIndex].length -1 ] + "," + timeArray[timeIndex][0];
        $.post(serverPathQuery, {query:reportQuery, dt:date, time:newTime})
        .done(function(data) 
        {
            $("#report").empty();
            //reportCard.style.display ="none";
            document.getElementById("report-name").innerHTML = reportName;
            document.getElementById("report").innerHTML = data;
            displayTimeButtons();
            if(timeIndex == 0)
            {
                //prevTimeButton.style.display = "none";
            }
        });
    }

}
/// Loads the next chunk of time report.
function nextTimes()
{
    console.log("time in memory: " + timeArray + "index = :" + timeIndex);
    
    if( timeIndex < timeArray.length)
    {
        timeIndex++;
        newTime = timeArray[timeIndex][timeArray[timeIndex].length -1 ] + "," + timeArray[timeIndex][0];
        $.post(serverPathQuery, {query:reportQuery, dt:date, time:newTime})
        .done(function(data) 
        {
            $("#report").empty();
            //reportCard.style.display ="none";
            document.getElementById("report-name").innerHTML = reportName;
            document.getElementById("report").innerHTML = data;
            displayTimeButtons();
            if( timeIndex == timeArray.length -1)
            {
                //nextTimeButton.style.display = "none";
            }
        });
    } 
}
function displayTimeButtons()
{
    if (timeArray == undefined || timeArray.length <= 1)
    {
        nextTimeButton.style.display = "none";
        prevTimeButton.style.display = "none";
    }
    else if(timeIndex >= 0 && timeIndex <= timeArray.length)
    {
        nextTimeButton.style.display = "block";
    }
    else if(timeIndex >= 0 && timeIndex <= timeArray.length)
    {
        prevTimeButton.style.display = "block";
    }
    else
    {
        nextTimeButton.style.display = "block";
        prevTimeButton.style.display = "block";
    }
}
/// Summary:
// Gets the current # of scans in the DB. 
function getDBCount()
{
    let query ='select count(*) count from cs_audit.alert_log;';
    $.post("http://75.140.40.245:5480/reports/getQueryData.php", {query:query})
    .done(function(data) 
    {
        var count = JSON.parse(data);
        document.getElementById("count").innerHTML = count[0].count;
    });
}