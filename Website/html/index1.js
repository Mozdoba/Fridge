const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
firestore.settings(settings);

var db = firebase.firestore();

function storeData(){

var inputFirstName = document.getElementById("first").value;
var inputLastName = document.getElementById("last").value;
var inputEmail = document.getElementById("email").value;
var inputPassword = document.getElementById("password").value;
var inputConfirm = document.getElementById("confirmPassword").value;
var inputConfirm1 = document.getElementById("confirmPassword1").value;


db.collection("Users").doc().set({
  firstName: inputFirstName,
  lastName: inputLastName,
  email: inputEmail,
  password: inputPassword,
  confirmPass: inputConfirm1
})
.then(function() {
  console.log("Document successfully written!");
})
.catch(function(error) {
  console.error("Error writing document: ", error);
});
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {

    //User is signed in.
    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";
  } else {

    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";
    // No user is signed in.
  }
});


function login(){

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;
  //window.alert(userEmail + " " + userPass);

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Errrrror : Keep trying! You can do it!" +  error.message);
  // ...
});
}
