//Get a JSON of an array of times given a date

// IN: A date to do a query on
// OUT: Array of Date and times together
// Step 1: Get a list of dates with time
function getTimesArray(date)
{
    let query ='select scan_date from cs_audit.v_alert_log where DATE(scan_date)=" '+ date + '";';
    let timesArr = [];
    let chunk=[];
    $.post("http://75.140.40.245:5480/reports/getQueryData.php", {query:query})
    .done(function(data) {
        //convert to JSON'
        var uniqueDates = JSON.parse(data);
        //console.log("unique Dates from calendarScripts: " + data)
        for(var i =0; i < uniqueDates.length; i++ ){
            // we want to slice the array later, so for now we want the date as well.
            timesArr.push(uniqueDates[i].scan_date);
        } 
        chunk = chunkTimes(timesArr);
       $("#dropDownSelection").empty();
        loadTimeChunks(chunk);
    });
}
 
//Step 2: Add 15 min to a date
function addMinutes(datetime)
{
    var newDateObj = moment(datetime).add(15, 'm').format('YYYY-MM-DD HH:mm:ss');
    //console.log("new Time: " + newDateObj);
    return newDateObj;
}


function chunkTimes(timeArr)
{
    var endTime = addMinutes(timeArr[0]);
    var chunkedArr = [];
    var a =0;
    var temp =[];
    //console.log("function data" + timeArr)
    //console.log(endTime);
    for(let i =0; i <= timeArr.length; i++)
    {
        if (timeArr[i] <= endTime)
        {
            temp.unshift(timeArr[i]);
            
        }
        else
        {
            chunkedArr[a] = temp;
            endTime = addMinutes(timeArr[i]);
            a++;
            temp =[];
            temp.unshift(timeArr[i]);
        }  
    }
    //console.log("chunkedArr" + chunkedArr);
    return chunkedArr;
}


function loadTimeChunks(arr)
{
    // Hello from loadTimeChunks test
    //console.log("Hello from loadTimeChunks test, here is the data: " + arr);
    for(let i=0; i < arr.length; i++)
    {
        
        var button = document.createElement("input");
        button.type ='button';
        button.value = "from " + arr[i][arr[i].length -1 ] + " to " + arr[i][0];
        button.className = "dropdown-item";
        button.id = "button" + i.toString();
        button.onclick = function()
        {
            const str = arr[i][arr[i].length -1 ] + "," + arr[i][0];
            console.log("from " + button.id);
            //console.llet str = arr[i][arr[i].length -1 ]+ "," + arr[i][0];og("here is the arr" + arr[i]);
            getReportTimes(str);
            // send the arr and i to the next and prev buttons
            getTimeArrayWithIndex(arr, i);
            
        };
        
        $("#dropDownSelection").append(button);
        
    }
}



// **************************************************************************************************************
//Unit Testing

//Testing get Times Array 
//getTimesArray('2020-05-27');

let arr =["2020-05-27 11:53:09",
    "2020-05-27 11:59:57",
    "2020-05-27 12:02:26",
    "2020-05-27 12:03:48",
    "2020-05-27 12:05:40",
    "2020-05-27 12:11:49",
    "2020-05-27 12:12:49"];


//let arr2 = chunkTimes(arr);
//console.log("Given this array " + arr + " this is the result " + arr2[1]);
//loadTimeChunks(arr2);
//console.log("global: " + global);
/*
if ('2020-06-08 03:10:20' > value )
{
    console.log("true:  2020-06-08 03:10:20 > " +  value  );
}
else{
    console.log("false:  2020-06-08 03:10:20 > " +  value  );
}
*/