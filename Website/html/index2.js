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
const settings = {/* your settings... */ timestampsInSnapshots: true};
firestore.settings(settings);
////////////////Notes from Google\\\\\\\\\\\\\\\\\\\

// Reference Fridge database.
var db = firebase.firestore();

// var user = firebase.auth().currentUser;

//Is user signed in?
firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
      return userUID = user.uid;
      console.log(user);
      console.log(userUID);
      console.log("TEST");
    } else {
      console.log("ROAR SIGNED OUT");
      // No user is signed in.
    }


//Sends user to firebase database.
function saveUser(email, password, userUID) {
    console.log(user);
    console.log("I love lewis");    
    var newUser = db.collection("Users").doc(userUID).set({
        email: email,
      
    }).then(function(e) {
        console.log(userUID);
        foodItem();

    }).catch (function(err) {
        console.log(err);
    });
}



// ******************************************************** \\ 
//                  Checks User's Password                  \\
// ******************************************************** \\

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
function patternCheck(){
    var userPassword = getInputValue('password');
  
    //console.log("IM WORKING")
  
    if (hasLowerCase(userPassword) &&
        hasUpperCase(userPassword) &&
        hasNumber(userPassword) &&
        userPassword.length > 8) {
          return true;
    } else {
          return false;
    }
}


//Gets the input value from certain ID's
function getInputValue(id){
    return document.getElementById(id).value;
}

// Sends user to the Auth Table
function createAccount() {

    var userEmail = getInputValue('email');
    var userPassword = getInputValue('password');
  
  
    firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword)
    .then(function(item){
        console.log("document successfully written");
        console.log(item);
        saveUser(item.email, userPassword, item.uid);
    })
    .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage);
    // ...
    //window.alert("I'm sorry this user already exists"); 
    });
}


function foodItem() {
    try {
      console.log("I am working");
      var newFood = db.collection("Users").doc(userUID).collection("Food Item").doc().set({});
    } catch (err) {
      console.log('fetch failed', err);
    }
}


// Creates Event Listener for the Sign-Up button
document.getElementById('button-signUp').addEventListener('click', createUser);

// Sign up
function createUser(e){
    //console.log("working");
    console.log(patternCheck());

    if (patternCheck()){
        
        //Gets values
        var email = getInputValue('email');
        var password = getInputValue('password');

        // save user to the Auth table
        createAccount(email, password);

        // // saves user to the DB
        // saveUser(email, password);
        
        // Show alert
        document.querySelector('.alert').style.display = 'block';
        document.querySelector('.alert1').style.display = 'none';

        // Hide alert after 3 seconds
        setTimeout(function(){
        document.querySelector('.alert').style.display = 'none';
        },3000);

        setTimeout(function() {
            window.location.href = "http://fridgedit.com/fridgepg3.html";
        }, 2500);
        
    } else {
        document.querySelector('.alert1').style.display = 'block';

        document.getElementById('password').value = "";
    }

    e.preventDefault();
}

// grabs user's login information
document.getElementById('btnLogin').addEventListener('click', loginUser);

// Log user into their account
function loginUser(e){
  e.preventDefault();
  console.log("Louis can now login!!");

  var userEmail = getInputValue('email_field');
  var userPass = getInputValue('password_field');

  console.log(userEmail);
  console.log(userPass);

    firebase.auth().signInWithEmailAndPassword(userEmail, userPass)
    .then(function(){
        setTimeout(function() {
            window.location.href = "http://fridgedit.com/fridgepg3.html";
        }, 2500);
    })
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        window.alert("Error :" +  error.message);
    // ...
    });
}


});
