<<<<<<< HEAD
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


=======
>>>>>>> 59b77c012850ad7f02fda6bfafc9cae1eadde0ed
$(document).ready(function() {

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();
const settings = {timestampsInSnapshots: true};
db.settings(settings);
<<<<<<< HEAD

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
=======
    
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//DISPLAY DATA FROM FIRESTORE
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Captures user email and password on login
var userID = 'LGMsHkEvgKWoxrNqO01y';
var userEmail = "test@test.com";
var userPass;

getSubCollection(userID, "grains");
getSubCollection(userID, "meats");
getSubCollection(userID, "dairy");
getSubCollection(userID, "fruits");
getSubCollection(userID, "vegetables");

//var userID = getUserId(userEmail);
//console.log(userID);
/**
 * @TO-DO:

 * connect login page to fridgepg3.html (form attribute action?)
 * style unordered list - alphabetically vs timestamp
 * update modal content upon page refresh - 30 min
 * ADD CIRCLE button to add new item manually
 * window where user can choose to upload image or add manually or modify existing?
 * Form to fill out when adding new items manually
 * ADD Shopping List functionality?
 * 
 * test function to add food item to DOM
 * take photo of syrra
 * create form to fill out when adding new food items to the fridge
 * create function to grab input fields
 * create function to use input fields to generate new document
 * create function to modify existing fields of a food item
 * design UI to add new food item manually (edit-btn activates?)
 * design UI to modify existing food item (edit-btn activates?)
 * design UI on Fridge page to link to upload receipt screen (edit-btn activates?)
 * Empty Category message if no food items exist in category
 * style existing edit-button :hover :active
 * style existing delete-button :hover :active
 */

// Shortcuts to DOM Elements.
const renderGrainsButton = document.querySelector("#render-grains");
const renderMeatsButton = document.querySelector("#render-meats");
const renderDairyButton = document.querySelector("#render-dairy");
const renderFruitsButton = document.querySelector("#render-fruits");
const renderVegetablesButton = document.querySelector("#render-vegetables");

const editButtonMeats = document.querySelector("#edit-button-meats");
const editButtonGrains = document.querySelector("#edit-button-grains");
const editButtonDairy = document.querySelector("#edit-button-dairy");
const editButtonFruits = document.querySelector("#edit-button-fruits");
const editButtonVegetables = document.querySelector("#edit-button-vegetables");

const cancelButtonMeats = document.querySelector("#cancel-button-meats");
const cancelButtonGrains = document.querySelector("#cancel-button-grains");
const cancelButtonDairy = document.querySelector("#cancel-button-dairy");
const cancelButtonFruits = document.querySelector("#cancel-button-fruits");
const cancelButtonVegetables = document.querySelector("#cancel-button-vegetables");

const deleteButtonMeats = document.querySelector("#delete-button-meats");
const deleteButtonGrains = document.querySelector("#delete-button-grains");
const deleteButtonDairy = document.querySelector("#delete-button-dairy");
const deleteButtonFruits = document.querySelector("#delete-button-fruits");
const deleteButtonVegetables = document.querySelector("#delete-button-vegetables");

const getUsersButton = document.querySelectorAll(".display-users");
const getFoodButton = document.querySelectorAll(".display-foods");
const getUserIdButton = document.querySelectorAll(".display-userID");
>>>>>>> 59b77c012850ad7f02fda6bfafc9cae1eadde0ed
const wheat_content = document.querySelector('#modal-content-wheat');
const meats_content = document.querySelector('#modal-content-meats');
const dairy_content = document.querySelector('#modal-content-dairy');
const fruits_content = document.querySelector('#modal-content-fruits');
const vegelists_content = document.querySelector('#modal-content-dairy');

<<<<<<< HEAD
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
=======

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//ADD EVENT LISTENERS TO BUTTONS
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

$('.add').click(function() {
    if ($('.add-slider').hasClass("opened")) {
        $(".add-slider").removeClass("opened");
    } else {
        $(".add-slider").addClass("opened");
    }
});

editButtonGrains.addEventListener("click", function() {
    //Displays the cancel button and hides edit button
    toggleCancelEdit(cancelButtonGrains, this);
    // Displays selectable checkboxes
    var checkBoxes = document.querySelectorAll(".selectable");
    checkBoxes.forEach((el) => {
            el.style.display = "inline-block";
    });
});

cancelButtonGrains.addEventListener("click", function() {
    //Displays the cancel button and hides edit button
    toggleEditCancel(editButtonGrains, this);

    // Displays selectable checkboxes
    var checkBoxes = document.querySelectorAll(".selectable");
    checkBoxes.forEach((el) => {
            el.style.display = "none";
    });
});

editButtonMeats.addEventListener("click", function() {
    //Displays the cancel button and hides edit button
    toggleCancelEdit(cancelButtonMeats, this);
    // Displays selectable checkboxes
    var checkBoxes = document.querySelectorAll(".selectable");
    checkBoxes.forEach((el) => {
            el.style.display = "inline-block";
    });
});

cancelButtonMeats.addEventListener("click", function() {
    //Displays the cancel button and hides edit button
    toggleEditCancel(editButtonMeats, this);

    // Displays selectable checkboxes
    var checkBoxes = document.querySelectorAll(".selectable");
    checkBoxes.forEach((el) => {
            el.style.display = "none";
    });
});

editButtonDairy.addEventListener("click", function() {
    //Displays the cancel button and hides edit button
    toggleCancelEdit(cancelButtonDairy, this);
    // Displays selectable checkboxes
    var checkBoxes = document.querySelectorAll(".selectable");
    checkBoxes.forEach((el) => {
            el.style.display = "inline-block";
    });
});

cancelButtonDairy.addEventListener("click", function() {
    //Displays the cancel button and hides edit button
    toggleEditCancel(editButtonDairy, this);

    // Displays selectable checkboxes
    var checkBoxes = document.querySelectorAll(".selectable");
    checkBoxes.forEach((el) => {
            el.style.display = "none";
    });
});

editButtonFruits.addEventListener("click", function() {
    //Displays the cancel button and hides edit button
    toggleCancelEdit(cancelButtonFruits, this);
    // Displays selectable checkboxes
    var checkBoxes = document.querySelectorAll(".selectable");
    checkBoxes.forEach((el) => {
            el.style.display = "inline-block";
    });
});

cancelButtonFruits.addEventListener("click", function() {
    //Displays the cancel button and hides edit button
    toggleEditCancel(editButtonFruits, this);

    // Displays selectable checkboxes
    var checkBoxes = document.querySelectorAll(".selectable");
    checkBoxes.forEach((el) => {
            el.style.display = "none";
    });
});

editButtonVegetables.addEventListener("click", function() {
    //Displays the cancel button and hides edit button
    toggleCancelEdit(cancelButtonVegetables, this);
    // Displays selectable checkboxes
    var checkBoxes = document.querySelectorAll(".selectable");
    checkBoxes.forEach((el) => {
            el.style.display = "inline-block";
    });
});

cancelButtonVegetables.addEventListener("click", function() {
    //Displays the cancel button and hides edit button
    toggleEditCancel(editButtonVegetables, this);

    // Displays selectable checkboxes
    var checkBoxes = document.querySelectorAll(".selectable");
    checkBoxes.forEach((el) => {
            el.style.display = "none";
    });
});


deleteButton.forEach((el) => {
    el.addEventListener("click", deleteCheckedBoxes);
});


// Events for generating modal content
/*
renderGrainsButton.addEventListener("click", function() {
    var userID = 'LGMsHkEvgKWoxrNqO01y';
    getSubCollection(userID, 'grains');
});

renderMeatsButton.addEventListener("click", function() {
    var userID = 'LGMsHkEvgKWoxrNqO01y';
    getSubCollection(userID, 'meats');
});

renderDairyButton.addEventListener("click", function() {
    var userID = 'LGMsHkEvgKWoxrNqO01y';
    getSubCollection(userID, 'dairy');
});

renderFruitsButton.addEventListener("click", function() {
    var userID = 'LGMsHkEvgKWoxrNqO01y';
    getSubCollection(userID, 'fruits');
});

renderVegetablesButton.addEventListener("click", function() {
    var userID = 'LGMsHkEvgKWoxrNqO01y';
    getSubCollection(userID, 'vegetables');
});

var userEmail = "test@test.com";
getUsersButton.forEach((el) => {
    el.addEventListener("click", function() {
        getAllUsersWithEmail(userEmail);
    });
});

getFoodButton.forEach((el) => {
    el.addEventListener("click", getSubCollection);
});

getUserIdButton.forEach((el) => {
    el.addEventListener("click", function() {
        getUserId(userEmail);
    });
});
*/

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//BUTTON FUNCTIONS
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function toggleCancelEdit(cancelButton, editButton) {
    $(cancelButton).removeClass("hidden");
    setTimeout(function() {
        $(cancelButton).removeClass("disabled");
    }, 20);
    $(editButton).addClass("disabled");
    $(editButton).addClass("hidden");
}

function toggleEditCancel(editButton, cancelButton) {
    $(editButton).removeClass("hidden");
    setTimeout(function() {
        $(editButton).removeClass("disabled");
    }, 20);
    $(cancelButton).addClass("disabled");
    $(cancelButton).addClass("hidden");
}

// Displays delete-button if at least 1 checkbox is checked
function showDeleteButton() {
    var checkBoxes = document.querySelectorAll(".selectable");
    var checkedCount = 0;
    checkBoxes.forEach((el) => {
        if (el.checked) {
            checkedCount++;
        }
    });
    if (checkedCount >= 1) {
        deleteButton.forEach((el) => {
            el.style.display = "block";
        });
    } else {
        deleteButton.forEach((el) => {
            el.style.display = "none";
        });
    }
}

// Renders data on HTML pages
function renderFoodItem(foodDoc, category) {
    // @TO-DO: make a list and append it to ".modal-content" 
    renderedDoc = "<input type='checkbox' class='selectable'/><label class='food-item'>&nbsp&nbsp&nbsp&nbsp" + foodDoc.id + "</label>";
    $(".modal-body-" + category).append(renderedDoc);
    // Hide all checkboxes
    $(".selectable").css("display", "none");
    return renderedDoc; //returns input
}

// Deletes Checked checkboxes and all children from DOM
function deleteCheckedBoxes(modal) {
    var checkBoxes = document.querySelectorAll(".selectable");
    var checkedCount = 0;
    for(var i = 0; i < checkBoxes.length; i++) {
        var checkBox = checkBoxes[i];
        if (checkBox.checked) {
            //deleteDocument(userID, checkBox.nextElementSibling.innerHTML.replace(/\&nbsp;/g, ''));
            checkBox.parentNode.removeChild(checkBox.nextSibling);
            checkBox.parentNode.removeChild(checkBox);
        }
        // hide delete button on last iteration if there are no more checkboxes
        if (i == checkBoxes.length - 1) {
            deleteButton.forEach((el) => {
                el.style.display = "none";
            });
        }
    }
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//FIRESTORE DATABASE FUNCTIONS
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function getUserId(userEmail) {
    console.log("Attempting to retreive Document ID");
    var query = db.collection("Users").where("email", "==", userEmail);
>>>>>>> 59b77c012850ad7f02fda6bfafc9cae1eadde0ed
    query.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id);
            return doc.id;
        });
    });
}

