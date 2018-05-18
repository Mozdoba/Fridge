$(document).ready(function() {

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();
const settings = {timestampsInSnapshots: true};
db.settings(settings);
    
/********************************************
*                                           *
*       DISPLAY DATA FROM FIRESTORE         *
*                                           *
********************************************/

// Captures user email and password on login
var userID = 'nld2X0z7zedzQK4K1zUg';
var userEmail = "sick@gmail.com";

firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
      const userUID = user.uid;
      const userEmail = user.email;
      const userID = await getUserId(userEmail);
      console.log(userID);
      console.log("TEST");
      console.log(userEmail);


getSubCollection(userID, "grains");
getSubCollection(userID, "meats");
getSubCollection(userID, "dairy");
getSubCollection(userID, "fruits");
getSubCollection(userID, "vegetables");

// Integer to give each input a unique id. Eg. id="grains1"
var num = 0;
// Renders data on HTML pages
function renderFoodItem(foodDoc, category) {
    // @TO-DO: make a list and append it to ".modal-content"

    renderedDoc = "<input id='" + category + num + "' type='checkbox' class='selectable selectable-" + category + "' disabled='disabled'/><label for='" + category + num++ + "' class='food-item food-item-" + category + "'>&nbsp&nbsp&nbsp&nbsp" + foodDoc.id + "</label>";
    $(".modal-body-" + category).append(renderedDoc);
    // Hide all checkboxes
    $(".selectable").css("display", "none");

    // addEventListeners to all the food-item inputs that were just rendered
    let selectableCheckBox = document.querySelectorAll(".selectable-" + category);
    selectableCheckBox.forEach((el) => {
        el.addEventListener("click", function() {
            activateOrInactivateDeleteButton(category);
        });
    });
    return renderedDoc; //returns input
}


/********************************************
*                                           *
*       FIRESTORE DATABASE FUNCTIONS        *
*                                           *
********************************************/

function getUserId(userEmail) {
    console.log("Attempting to retreive Document ID");
    var query = db.collection("Users").where("email", "==", userEmail);
    return query.get().then(function(querySnapshot) {
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
                //console.log(doc.id, " => ", doc.data());
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

function logOut(){

    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      window.location.href = "http://fridgedit.com/login.html";
    }).catch(function(error) {
      // An error happened.
    });
}

} else {
    console.log("ROAR SIGNED OUT");
    // No user is signed in.
  }
});

//var userID = getUserId(userEmail);
//console.log(userID);
/**
 * @TO-DO:
 * style unordered list - alphabetically vs timestamp
 * window where user can choose to upload image or add manually or modify existing?
 * ADD Shopping List functionality?
 *
 * test function to add food item to DOM
 * create function to grab input fields
 * create function to use input fields to generate new document
 * create function to modify existing fields of a food item
 * design UI to add new food item manually (edit-btn activates?)
 * design UI to modify existing food item (edit-btn activates?)
 * design UI on Fridge page to link to upload receipt screen (edit-btn activates?)
 * Empty Category message if no food items exist in category
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

/********************************************
*                                           *
*      ADD EVENT LISTENERS TO BUTTONS       *
*                                           *
********************************************/

$('#plus-grains').click(function() {
    toggleForm('grains');
});
$('#plus-meats').click(function() {
    toggleForm('meats');
});
$('#plus-dairy').click(function() {
    toggleForm('dairy');
});
$('#plus-fruits').click(function() {
    toggleForm('fruits');
});
$('#plus-vegetables').click(function() {
    toggleForm('vegetables');
});

editButtonGrains.addEventListener("click", function() {
    //Displays the cancel button and hides edit button
    disableEditEnableCancel(cancelButtonGrains, this);
    // Displays selectable checkboxes and makes them selectable
    $(".selectable-grains").css("display", "inline-block");
    $('.selectable-grains').attr('disabled', false);
    // Slides delete-button out
    $('#delete-button-grains').animate({top: '+=-18px', opacity: '1'}, 'fast');
    $('#select-all-grains').animate({top: '+=-18px', opacity: '1'}, 'fast');
});

