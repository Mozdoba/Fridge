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
const getUsersButton = document.querySelectorAll(".display-users");
const getFoodButton = document.querySelectorAll(".display-foods");
const getUserIdButton = document.querySelectorAll(".display-userID");
const editButton = document.querySelectorAll(".edit-button");
const wheat_content = document.querySelector('#modal-content-wheat');
const meats_content = document.querySelector('#modal-content-meats');
const dairy_content = document.querySelector('#modal-content-dairy');
const fruits_content = document.querySelector('#modal-content-fruits');
const vegelists_content = document.querySelector('#modal-content-dairy');

// Events for generating modal content
renderDairyButton.addEventListener("click", function() {
    var userID = 'LGMsHkEvgKWoxrNqO01y';
    getSubCollectionDairy(userID);
});

renderMeatsButton.addEventListener("click", function() {
    var userID = 'LGMsHkEvgKWoxrNqO01y';
    getSubCollectionMeats(userID);
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

editButton.forEach((el) => {
    el.addEventListener("click", deleteCheckedBoxes);
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

// Renders data on HTML page
function renderFoodItem(foodDoc, modalBodySelector) {
    // @TO-DO: make a list and append it to ".modal-content" 
    renderedDoc = "<input type='checkbox' class='selectable'/><label class='food-item'>&nbsp&nbsp&nbsp&nbsp" + foodDoc.id + "</label>";
    $(".modal-body-dairy").append(renderedDoc);
    return renderedDoc; //returns Div
}

// Deletes Checked checkboxes and all children from DOM
function deleteCheckedBoxes(modal) {
    var checkBoxes = document.querySelectorAll(".selectable");
    for(var i = 0; i < checkBoxes.length; i++) {
        var checkBox = checkBoxes[i];
        if (checkBox.checked) {
            checkBox.parentNode.removeChild(checkBox.nextSibling);
            checkBox.parentNode.removeChild(checkBox);
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
var userID = getUserId(userEmail);
console.log(userID);

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


function getSubCollectionDairy(userID) {
    console.log("Attempting to retreive 'category: dairy' documents from Food Item subcollection");
    var query = db.collection("Users").doc(userID)
    .collection("Food Item").where("category", "==", "dairy");
    query.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            // generate content in modal
            renderFoodItem(doc);
        });
    });
}

function getSubCollectionMeats(userID) {
    console.log("Attempting to retreive 'category: meats' documents from Food Item subcollection");
    var query = db.collection("Users").doc(userID)
    .collection("Food Item").where("category", "==", "meats");
    query.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            // generate content in modal
            renderFoodItem(doc);
        });
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

// Gets User subcollection Food Item data specified by email
function getSubCollection(getUserId) {
    console.log("Attempting to retreive SubCollections");
    var query = db.collection("Users").doc(userID).collection("Food Item");
    query.get().then(function(querySnapshot) {
        var list = '<ul class="food-list">';
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            // generate content in modal
            list += "<li>" + doc.id + "</li>";
        });
        list += '</ul>';
        $(".modal-body").append(list);
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