<<<<<<< HEAD
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
=======
// Gets User data specified by email
function getAllUsersWithEmail(userEmail) {
    console.log("Attempting to retreive User Document");
    var query = db.collection("Users").where("email", "==", userEmail);
    query.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    });
}

function getSubCollection(userID, category) {
    console.log("Attempting to retreive 'category: " + category + "' documents from Food Item subcollection");
    var query = db.collection("Users").doc(userID)
    .collection("Food Item").where("category", "==", category);
    query.get().then(function(querySnapshot) {
        if (querySnapshot.size == 0) {
            console.log("No documents in '" + category + "' query");
        } else {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                // generate content in modal
                renderFoodItem(doc, category);
            });
            
            // addEventListeners to all the food-item inputs that were just rendered
            let selectableCheckBox = document.querySelectorAll(".selectable");
            selectableCheckBox.forEach((el) => {
                el.addEventListener("click", showDeleteButton);
            });
            
            
            console.log("Returned document(s) in '" + category + "' query");
        }
    });
}

// Deletes specified document from Firebase
function deleteDocument(userID, documentID) {
    db.collection("Users").doc(userID).collection("Food Item").doc(documentID).delete().then(function() {
        console.log("Document '" + documentID + "' successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing '" + documentID + "' document: ", error);
    });
}