cancelButtonGrains.addEventListener("click", function() {
    //Displays the cancel button and hides edit button
    disableCancelEnableEdit(editButtonGrains, this);
    // Hides selectable checkboxes and Changes 'Deselect All' text to 'Select All'
    $(".selectable-grains").css("display", "none");
    $('.selectable-grains').attr('disabled', true);
    $('.selectable-grains').prop('checked', false);
    $('#select-all-grains').html('Select All');
    // Slides delete-button out
    $('#delete-button-grains').animate({top: '+=18px', opacity: '0'}, 'fast');
    $('#select-all-grains').animate({top: '+=18px', opacity: '0'}, 'fast');
});

editButtonMeats.addEventListener("click", function() {
    //Displays the cancel button and hides edit button
    disableEditEnableCancel(cancelButtonMeats, this);
    // Displays selectable checkboxes
    $(".selectable-meats").css("display", "inline-block");
    $('.selectable-meats').attr('disabled', false);
    // Displays delete-slider
    $('#delete-button-meats').animate({top: '+=-18px', opacity: '1'}, 'fast');
    $('#select-all-meats').animate({top: '+=-18px', opacity: '1'}, 'fast');
});

cancelButtonMeats.addEventListener("click", function() {
    //Displays the cancel button and hides edit button
    disableCancelEnableEdit(editButtonMeats, this);
    // Hides selectable checkboxes and Changes 'Deselect All' text to 'Select All'
    $(".selectable-meats").css("display", "none");
    $('.selectable-meats').attr('disabled', true);
    $('.selectable-meats').prop('checked', false);
    $('#select-all-meats').html('Select All');
    // Slides delete-button out
    $('#delete-button-meats').animate({top: '+=18px', opacity: '0'}, 'fast');
    $('#select-all-meats').animate({top: '+=18px', opacity: '0'}, 'fast'); 
});

editButtonDairy.addEventListener("click", function() {
    //Displays the cancel button and hides edit button
    disableEditEnableCancel(cancelButtonDairy, this);
    // Displays selectable checkboxes
    $(".selectable-dairy").css("display", "inline-block");
    $('.selectable-dairy').attr('disabled', false);
    // Displays delete-slider
    $('#delete-button-dairy').animate({top: '+=-18px', opacity: '1'}, 'fast');
    $('#select-all-dairy').animate({top: '+=-18px', opacity: '1'}, 'fast');
});

cancelButtonDairy.addEventListener("click", function() {
    //Displays the cancel button and hides edit button
    disableCancelEnableEdit(editButtonDairy, this);
    // Hides selectable checkboxes and Changes 'Deselect All' text to 'Select All'
    $(".selectable-dairy").css("display", "none");
    $('.selectable-dairy').attr('disabled', true);
    $('.selectable-dairy').prop('checked', false);
    $('#select-all-dairy').html('Select All');
    // Slides delete-button out
    $('#delete-button-dairy').animate({top: '+=18px', opacity: '0'}, 'fast');
    $('#select-all-dairy').animate({top: '+=18px', opacity: '0'}, 'fast');
});

editButtonFruits.addEventListener("click", function() {
    //Displays the cancel button and hides edit button
    disableEditEnableCancel(cancelButtonFruits, this);
    // Displays selectable checkboxes
    $(".selectable-fruits").css("display", "inline-block");
    $('.selectable-fruits').attr('disabled', false);
    // Displays delete-slider
    $('#delete-button-fruits').animate({top: '+=-18px', opacity: '1'}, 'fast');
    $('#select-all-fruits').animate({top: '+=-18px', opacity: '1'}, 'fast');
});

cancelButtonFruits.addEventListener("click", function() {
    //Displays the cancel button and hides edit button
    disableCancelEnableEdit(editButtonFruits, this);
    // Hides selectable checkboxes and Changes 'Deselect All' text to 'Select All'
    $(".selectable-fruits").css("display", "none");
    $('.selectable-fruits').attr('disabled', true);
    $('.selectable-fruits').prop('checked', false);
    $('#select-all-fruits').html('Select All');
    // Slides delete-button out
    $('#delete-button-fruits').animate({top: '+=18px', opacity: '0'}, 'fast');
    $('#select-all-fruits').animate({top: '+=18px', opacity: '0'}, 'fast');
});

