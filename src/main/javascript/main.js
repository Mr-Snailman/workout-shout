var workoutShout = {
  oneRep: 30,
  timerObj:null,
  seconds: 0,
  minutes: 0,
  hours: 0,
  fullsound: new Howl({
    urls: ['fullsound.wav']
  }),
  midsound: new Howl({
    urls: ['midsound.wav']
  })
};

function add() {
    if (workoutShout.seconds % workoutShout.oneRep === 0) {
      workoutShout.fullsound.play();
    } else if (workoutShout.seconds % (workoutShout.oneRep / 2) === 0) {
      workoutShout.midsound.play();
    }

    workoutShout.seconds++;

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

$(document).ready(function() {
  //timer();
  reset();
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

