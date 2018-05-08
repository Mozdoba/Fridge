$(document).ready(function() {

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();
const settings = {timestampsInSnapshots: true};
db.settings(settings);
    
//----------------------------------------------------------------------------------------------------------
//DISPLAY DATA FROM FIRESTORE
//----------------------------------------------------------------------------------------------------------
// Captures user email and password on login
var userEmail = "test@test.com";
var userPass;
var userID = getUserId(userEmail);
console.log(userID);
/**
 * @TO-DO:
 * create render function to add lists to modals in fridgepg3.html - 1 hr
 * function to grab food items in dairy category - 1 hr
 * function to grab food items in grains category - 1 hr
 * function to grab food items in fruits category - 1 hr
 * function to grab food items in meats category - 1 hr
 * function to grab food items in vegetables category - 1 hr
 * render content in dairy modal using Divs - 1 hr
 * render content in grains modal using Divs - 1 hr
 * render content in fruits modal using Divs- 1 hr
 * render content in meats modal using Divs - 1 hr
 * render content in vegetables modal - 1 hr
 * connect login page to fridgepg3.html (form attribute action?)
 * agree on database schema / structure - 30 mins
 * style unordered list - alphabetically vs timestamp
 * function to remove food items in dairy category - 1 hr
 * function to remove food items in grains category - 1 hr
 * function to remove food items in fruits category - 1 hr
 * function to remove food items in meats category - 1 hr
 * function to remove food items in vegetables category - 1 hr
 * update modal content upon page refresh - 30 min
 * select button to highlight food items - 1 hr
 * 
 */



// Shortcuts to DOM Elements.
const renderGrainsButton = document.querySelector("#render-grains");
const renderMeatsButton = document.querySelector("#render-meats");
const renderDairyButton = document.querySelector("#render-dairy");
const renderFruitsButton = document.querySelector("#render-fruits");
const renderVegetablesButton = document.querySelector("#render-vegetables");
const editButton = document.querySelectorAll(".edit-button");
const deleteButton = document.querySelectorAll(".delete-button");
const getUsersButton = document.querySelectorAll(".display-users");
const getFoodButton = document.querySelectorAll(".display-foods");
const getUserIdButton = document.querySelectorAll(".display-userID");
const wheat_content = document.querySelector('#modal-content-wheat');
const meats_content = document.querySelector('#modal-content-meats');
const dairy_content = document.querySelector('#modal-content-dairy');
const fruits_content = document.querySelector('#modal-content-fruits');
const vegelists_content = document.querySelector('#modal-content-dairy');

// Events for generating modal content
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

editButton.forEach((el) => {
    el.addEventListener("click", editButtonFunction);
});

deleteButton.forEach((el) => {
    el.addEventListener("click", deleteCheckedBoxes);
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

// Returns all Documents in specefied query
function getDocumentsInQuery(query) {
    query.onSnapshot(function(snapshot) {
        console.log(snapshot.size);
        if (!snapshot.size) {
            console.log("No changes to documents in query!");
            return;
        }
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
    return renderedDoc; //returns input
}

// Deletes Checked checkboxes and all children from DOM
function deleteCheckedBoxes(modal) {
    var checkBoxes = document.querySelectorAll(".selectable");
    var checkedCount = 0;
    for(var i = 0; i < checkBoxes.length; i++) {
        var checkBox = checkBoxes[i];
        if (checkBox.checked) {
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


// Returns mock data from firestore
function retrieveData(userEmail) {
    console.log("Attempting to retreive Document Data");
    let docRef = db.collection("Users").doc(userID);
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


function editButtonFunction() {
    var checkBoxes = document.querySelectorAll(".selectable");
    checkBoxes.forEach((el) => {
        if (el.style.display == "none") {
            el.style.display = "inline-block";
        } else {
            el.style.display = "none";
        }
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