editButtonVegetables.addEventListener("click", function() {
    //Displays the cancel button and hides edit button
    disableEditEnableCancel(cancelButtonVegetables, this);
    // Displays selectable checkboxes
    $(".selectable-vegetables").css("display", "inline-block");
    $('.selectable-vegetables').attr('disabled', false);
    // Displays delete-slider
    $('#delete-button-vegetables').animate({top: '+=-18px', opacity: '1'}, 'fast');
    $('#select-all-vegetables').animate({top: '+=-18px', opacity: '1'}, 'fast');
});

cancelButtonVegetables.addEventListener("click", function() {
    //Displays the cancel button and hides edit button
    disableCancelEnableEdit(editButtonVegetables, this);
    // Hides selectable checkboxes and Changes 'Deselect All' text to 'Select All'
    $(".selectable-vegetables").css("display", "none");
    $('.selectable-vegetables').attr('disabled', true);
    $('.selectable-vegetables').prop('checked', false);
    $('#select-all-vegetables').html('Select All');
    // Slides delete-button out
    $('#delete-button-vegetables').animate({top: '+=18px', opacity: '0'}, 'fast');
    $('#select-all-vegetables').animate({top: '+=18px', opacity: '0'}, 'fast');
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
    deleteCheckedBoxes("fruits");
});
$(deleteButtonVegetables).click(function() {
    deleteCheckedBoxes("vegetables");
});

$('#select-all-grains').click(function() { 
    if ($('.selectable-grains').is(':checked')) {
        $('.selectable-grains').prop('checked', false);
        this.innerHTML = "Select All";
        deleteButtonGrains.style.color = "grey";
        deleteButtonGrains.style.cursor = 'default';
    } else {
        $('.selectable-grains').prop('checked', true);
        this.innerHTML = "Deselect All";
    }
});

$('#select-all-meats').click(function() { 
    if ($('.selectable-meats').is(':checked')) {
        $('.selectable-meats').prop('checked', false);
        this.innerHTML = "Select All";
        deleteButtonMeats.style.color = "grey";
        deleteButtonMeats.style.cursor = 'default';
    } else {
        $('.selectable-meats').prop('checked', true);
        this.innerHTML = "Deselect All";
    }
});

$('#select-all-dairy').click(function() { 
    if ($('.selectable-dairy').is(':checked')) {
        $('.selectable-dairy').prop('checked', false);
        this.innerHTML = "Select All";
        deleteButtonDairy.style.color = "grey";
        deleteButtonDairy.style.cursor = 'default';
    } else {
        $('.selectable-dairy').prop('checked', true);
        this.innerHTML = "Deselect All";
    }
});

$('#select-all-fruits').click(function() { 
    if ($('.selectable-fruits').is(':checked')) {
        $('.selectable-fruits').prop('checked', false);
        this.innerHTML = "Select All";
        deleteButtonFruits.style.color = "grey";
        deleteButtonFruits.style.cursor = 'default';
    } else {
        $('.selectable-fruits').prop('checked', true);
        this.innerHTML = "Deselect All";
    }
});

