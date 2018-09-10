$(document).ready(function () {

      // Initialize Firebase
      var config = {
        apiKey: "AIzaSyCSHetb7a3pagG9sA1i5jGxdcGWyFc1eag",
        authDomain: "karinaducoding.firebaseapp.com",
        databaseURL: "https://karinaducoding.firebaseio.com",
        projectId: "karinaducoding",
        storageBucket: "karinaducoding.appspot.com",
        messagingSenderId: "930488443212"
      };
      firebase.initializeApp(config);

      var database = firebase.database();

      // Initial varibles
      var trainName = "";
      var trainDest = "";
      var firstTrain = "";
      var firstFreq = "";

      // Button for adding train information
      $("#add-train-btn").on("click", function (event) {
        event.preventDefault();

        // on click submit train info
        var trainName = $("#train-name-input").val().trim();
        var trainDest = $("#destination-input").val().trim();
        var firstTrain = moment($("#first-input").val().trim(), "HH:mm").format("X");
        var trainFreq = $("#frequency-input").val().trim();

        alert("Train information has been added to schedule");

        // Push info to database
        database.ref().push({
        
            name: trainName,
            destination: trainDest,
            first: firstTrain,
            frequency: trainFreq
          
        });


        // Logs everything to console
        //console.log(newTrain.name);
        //console.log(newTrain.destination);
        //console.log(newTrain.first);
        //console.log(newTrain.frequency);

        //Reset???

        // Clears all of the text-boxes
        $("#train-name-input").val("");
        $("#destination-input").val("");
        $("#first-input").val("");
        $("#frequency-input").val("");
      });

      // Pulling data from database
      database.ref().on("child_added", function (childSnapshot) {
        //console.log(childSnapshot.val());

        var trainName = childSnapshot.val().name;
        var trainDest = childSnapshot.val().destination;
        var firstTrain = childSnapshot.val().first;
        var trainFreq = childSnapshot.val().frequency;

        //subtacts a yr from first train time, for MATH purpose
        var firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years");

        //gets the difference in mins from current time and 1st train
        var diffTime = moment().diff(moment(firstTrainConverted), "minutes");

        //calcs remaining minutes
        var tRemainder = diffTime % trainFreq;

        //calc mins away
        var minsAway = trainFreq - tRemainder;
        console.log(trainFreq);

        //adds mins away to current time to show next train time
        var nextTrain = moment().add(minsAway, "minutes");

        // Create the new row for table
        /*var newRow = $("<tr>").append(
          $("<td>").text(trainName),
          $("<td>").text(trainDest),
          $("<td>").text(firstTrain),
          $("<td>").text(trainFreq),
        );*/

        var newRow = `
          <tr>
            <td>${trainName}</td>
            <td>${trainDest}</td>
            <td>${trainFreq}</td>
            <td>${nextTrain}</td>
            <td>${minsAway}</td>
          </tr>
        `;

        $("tbody").append(newRow)
      });
    });