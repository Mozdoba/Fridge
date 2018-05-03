var firstName = document.getElementById("first");
var lastName = document.getElementById("last");
var email = document.getElementById("email");
var password = document.getElementById("password");
var confirmPassword = document.getElementById("confirm_password");
var submitCreate = document.getElementById("createBtn");

//
var firebaseRef = firebase.database().ref();

// Get info from the Database
var headingTwo = document.getElementById("headingTwo");
var firebaseHeadingRef = firebase.database().ref().child("Heading");

// Populates information on the HTML page
firebaseHeadingRef.on('value', function(datasnapshot) {
  headingTwo.innerText = datasnapshot.val();
});



function submitClick() {
  var messageFirst = firstName.value;
  firebaseRef.push().set(messageFirst);
}