$('#select-all-vegetables').click(function() { 
    if ($('.selectable-vegetables').is(':checked')) {
        $('.selectable-vegetables').prop('checked', false);
        this.innerHTML = "Select All";
        deleteButtonVegetables.style.color = "grey";
        deleteButtonVegetables.style.cursor = 'default';
    } else {
        $('.selectable-vegetables').prop('checked', true);
        this.innerHTML = "Deselect All";
    }
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

/********************************************
*                                           *
*             BUTTON FUNCTIONS              *
*                                           *
********************************************/

function disableEditEnableCancel(cancelButton, editButton) {
    $(cancelButton).removeClass("hidden");
    setTimeout(function() {
        $(cancelButton).removeClass("disabled");
    }, 20);
    $(editButton).addClass("disabled");
    $(editButton).addClass("hidden");
    $('')
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
function activateOrInactivateDeleteButton(category) {
    let checkBoxes = document.querySelectorAll(".selectable-" + category);
    let checkedCount = 0;
    checkBoxes.forEach((el) => {
        if (el.checked) {
            checkedCount++;
        }
    });
    if (checkedCount >= 1) {
        if (category === "grains") {
            deleteButtonGrains.style.cursor = "pointer";
            deleteButtonGrains.style.color = "rgb(96, 96, 194)";
            $('#select-all-grains').html('Deselect All');
            //deleteButtonGrains.style.fontWeight = "bold";
        } else if (category === "meats") {
            deleteButtonMeats.style.cursor = "pointer";
            deleteButtonMeats.style.color = "rgb(96, 96, 194)";
            $('#select-all-meats').html('Deselect All');
            //deleteButtonMeats.style.fontWeight = "bold";
        } else if (category == "dairy") {
            deleteButtonDairy.style.cursor = "pointer";
            deleteButtonDairy.style.color = "rgb(96, 96, 194)";
            $('#select-all-dairy').html('Deselect All');
            //deleteButtonDairy.style.fontWeight = "bold";
        } else if (category === "fruits") {
            deleteButtonFruits.style.cursor = "pointer";
            deleteButtonFruits.style.color = "rgb(96, 96, 194)";
            $('#select-all-fruits').html('Deselect All');
            //deleteButtonFruits.style.fontWeight = "bold";
        } else if (category ==="vegetables") {
            deleteButtonVegetables.style.cursor = "pointer";
            deleteButtonVegetables.style.color = "rgb(96, 96, 194)";
            $('#select-all-vegetables').html('Deselect All');
            //deleteButtonVegetables.style.fontWeight = "bold";
        }
    } else {
        if (category === "grains") {
            deleteButtonGrains.style.cursor = "default";
            deleteButtonGrains.style.color = "grey";
            $('#select-all-grains').html('Select All');
            deleteButtonGrains.style.fontWeight = "normal";
        } else if (category === "meats") {
            deleteButtonMeats.style.cursor = "default";
            deleteButtonMeats.style.color = "grey";
            $('#select-all-meats').html('Select All');
            deleteButtonMeats.style.fontWeight = "normal";
        } else if (category == "dairy") {
            deleteButtonDairy.style.cursor = "default";
            deleteButtonDairy.style.color = "grey";
            $('#select-all-dairy').html('Select All');
            deleteButtonDairy.style.fontWeight = "normal";
        } else if (category === "fruits") {
            deleteButtonFruits.style.cursor = "default";
            deleteButtonFruits.style.color = "grey";
            $('#select-all-fruits').html('Select All');
            deleteButtonFruits.style.fontWeight = "normal";
        } else if (category ==="vegetables") {
            deleteButtonVegetables.style.cursor = "default";
            deleteButtonVegetables.style.color = "grey";
            $('#select-all-vegetables').html('Select All');
            deleteButtonVegetables.style.fontWeight = "normal";
        }
    }
}

function toggleForm(category) {
    if ($('#add-slider-' + category).hasClass("opened")) {
        $('#add-slider-' + category).removeClass("opened");
    } else {
        $('#add-slider-' + category).addClass("opened");
    }
}


// Deletes Checked checkboxes and all children from DOM
function deleteCheckedBoxes(category) {
    let checkBoxes = document.querySelectorAll(".selectable-" + category);
    let checkedCount = 0;
    for(var i = 0; i < checkBoxes.length; i++) {
        let checkBox = checkBoxes[i];
        if (checkBox.checked) {
            //deleteDocument(userID, checkBox.nextElementSibling.innerHTML.replace(/\&nbsp;/g, ''));
            checkBox.parentNode.removeChild(checkBox.nextSibling);
            checkBox.parentNode.removeChild(checkBox);
        }
        // hide delete button on last iteration if there are no more checkboxes
        if (i == checkBoxes.length - 1) {
            if (category === "grains") {
                deleteButtonGrains.style.cursor = "default";
                deleteButtonGrains.style.color = "grey";
            } else if (category === "meats") {
                deleteButtonMeats.style.cursor = "default";
                deleteButtonMeats.style.color = "grey";
            } else if (category == "dairy") {
                deleteButtonDairy.style.cursor = "default";
                deleteButtonDairy.style.color = "grey";
            } else if (category === "fruits") {
                deleteButtonFruits.style.cursor = "default";
                deleteButtonFruits.style.color = "grey";
            } else if (category ==="vegetables") {
                deleteButtonVegetables.style.cursor = "default";
                deleteButtonVegetables.style.color = "grey";
            }
        }
    }
}



/********************************************
*                                           *
*              FORM FUNCTIONS               *
*                                           *
********************************************/


var fruitsList = ["APPLE", "APPLES", "BANANA", "BANANAS", "BLUEBERRIES", "CANTALOUPE", "CHERRIES", "DATES", "DURIAN", "FIGS", "GRAPES", "MANGO", "NECTARINES", "ORANGE", "ORANGES", "PASSIONFRUIT", "PEACHES", "PEARS", "PINEAPPLE", "RASPBERRIES", "STRAWBERRIES", "WATERMELON"];
var meatsList = ["BACON", "BEEF", "BOLOGNA", "CATFISH", "CHICKEN", "COD", "CRAB", "HALIBUT", "HAM", "HEN", "LAMB", "LIVER", "LOBSTER", "MUSSELS", "OYSTERS", "PRAWN", "PEPPERONI", "PORK", "RIBS", "SALAMI", "SALMON", "SAUSAGE", "SHRIMP", "SNAPPER", "SOCKEYE", "STEAK", "TILAPIA", "TROUT", "TUNA", "TURKEY", "WEINERS", "VEAL"];
var vegetablesList = ["ASPARAGUS", "AVOCADO", "BEANS", "BEETS", "BOK", "BOK-CHOY", "BOK CHOY", "BROCCOLI", "BROCCOLINI", "BRUSSEL", "CABBAGE", "CARROT", "CARROTS", "CAULIFLOWER", "CELERY", "CELERY-ROOT", "CHARD", "CHOY", "CILANTRO", "CORN/COB", "CORN", "CUCUMBER", "CUKE", "EGGPLANT", "ENDIVE", "GARLIC", "GINGER", "FENNEL", "JALAPENO", "KALE", "LEEKS", "LETTUCE", "LETTUCE BUTTER", "LETTUCE-BUTTER", "LETTUCE GREEN LEAF", "LETTUCE-GREEN-LEAF", "LETTUCE ICEBURG", "LETTUCE-ICEBURG", "LETTUCE RED LEAF", "LETTUCE-RED-LEAF", "LETTUCE ROMAIN", "LETTUCE-ROMAIN", "MINT", "MUSHROOMS", "ONION", "ONIONS", "PARSLEY", "PARSNIP", "PARSNIPS", "PEAS", "PEPPERS", "PEPPERS GREEN", "PEPPERS-GREEN", "PEPPERS ORANGE", "PEPPERS-ORANGE", "PEPPERS YELLOW", "PEPPERS-YELLOW", "PEPPERS RED", "PEPPERS-RED", "PEPPERS JALAPENO", "POTATO", "POTATOE", "POTATOES", "RADICCHIO", "RADISH", "RADISHES", "RHUBARD", "RUTABAGAS", "RUTABAGA", "SCALLIONS", "SHALLOTS", "SPINACH", "SPROUTS", "SQUASH", "SUI CHOY","SUI-CHOY", "TOMATILLOS", "TOMATO","TOMATOES","YAMS","ZUCHINNI"];
var dairyList = ["BISCUIT", "BISCUITS", "CHEESE", "CHEESESTRING", "COOKIES", "DIP", "EGGS", "JUICE", "KEFIR", "LEMONADE", "MARGARINE", "MILK", "MOZZARELLA", "PUDDING", "TZATZIKI", "YOGURT"];
var grainsList = ["BREAD", "BUCKWHEAT", "CEREAL", "CHIA", "CRACKER", "CRACKERS", "LENTIL", "LENTILS", "MILLET", "NOODLE", "NOODLES", "OATMEAL", "PASTA", "QUINOA", "RICE", "TORTILLAS"];

function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items override-position");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            b.setAttribute("class", "food-suggestions");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}

autocomplete(document.getElementById("myGrainsInput"), grainsList);
autocomplete(document.getElementById("myMeatsInput"), meatsList);
autocomplete(document.getElementById("myDairyInput"), dairyList);
autocomplete(document.getElementById("myFruitsInput"), fruitsList);
autocomplete(document.getElementById("myVegetablesInput"), vegetablesList);

});


