 //////////////////////////// RENDER THE CALENDAR //////////////////////////////////////
///////////////////////////   Step 1: Get the array of dates /////////////////////////
// This is where my dates are highlighted 
// var report dates is loaded and called once index.php is called 
let datesArr = [];
function getUniqueDates(){
    let query ="SELECT DISTINCT DATE(scan_date) as date from cs_audit.alert_log";
    
    $.post("http://75.140.40.245:5480/reports/getQueryData.php", {query:query})
     .done(function(data) {
        //convert to JSON
         
        var uniqueDates = JSON.parse(data);
        //console.log("unique Dates from calendarScripts: " + data)
        for(var i =0; i < uniqueDates.length; i++ ){
            
            datesArr.push(datePickerFormat(uniqueDates[i].date));
            
        } 
        
    });
} 
//////////////////////////////////////////////////////////////////////////////////////

$(function() {
    getUniqueDates();
    $("#datepicker").datepicker({
 
        beforeShowDay: highlightDays,
        showOtherMonths: true,
        numberOfMonths: 1,

    });
     // when the date is selected create a place to store it 
    $("#datepicker").on("change",function(){
        var selected = $(this).val();
        date = dateDBFormat(selected);
        console.log(date);
        getTimesArray(date);
    });
     //Highlight the dates given the string.
    function highlightDays(date) {

        for (var i = 0; i < datesArr.length; i++) {
            if (new Date(datesArr[i]).toString() == date.toString()) {              
                return [true, 'event', "I have data!"];
            }
        }

        return [true, ''];

    } 
     
});

function datePickerFormat(date){
    // date will be 2020-05-22
    // so yyyy-mm-dd 
     
    let tempDate = date.split('-');
    //console.log(tempDate);
    //so temp = [0]=yyyy
    //          [1]= mm
    //          [2]= dd
    // we want mm/dd/yyyy
    return newDate = tempDate[1] + "/" + tempDate[2] + "/" + tempDate[0];
}
//console.log("This is testing date: 2020-05-22 converted to  " + datePickerFormat("2020-05-22"));
function dateDBFormat(date){
    // date will be 05/22/2020
    // so mm/dd/yyyy
     
    var tempDate = date.split('/');
     
    return newDate = tempDate[2] + "-" + tempDate[0] + "-" + tempDate[1];
}
 
 