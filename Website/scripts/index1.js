$(document).ready(function() {
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
        confirmPass: inputConfirm1,
    })
    .then(function() {
        console.log("Document successfully written");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
    }

    function onLogin() {
        var userInfo = document.querySelector('#login-email').value;
        console.log(userInfo);
        return userInfo;
    }

});