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



function logOut(){

    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      window.location.href = "http://fridgedit.com/login.html";
    }).catch(function(error) {
      // An error happened.
    });
}


$(document).ready(function() {

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();
const settings = {timestampsInSnapshots: true};
db.settings(settings);

//----------------------------------------------------------------------------------------------------------
//DISPLAY DATA FROM FIRESTORE
//----------------------------------------------------------------------------------------------------------

/**
 * @TO-DO:
 * create render function
 *
 */

// Captures user email and password on login

// Shortcuts to DOM Elements.
const updateListButton = document.querySelectorAll(".display-data");
const getUsersButton = document.querySelectorAll(".display-users");
const getFoodButton = document.querySelectorAll(".display-foods");
const wheat_content = document.querySelector('#modal-content-wheat');
const meats_content = document.querySelector('#modal-content-meats');
const dairy_content = document.querySelector('#modal-content-dairy');
const fruits_content = document.querySelector('#modal-content-fruits');
const vegelists_content = document.querySelector('#modal-content-dairy');

// Events for generating modal content
updateListButton.forEach((el) => {
    console.log(el);
    el.addEventListener("click", getId);
});

getUsersButton.forEach((el) => {
    console.log(el);
    el.addEventListener("click", getAllUsersWithEmail);
});

getFoodButton.forEach((el) => {
    console.log(el);
    el.addEventListener("click", getSubCollection);
});

// Gets User data specified by email
var userEmail = "test@test.com";
function getAllUsersWithEmail(userEmail) {
    console.log("Attempting to retreive Document Data");
    var query = db.collection("Users").where("email", "==", "test@test.com");
    query.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());


        });
    });
}

function getId(userEmail) {
    console.log("Attempting to retreive Document ID");
    var query = db.collection("Users").where("email", "==", "test@test.com");
    query.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id);
            return doc.id;
        });
    });
}

// Gets User subcollection Food Item data specified by email
var useremail = "test@test.com";
function getSubCollection(getId) {
    console.log("Attempting to retreive SubCollections");
    var query = db.collection("Users").doc('LGMsHkEvgKWoxrNqO01y').collection("Food Item");
    query.get().then(function(querySnapshot) {
        var list = '<ul class="food-list">';
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            // generate content in modal
            list += "<li>" + doc.id + "</li>";
        });
        list += '</ul>';
        $(".modal-content").append(list);
    });
}

// Renders data on HTML page
function render(data) {
// @TO-DO: make a list and append it to ".modal-content"

}

// Returns mock data from firestore
function retrieveData() {
    console.log("Attempting to retreive Document Data");
    let docRef = db.collection("Food").doc("Dairy");
    docRef.get().then(function(doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
}

var firstname = "Lewis";
function getAllUsers(firstname) {
    console.log("Attempting to retreive Document Data");
    let query = db.collection("Users").where("firstName", "==", firstname);
    query.get().then(function(doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
        } else {
            // doc.data() will be undefinedd in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
}


// Returns all Documents in specefied query
function getDocumentsInQuery(query) {
    query.onSnapshot(function(snapshot) {
        console.log(snapshot);
        console.log(snapshot.size);
        if (!snapshot.size) {
            console.log("No changes to documents in query!");
            return;
        }
        snapshot.docChanges.forEach(function(change) {
            if (change.type === 'added') {
                console.log('Added: ', change.doc.data());
            }
            if (change.type === 'modified') {
                console.log('Modified: ', change.doc.data());
            }
            if (change.type === 'removed') {
                console.log('Removed: ', change.doc.data());
            }
            return;
        });
    });
}

function logOut(){
  console.log("Hello did this work");

firebase.auth().signOut().then(function() {
  // Sign-out successful.
  window.location.href = "http://fridgedit.com/login.html";
}).catch(function(error) {
  // An error happened.
});
}


// Returns all Users documents from firestore


    /*usersRef.get().then(function(doc) {
        if(doc.exists) {
            console.log("'Users' collection data:", doc.data());
            return doc.data();
        } else {
            // doc.data() will be undefined in this case
            console.log("No 'Users' docs!");

        }
    }).catch(function(error) {
        console.log("Error getting 'Users' documents:", error);
    });
}*/
});












































/*
  Fridge.prototype.data = {
    market: [
      'Save-On-Foods',
      'Whole Foods Market',
      'No Frills',
      'Safeway',
      'Walmart',
      'Famous Foods',
      'Choices Market',
      'T & T Supermarket',
      'Nesters Market',
      'Marketplace IGA',
      'Urban Fare',
      'Buy-Low Foods Ltd\''
    ],
    age: [
      'One Minute',
      'One Hour',
      'One Day',
      'One Week',
      'Two Weeks',
      'Three Weeks',
      '1 Month',
      '2 Months',
      '3 Months',
      '4 Month',
      '5 Months',
      '6 Months',
      '7 Month',
      '8 Months',
      '9 Months',
      '10 Month',
      '11 Months',
      '1 Year'
    ],
    categories: [
      'Dairy',
      'Meats',
      'Wheat',
      'Fruits',
      'Vegelists',
    ],
    price: [
      {
        price: 1,
        text: 'Less than a dollar.'
      },
      {
        price: 2,
        text: 'Less than 5 dollars.'
      },
      {
        price: 3,
        text: 'Less than 10 dollars'
      },
      {
        price: 4,
        text: 'Less than 20 dollars'
      },
      {
        price: 5,
        text: 'This is my favorite place. Literally.'
      }
    ]
  };
*/
