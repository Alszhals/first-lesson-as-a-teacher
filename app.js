//no es6 for now
/*
TODO
1) format timer (large countdown text, nicer date format, add event name, organizer)
2) on complete, show message
3) add complete style options (fireworks, 'meltdown', snake?)
*/
var yearOptions = [];
var currentYear = new Date().getFullYear();
for (var i = currentYear; i <= currentYear + 50; i += 1) {
  yearOptions.push({
    title: i,
    value: i
  });
}
var monthOptions = [];
for (var i = 1; i <= 12; i += 1) {
  var monthNameMatrix = {
    1: 'January', 2: 'February', 3: 'March', 4: 'April', 5: 'May', 6: 'June', 7: 'July', 8: 'August', 9: 'September', 10: 'October', 11: 'November', 12: 'December'
  };
  monthOptions.push({
    title: monthNameMatrix[i],
    value: i
  });
}
var dayOptions = [];
for (var i = 1; i <= 31; i += 1) {
  dayOptions.push({
    title: i,
    value: i
  });
}
var hourOptions = [];
for (var i = 0; i <= 24; i += 1) {
  if(i === 0) {
    hourOptions.push({ title: 'Midnight', value: i });
  } else if(i < 12) {
    hourOptions.push({ title: i + 'am', value: i });
  } else if(i === 12) {
    hourOptions.push({ title: 'Noon', value: i });
  } else {
    hourOptions.push({ title: i - 12 + 'pm', value: i });
  }
}
var timeOptions = [];
for (var i = 0; i <= 59; i += 1) {
  timeOptions.push({
    title: i,
    value: i
  });
}

(function() {
  'use strict';
  //buttons
  var start = document.querySelector('#go');
  var cancel = document.querySelector('#cancel');
  var clear = document.querySelector('#clear');
  
  //main divs (show/hide)
  var setupView = document.querySelector('#setup');
  var timerView = document.querySelector('#countdown');
  
  //display divs
  var eventNameDisplay = document.querySelector('#event-name-display');
  var eventOrganizerDisplay = document.querySelector('#event-organizer-display');
  var eventCompleteDisplay = document.querySelector('#event-complete-display');
  var eventInProgress = document.querySelector('#event-in-progress');
  
  //inputs
  var eventName = document.querySelector('[name=event-name]');
  var eventCompleteMsg = document.querySelector('[name=event-complete-msg]');
  var eventOrganizer = document.querySelector('[name=event-organizer]');
  var secondInput = document.querySelector('[name=second]');
  var minuteInput = document.querySelector('[name=minute]');
  var hourInput = document.querySelector('[name=hour]');
  var dayInput = document.querySelector('[name=day]');
  var monthInput = document.querySelector('[name=month]');
  var yearInput = document.querySelector('[name=year]');
  
  //sharable handlers
  var timerHandle, cancelHandler;

  function countdownClock() {
    var display = document.querySelector('#clock');
    var endDateDisplay = document.querySelector('#end-date');
    var end = new Date(yearInput.value, (+monthInput.value - 1), dayInput.value, hourInput.value, minuteInput.value, secondInput.value);

    function tick() {
      var now = new Date();
      var remainingMilliseconds = end - now;

      if (remainingMilliseconds <= 1000) {
        clearInterval(timerHandle);
        timerHandle = null;
        clock.innerHTML = 'COMPLETE';
        eventInProgress.classList.add('hidden');
        eventCompleteDisplay.innerHTML = eventCompleteMsg.value;
        eventCompleteDisplay.classList.remove('hidden');
        return;
      }

      endDateDisplay.innerHTML = end;

      var remainingSeconds = Math.floor(remainingMilliseconds / 1000);
      var remainingMinutes = Math.floor(remainingMilliseconds / (1000 * 60));
      var remainingHours = Math.floor(remainingMilliseconds / (1000 * 60 * 60));
      var remainingDays = Math.floor(remainingMilliseconds / (1000 * 60 * 60 * 24));

      var displayHours = remainingHours - (remainingDays * 24);
      var finalHours = displayHours > 9 ? displayHours : '0' + displayHours;

      var displayMinutes = remainingMinutes - (remainingHours * 60);
      var finalMinutes = displayMinutes > 9 ? displayMinutes : '0' + displayMinutes;

      var displaySeconds = remainingSeconds - (remainingMinutes * 60);
      var finalSeconds = displaySeconds > 9 ? displaySeconds : '0' + displaySeconds;
      
      var dayOrDays = remainingDays === 1 ? 'day' : 'days';
      var hourOrHours = displayHours === 1 ? 'hour' : 'hours';
      var minuteOrMinutes = displayMinutes === 1 ? 'minute' : 'minutes';
      var secondOrSeconds = displaySeconds === 1 ? 'second' : 'seconds';
      
      eventNameDisplay.innerHTML = eventName.value;
      eventOrganizerDisplay.innerHTML = `Created By: ${eventOrganizer.value}`;

      clock.innerHTML = remainingDays + ' ' + dayOrDays + ' ' + finalHours + ' ' + hourOrHours + ' ' + finalMinutes + ' ' + minuteOrMinutes + ' ' + finalSeconds + ' ' + secondOrSeconds + ' remaining until...';
    }

    timerHandle = setInterval(tick, 1000);
    console.log(yearInput.value);
    timerView.classList.remove('hidden');

    cancelHandler = clear.addEventListener('click', clearTimer, false);
  }

  function clearTimer() {
    clearInterval(timerHandle);
    timerHandle = null;
    resetForm();
    eventNameDisplay.innerHTML = '';
    eventOrganizerDisplay.innerHTML = '';
    clear.removeEventListener('click', cancelHandler);
    timerView.classList.add('hidden');
    eventInProgress.classList.remove('hidden');
    eventCompleteDisplay.innerHTML = '';
    eventCompleteDisplay.classList.add('hidden');
  }
  
  function resetForm() {
    eventName.value = '';
    eventCompleteMsg.value = '';
    eventOrganizer.value = '';
    dayInput.value = 1;
    monthInput.value = 1;
    yearInput.value = currentYear;
    hourInput.value = 0;
    minuteInput.value = 0;
    secondInput.value = 0;
    eventName.focus();
  }

  function setupSelectOptions(selectElement, optionsArray) {
    optionsArray.forEach(function(option) {
      var o = document.createElement('option');
      o.value = option.value;
      o.text = option.title;
      selectElement.add(o, null);
    })
  }
  setupSelectOptions(dayInput, dayOptions);
  setupSelectOptions(monthInput, monthOptions);
  setupSelectOptions(yearInput, yearOptions);
  setupSelectOptions(hourInput, hourOptions);
  setupSelectOptions(minuteInput, timeOptions);
  setupSelectOptions(secondInput, timeOptions);

  start.addEventListener('click', countdownClock, false);
  cancel.addEventListener('click', resetForm, false);
})();