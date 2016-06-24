// Notes from old app 
oneRep: 30,
  fullsound: new Howl({
    urls: ['fullsound.wav']
  }),
  midsound: new Howl({
    urls: ['midsound.wav']
  })
    if (workoutShout.seconds % workoutShout.oneRep === 0) {
      workoutShout.fullsound.play();
    } else if (workoutShout.seconds % (workoutShout.oneRep / 2) === 0) {
      workoutShout.midsound.play();
    }

// BMR Calc
$('#calc').click(
  function() {
    var bmr = 10 * 0.453592 * parseInt($('#weight').val()) + 6.25 * 2.54 * parseInt($('#height').val()) - 5 * 22 + 5;
    console.log(bmr);
    $('#bmr').html(bmr);
  }
);

