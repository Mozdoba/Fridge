// Initialize Firebase
var config = {
  apiKey: "AIzaSyDATxhUzfa7mcLVwM02Cfrdi6ErXtRHDIg",
  authDomain: "fridgedit-f8177.firebaseapp.com",
  databaseURL: "https://fridgedit-f8177.firebaseio.com",
  projectId: "fridgedit-f8177",
  storageBucket: "fridgedit-f8177.appspot.com",
  messagingSenderId: "252806401867"
};
firebase.initializeApp(config);

const firestore = firebase.firestore();

////////////////Notes from Google\\\\\\\\\\\\\\\\\\\
const settings = { /* your settings... */
  timestampsInSnapshots: true
};
firestore.settings(settings);
////////////////Notes from Google\\\\\\\\\\\\\\\\\\\

// Reference Fridge database.
var db = firebase.firestore();

function storeData() {

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

//Gets the input value from certain ID's
function getInputValue(id) {
  return document.getElementById(id).value;
}

//Sends user to firebase database.
function saveUser(email, password) {

  var newUser = db.collection("Users").doc();
  newUser.set({
      email: email,
      password: password,
    })
    .then(function() {
      console.log("document successfully written");
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });
}

function getUserId(userEmail) {
  console.log("Attempting to retreive Document ID");
  var query = db.collection("Users").where("email", "==", userEmail);
  return query.get().then(function(querySnapshot) { //this fxn not returning anything before
      console.log(querySnapshot);
      let x;
      querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(x);
          console.log(doc.id);
          x = doc.id;
          return doc.id;
      });
      return x;
  });
}

function foodItem() {
  var userDoc = getUserId(userEmail);
  var newFood = db.collection("Users").doc(userDoc).collection("FoodItem").doc();
}




// Checks for lowerCase letter
function hasLowerCase(str) {
  return (/[a-z]/.test(str));
}

// Checks for UpperCase letter
function hasUpperCase(str) {
  return (/[A-Z]/.test(str));
}

// Checks for Number
function hasNumber(myString) {
  return (/\d/.test(myString));
}

// Checks if the password has a lowerCase letter, upperCase letter, and a number.
function patternCheck() {

  var userPassword = getInputValue('password');

  console.log("IM WORKING")

  if (hasLowerCase(userPassword) &&
    hasUpperCase(userPassword) &&
    hasNumber(userPassword) &&
    userPassword.length > 7) {
    return true;
  } else {
    return false;
  }
}



//Old createAcc function
// TODO remove this funciton
function createAcc(email, password) {

  var userEmail = document.getElementById("email").value;
  var userPassword = document.getElementById("password").value;


  firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
    window.alert("I'm sorry this user already exists");

  });

  //var userEmail = document.getElementById("email").value;
  //var userPassword = document.getElementById("password").value;


  firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;


    // ...
  });
}

function login() {

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;


  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error :" + error.message);
    // ...
  });

}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    window.location.href = "http://fridgedit.com/fridgepg3.html";
    console.log(user);
    //User is signed in.
  } else {
    // No user is signed in.
    console.log("not logged in");

  }
});



// function logOut(){
//
//     firebase.auth().signOut().then(function() {
//       // Sign-out successful.
//       window.location.href = "http://fridgedit.com/login.html";
//     }).catch(function(error) {
//       // An error happened.
//     });
// }






document.getElementById('button-signUp').addEventListener('click', createUser);

//Submit form
function createUser(e) {
  e.preventDefault();
  console.log("working");
  console.log(patternCheck());

  // Checks the password before
  if (patternCheck()) {

    //get values
    var email = getInputValue('email');
    var password = getInputValue('password');

    //save user to database
    saveUser(email, password);

    //save user to user auth table
    createAcc(email, password);

    // Show alert
    document.querySelector('.alert').style.display = 'block';
    document.querySelector('.alert1').style.display = 'none';

    // Hide alert after 3 seconds
    setTimeout(function() {
      document.querySelector('.alert').style.display = 'none';
    }, 3000);

  } else {
    document.querySelector('.alert1').style.display = 'block';

    document.getElementById('password').value = "";
    // var password = getInputValue('password');
    // password = "";

  }
}

document.getElementById('btnLogin').addEventListener('click', loginUser);

// Log user into their account
function loginUser(e) {
  e.preventDefault();
  console.log("this works too");

  var userEmail = getInputValue('email_field');
  var userPass = getInputValue('password_field');

  console.log(userEmail);
  console.log(userPass);

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

        window.alert("Error :" +  error.message);
      // ...
    });
}
