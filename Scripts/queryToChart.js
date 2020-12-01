//Chart #1

function renderChart(data, labels, id, chartName,chart) {
    var ctx = document.getElementById(id).getContext('2d');
    var myChart = new Chart(ctx, {
        type: chart,
        data: {
            labels: labels,
            datasets: [{
                label: chartName,
                //#000080
                //old #49e2ff
                backgroundColor: "#3e95cd",
                borderColor: '#46d5f1',
                //#CCCCCCC
                hoverBackgroundColor: '#000080',
                hoverBorderColor: '#666666',
                
                data: data,
            }]
        },
        options: {            
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        
                    }
                }]                
            }
        },
    });
}

function getData(query,id,name,chart){
        
    //console.log(reportDates);
    $.post("http://75.140.40.245:5480/reports/getQueryData.php", {query:query})
    .done(function( data ) {
        //console.log(data);
        var myData = JSON.parse(data);
        var labels = [];
        var values =[];
        for (var i=0; i< myData.length; i++) {
                try{
                    if(myData[i].date != '2001-02-03'){
                        labels.push(datePickerFormat(myData[i].date.slice(0,10)));
                        values.push(Math.abs(myData[i]['param2']));
                    }
                }
                catch {
                    console.log('error at i = ' + i);
                }   
        }
        //console.log("dates seperated=" + labels);
        //console.log("The values=" + values);
        renderChart(values,labels,id,name,chart);

    });
}

function renderScanChart(){
    // Given Distinc dates, we get their datediff and output as param2
    sql = "SELECT DISTINCT DATE(scan_date) as date, DATEDIFF(alert_process_date,scan_date) as param2 from cs_audit.v_alert_log";
    id = "scanTime";
    name = "Scan Time to Report by date";
    chart = 'bar';
    getData(sql,id,name,chart);
    renderTransmissionChart();
    getDBCount();
}

function renderTransmissionChart(){
    sql = "SELECT DISTINCT DATE(scan_date) as date, DATEDIFF(alert_notify_date,alert_process_date) as param2 from cs_audit.v_alert_log";
    id = "transmission";
    name = "Transmission by date";
    chart = 'bar';
    getData(sql,id,name,chart);
}

