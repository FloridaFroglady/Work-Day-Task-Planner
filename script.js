// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  //use day.js to get the current hour
  var time = dayjs().hour();
  //create divs for each hour and label them with the iterator and correct AM or PM designation
  for (var i = 9; i < 18; i++) {
    if (i < 12) {
      x = i + "AM"
      } else if (i === 12) {
      x = i + "PM" }
      else{
      x = (i - 12) + "PM"
      };
    //set a variable for the row divs, give them a class and an id that represents the string hour- plus the iterator, as in hour-9, hour-10, etc
    var rowEl = $("<div>").addClass("row time-block").attr("id","hour-" + i)
    //set a variable for the hour labels at the left end of the rows, create a div for each, a Bootstrap class to set the width relative to the screen size, center the text and set the text-content equal to the variable from the AM/PM conditional logic
    var hourEl = $("<div>").addClass("col-2 col-md-1 hour text-center py-3").text(x);
    //set a variable for the text area inside the rows, give it Bootstrap classes, make it the same height as each row and give it a class of description to allow the content to be read by local storage
    var textareaEl = $("<textarea>").addClass("col-8 col-md-10 description").attr("rows", "3").val(localStorage.getItem("hour-" + i));

    //use the time from day.js to set the class of each row to display the appropriate color for past, present, future times
      if (time === i) {
        rowEl.addClass("present");
      } else if (time > i) {
        rowEl.addClass("past");
      } else {
        rowEl.addClass("future");
      }

    //set a variable for the save button, give it Bootstrap classes, fontawesome classes and an onclick event handler 
    var buttonEl = $("<button>").addClass("btn saveBtn col-2 col-md-1 fas fa-save").on("click", function(){
      //use the id from the row the button is in--the button's parent element-- to set the value for the variable saveButton--whichever button is actually clicked becomes "this"
      var saveButton = $(this).parent().attr("id");
      //use the description class from the text area in each row, which is a sibling element to the saveButton in each row, to set the value for the variable "reminder" to the content of the text area
      var reminder = $(this).siblings(".description").val();
      //set the value of local storage for each button click to be "this" textarea content related to "this" button
      localStorage.setItem(saveButton, reminder);
    });
    //append the rows, hour labels, text areas and save buttons to the DOM
    $(".container-lg").append(rowEl.append(hourEl, textareaEl, buttonEl));

    }
    //use day.js to populate the element with the id "currentDay" with the actual date
    var date = dayjs().format("dddd MM/DD/YYYY") 
    document.getElementById("currentDay").textContent = date;


});
  
  
  
  
  
  
  
  
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.

