var workoutShout = {
  oneRep: 30,
  timerObj:null,
  seconds: 0,
  minutes: 0,
  hours: 0,
  sound: new Howl({
    urls: ['sound.wav']
  })
};

function add() {
    if (workoutShout.seconds % workoutShout.oneRep === 0) {
      workoutShout.sound.play();
    }

    workoutShout.seconds++;
    //console.log(workoutShout);

    if (workoutShout.seconds >= 60) {
      workoutShout.seconds = 0;
      workoutShout.minutes++;
      if (workoutShout.minutes >= 60) {
        workoutShout.minutes = 0;
        workoutShout.hours++;
      }
    }
    
    displayTime();
    timer();
  }

function displayTime() {
    var hours = workoutShout.hours, minutes = workoutShout.minutes, seconds = workoutShout.seconds;
    var prntStr = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" +
      (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + 
      (seconds ? (seconds > 9 ? seconds : "0" + seconds) : "00");

    $("#timer").html(prntStr);
  }

function timer() {
    workoutShout.timerObj = setTimeout(add, 1000);
}

function reset() {
    $("#timer").html("00:00:00");
    workoutShout.seconds = 0;
    workoutShout.minutes = 0;
    workoutShout.hours = 0;
}

var coffeeTracker = {
  url: "http://localhost:8080/js-frankenstein/rest/coffee",

  // Display previous coffee
  // Display time 
  setData: function (myCoffee) {
    $('#coffee-name').html(myCoffee.name);
    $('#coffee-time').html(myCoffee.time);
  }
};

$(document).ready(function() {
  //timer();
  reset();

  var jqxhr = $.get(coffeeTracker.url, function(data){
      coffeeTracker.setData(data);
    }, "json");
});


$('#reset').click(
  function() {
    reset();
  }
);

$('#start').click(
  function() {
    timer();
  }
);

$('#stop').click(
  function() {
    clearInterval(workoutShout.timerObj);
  }
);

// BMR Calc
$('#calc').click(
  function() {
    var bmr = 10 * 0.453592 * parseInt($('#weight').val()) + 6.25 * 2.54 * parseInt($('#height').val()) - 5 * 22 + 5;
    console.log(bmr);
    $('#bmr').html(bmr);
  }
);

// Updates the coffee held in the database.
$('#coffee').click(
  function() {
    var newCoffee = {};
    newCoffee.name = $('#newName').val();
    newCoffee.time = $('#newTime').val();

    $.ajax({
      url: coffeeTracker.url,
      method: 'PUT',
      data: JSON.stringify(newCoffee),
      dataType: 'json',
      contentType: 'application/json',
      success: function(data) {
        coffeeTracker.setData(data);
      }
    });
  }
);

