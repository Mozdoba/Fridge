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
    
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//DISPLAY DATA FROM FIRESTORE
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Captures user email and password on login
var userID = 'LGMsHkEvgKWoxrNqO01y';
var userEmail = "test@test.com";

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
    disableEditEnableCancel(cancelButtonGrains, this);
    // Displays selectable checkboxes
    $(".selectable-grains").css("display", "inline-block");
});

cancelButtonGrains.addEventListener("click", function() {
    //Displays the cancel button and hides edit button
    disableCancelEnableEdit(editButtonGrains, this);
    // Hides selectable checkboxes
    $(".selectable-grains").css("display", "none");
});

editButtonMeats.addEventListener("click", function() {
    //Displays the cancel button and hides edit button
    disableEditEnableCancel(cancelButtonMeats, this);
    // Displays selectable checkboxes
    $(".selectable-meats").css("display", "inline-block");
});

cancelButtonMeats.addEventListener("click", function() {
    //Displays the cancel button and hides edit button
    disableCancelEnableEdit(editButtonMeats, this);
    // Hides selectable checkboxes
    $(".selectable-meats").css("display", "none");
});

editButtonDairy.addEventListener("click", function() {
    //Displays the cancel button and hides edit button
    disableEditEnableCancel(cancelButtonDairy, this);
    // Displays selectable checkboxes
    $(".selectable-dairy").css("display", "inline-block");
});

cancelButtonDairy.addEventListener("click", function() {
    //Displays the cancel button and hides edit button
    disableCancelEnableEdit(editButtonDairy, this);
    // Hides selectable checkboxes
    $(".selectable-dairy").css("display", "none");
});

editButtonFruits.addEventListener("click", function() {
    //Displays the cancel button and hides edit button
    disableEditEnableCancel(cancelButtonFruits, this);
    // Displays selectable checkboxes
    $(".selectable-fruits").css("display", "inline-block");
});

cancelButtonFruits.addEventListener("click", function() {
    //Displays the cancel button and hides edit button
    disableCancelEnableEdit(editButtonFruits, this);
    // Hides selectable checkboxes
    $(".selectable-fruits").css("display", "none");
});

editButtonVegetables.addEventListener("click", function() {
    //Displays the cancel button and hides edit button
    disableEditEnableCancel(cancelButtonVegetables, this);
    // Displays selectable checkboxes
    $(".selectable-vegetables").css("display", "inline-block");
});

cancelButtonVegetables.addEventListener("click", function() {
    //Displays the cancel button and hides edit button
    disableCancelEnableEdit(editButtonVegetables, this);
    // Hides selectable checkboxes
    $(".selectable-vegetables").css("display", "none");
});

$(deleteButtonMeats).click(function() {
    deleteCheckedBoxes("meats");
});
$(deleteButtonGrains).click(function() {
    deleteCheckedBoxes("grains");
});
$(deleteButtonDairy).click(function() {
    deleteCheckedBoxes("dairy");
});
$(deleteButtonFruits).click(function() {
    deleteCheckedBoxes("fruits")
});
$(deleteButtonVegetables).click(function() {
    deleteCheckedBoxes("vegetables");
});

// Events for generating modal content and testing
/*
renderGrainsButton.addEventListener("click", function() {
    var userID = 'LGMsHkEvgKWoxrNqO01y';
    getSubCollection(userID, 'grains');
});

renderMeatsButton.addEventListener("click", function() {
    var userID = 'LGMsHkEvgKWoxrNqO01y';
    getSubCollection(userID, 'meats');
});

getUsersButton.forEach((el) => {
    console.log(el);
    el.addEventListener("click", getAllUsersWithEmail);
});

getFoodButton.forEach((el) => {
    console.log(el);
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

function disableEditEnableCancel(cancelButton, editButton) {
    $(cancelButton).removeClass("hidden");
    setTimeout(function() {
        $(cancelButton).removeClass("disabled");
    }, 20);
    $(editButton).addClass("disabled");
    $(editButton).addClass("hidden");
}

function disableCancelEnableEdit(editButton, cancelButton) {
    $(editButton).removeClass("hidden");
    setTimeout(function() {
        $(editButton).removeClass("disabled");
    }, 20);
    $(cancelButton).addClass("disabled");
    $(cancelButton).addClass("hidden");
}

// Displays delete-button if at least 1 checkbox is checked
function showOrHideDeleteButton(category) {
    var checkBoxes = document.querySelectorAll(".selectable-" + category);
    var checkedCount = 0;
    checkBoxes.forEach((el) => {
        if (el.checked) {
            checkedCount++;
        }
    });
    if (checkedCount >= 1) {
        if (category === "grains") {
            deleteButtonGrains.style.display = "block";
        } else if (category === "meats") {
            deleteButtonMeats.style.display = "block";
        } else if (category == "dairy") {
            deleteButtonDairy.style.display = "block";
        } else if (category === "fruits") {
            deleteButtonFruits.style.display = "block";
        } else if (category ==="vegetables") {
            deleteButtonVegetables.style.display = "block";
        }
    } else {
        if (category === "grains") {
            deleteButtonGrains.style.display = "none";
        } else if (category === "meats") {
            deleteButtonMeats.style.display = "none";
        } else if (category == "dairy") {
            deleteButtonDairy.style.display = "none";
        } else if (category === "fruits") {
            deleteButtonFruits.style.display = "none";
        } else if (category ==="vegetables") {
            deleteButtonVegetables.style.display = "none";
        }
    }
}

// Renders data on HTML pages
function renderFoodItem(foodDoc, category) {
    // @TO-DO: make a list and append it to ".modal-content" 
    renderedDoc = "<input type='checkbox' class='selectable selectable-"
    + category + "'/><label class='food-item food-item-" + category + "'>&nbsp&nbsp&nbsp&nbsp" + foodDoc.id + "</label>";
    $(".modal-body-" + category).append(renderedDoc);
    // Hide all checkboxes
    $(".selectable").css("display", "none");
    
    // addEventListeners to all the food-item inputs that were just rendered
    let selectableCheckBox = document.querySelectorAll(".selectable-" + category);
    selectableCheckBox.forEach((el) => {
        el.addEventListener("click", function() {
            showOrHideDeleteButton(category);
        });
    });
    return renderedDoc; //returns input
}

// Deletes Checked checkboxes and all children from DOM
function deleteCheckedBoxes(category) {
    var checkBoxes = document.querySelectorAll(".selectable-" + category);
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
            if (category === "grains") {
                deleteButtonGrains.style.display = "none";
            } else if (category === "meats") {
                deleteButtonMeats.style.display = "none";
            } else if (category == "dairy") {
                deleteButtonDairy.style.display = "none";
            } else if (category === "fruits") {
                deleteButtonFruits.style.display = "none";
            } else if (category ==="vegetables") {
                deleteButtonVegetables.style.display = "none";
            }
        }
    }
}
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//FUNCTIONS IN DEVELOPMENT
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Adds a new food item to 'Food Item' collection in the Users Database (Firebase)
function addNewDocument(userID, foodItem, category, market, perishable, price, date) {
    db.collection("Users").doc(userID).collection("Food Item").doc(foodItem).set({
        category: category,
        market: market,
        perishable: perishable,
        price: price,
        timestamp: date
    })
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//FIRESTORE DATABASE FUNCTIONS
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

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


//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//WORKING FUNCTIONS NOT YET INCORPORATED
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Gets a User's ID givin the associated email
function getUserId(userEmail) {
    console.log("Attempting to retreive Document ID");
    var query = db.collection("Users").where("email", "==", userEmail);
    query.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id);
            return doc.id;
        });
    });
}
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
