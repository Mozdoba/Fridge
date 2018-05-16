// Initialize Firebase (ADD YOUR OWN DATA)
var config = {
  apiKey: "AIzaSyCEnMpLTEJm4pYdFfnKbk4EtNbH5kUyUaY",
  authDomain: "fridge-442c0.firebaseapp.com",
  databaseURL: "https://fridge-442c0.firebaseio.com",
  projectId: "fridge-442c0",
  storageBucket: "fridge-442c0.appspot.com",
  messagingSenderId: "230945302656"
};
firebase.initializeApp(config);

// Reference users collection
var userRef = firebase.database().ref('user');

// Listen for form submit
document.getElementById('registration').addEventListener('submit', submitForm);

// Submit form
function submitForm(e){
  e.preventDefault();

  // Get values
  var fname = getInputVal('first');
  var lname = getInputVal('last');
  var email = getInputVal('email');
  var password = getInputVal('password');
  var confirmPassword = getInputVal('confirm_password');

  // Save user
  saveUser(fname, lname, email, password, confirmPassword);

  // Show alert
  document.querySelector('.alert').style.display = 'block';

  // Hide alert after 3 seconds
  setTimeout(function(){
    document.querySelector('.alert').style.display = 'none';
  },3000);

  // Clear form
  document.getElementById('registration').reset();
}

// Function to get get form values
function getInputVal(id){
  return document.getElementById(id).value;
}

// Save user to firebase
function saveUser(fname, lname, email, password, confirmPassword){
  var newUserRef = userRef.push();
  newUserRef.set({
    firstName: fname,
    lastName: lname,
    email: email,
    password: password,
    confirmPassword: confirmPassword
  });
}


/*
TODO get info from the database.
// Get info from the Database
var headingTwo = document.getElementById("headingTwo");
var firebaseHeadingRef = firebase.database().ref().child("Heading");

// Populates information on the HTML page
firebaseHeadingRef.on('value', function(datasnapshot) {
  headingTwo.innerText = datasnapshot.val();
});

*/


// Add Sign Up event
const btnSignUp = document.getElementById("signup");
btnSignUp.addEventListener('submit', e => {
  // Get email and pass
  var email = getInputVal('email');
  var password = getInputVal('password');
  var auth = firebase.auth();

  var promise = createUserWithEmailAndPassword(email, password);
  promise.catch(e => console.log(e.message));

});

// Add a realtime listener
firebase.auth().onAuthStateChanged(firebaseUser => {
  if(firebaseUser) {
    console.log(firebaseUser);
  } else {
    console.log('not logged in');
  }
});