function addNewDocument(userID, foodItem, category, market, perishable, price, date) {
    db.collection("Users").doc(userID).collection("Food Item").doc(foodItem).set({
        category: category,
        market: market,
        perishable: perishable,
        price: price,
        timestamp: date
    })
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
>>>>>>> 59b77c012850ad7f02fda6bfafc9cae1eadde0ed
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
}

<<<<<<< HEAD
var firstname = "Lewis";
function getAllUsers(firstname) {
    console.log("Attempting to retreive Document Data");
    let query = db.collection("Users").where("firstName", "==", firstname);
    query.get().then(function(doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
        } else {
            // doc.data() will be undefinedd in this case
=======
// Returns mock data from firestore
function retrieveData(userEmail) {
    console.log("Attempting to retreive Document Data");
    let docRef = db.collection("Users").doc(userID);
    docRef.get().then(function(doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
        } else {
            // doc.data() will be undefined in this case
>>>>>>> 59b77c012850ad7f02fda6bfafc9cae1eadde0ed
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
}

<<<<<<< HEAD

// Returns all Documents in specefied query
function getDocumentsInQuery(query) {
    query.onSnapshot(function(snapshot) {
        console.log(snapshot);
=======
// Returns all Documents in specefied query
function getDocumentsInQuery(query) {
    query.onSnapshot(function(snapshot) {
>>>>>>> 59b77c012850ad7f02fda6bfafc9cae1eadde0ed
        console.log(snapshot.size);
        if (!snapshot.size) {
            console.log("No changes to documents in query!");
            return;
        }
<<<<<<< HEAD
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
=======
        console.log("Returned changed documents in query");
        return;
        /*
        snapshot.docChanges.forEach(function(change) {
            if (change.type === 'added') {
              render(change.doc);
            }
          });
        */
    });
}

});


>>>>>>> 59b77c012850ad7f02fda6bfafc9cae1eadde0ed









































<<<<<<< HEAD



/*
=======
/*  
>>>>>>> 59b77c012850ad7f02fda6bfafc9cae1eadde0ed
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
