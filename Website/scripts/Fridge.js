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
//FIRESTORE DATABASE FUNCTIONS
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

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
