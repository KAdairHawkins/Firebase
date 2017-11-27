
$(document).ready(function(){
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAg_L55d3x0V7M8EMXkS3lCw_Nq0BPCL74",
    authDomain: "train-station-17885.firebaseapp.com",
    databaseURL: "https://train-station-17885.firebaseio.com",
    projectId: "train-station-17885",
    storageBucket: "train-station-17885.appspot.com",
    messagingSenderId: "416736636016"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  // On Click of Button
  $("#submit").on("click", function(event) {
    event.preventDefault();


    var trainName = $("#trainName").val().trim();
    var trainDestination = $("#trainDestination").val().trim();
    var trainTime = $("#trainTime").val().trim();
    var frequency = $("#frequency").val().trim();

    // First Time (pushed back 1 year to make sure it comes before current time)
    var trainTimeConverted = moment(trainTime, "hh:mm").subtract(1, "years");
    console.log(trainTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(trainTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    console.log(trainTime);

    console.log(trainTime);
    //  Store Click Data to Firebase in a JSON property called clickCount
    // Note how we are using the Firebase .set() method
    var newTrain = {
      name: trainName,
      destination: trainDestination,
      time: trainTime,
      frequency: frequency
    };

    database.ref().push(newTrain);

  });

  database.ref().on("child_added", function(childSnapshot) {

    // Log everything that's coming out of snapshot
    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().time);
    console.log(childSnapshot.val().frequency);

    var frequency = childSnapshot.val().frequency;
    var trainTime = childSnapshot.val().time;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var trainTimeConverted = moment(trainTime, "hh:mm").subtract(1, "years");
    //console.log(trainTimeConverted);

    // Current Time
    var currentTime = moment();
    //console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(trainTimeConverted), "minutes");
    //console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);


    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
    var arrivalTime = moment(nextTrain).format("hh:mm");
    //console.log(trainTime);
    console.log(tMinutesTillTrain);

    //console.log(trainTime);
    // Note how we are using the Firebase .set() method


    // full list of items to the well
    // $("#full-member-list").append("<div class='well'><span id='name'> " + childSnapshot.val().name +
    //   " </span><span id='email'> " + childSnapshot.val().email +
    //   " </span><span id='age'> " + childSnapshot.val().age +
    //   " </span><span id='comment'> " + childSnapshot.val().comment + " </span></div>");

    $("tbody").append("<tr><td>" + childSnapshot.val().name + "</td><td>" + childSnapshot.val().destination + "</td><td>"+ frequency +"</td><td>"+ arrivalTime +"</td><td>"+ tMinutesTillTrain +"</td></tr>");
  // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });

});
