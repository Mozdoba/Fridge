<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8" name="viewport" content="width=device-width, initial-scale=1">
    <title>Upload Receipt</title>
    <script src='https://cdn.rawgit.com/naptha/tesseract.js/1.0.10/dist/tesseract.js'></script>
    <link rel="stylesheet" type="text/css" href="../css/fridge_scanner.css">
  </head>
  <body>
      <!-- SIDE NAV -->
      <div id="mySidenav" class="sidenav">
        <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
        <a href="fridgepg3.html">Your Fridge</a> <!-- LINK PAGES -->
        <a href="fridge_scanner.html">About Us</a>
      </div>

      <!-- <div id="main"> -->
        <span onclick="openNav()" id="menu">&#9776; Menu</span>
      <!-- MENU BUTTON FOR SIDE NAV -->

      <!-- HERO HEADER -->
      <div class="hero-image">
        <div class="hero-text">
          <h1><span><i>fridged-it</i></span></h1>
        </div>
      </div>

      <!-- DIV TO UPLOAD PHOTO -->
      <div class="main">
        <h2><span>How-To: </span></h2>
        <p>We understand that you're always on the go. To make things easier for you, follow these steps: </p>
        <ol>
          <li>Save your receipts.</li>
          <li>Snap a picture of it! We recommend using apps like Evernote Scannable to help get the best results.</li>
          <li>Upload your photo using the "Choose File" button below.</li>
          <li>Return back to your fridge and see your food items!</li>
        </ol>
      </div>
      <hr />

      <h2>Upload Your Receipt: </h2>
      <img src="../images/evernote-scan.gif" alt="Scannable gif"/>

      <br />
    <!-- </div> -->

    <!-- JAVASCRIPT FOR SIDE NAV -->
    <script>
      function openNav() {
        document.getElementById("mySidenav").style.width = "250px";
        document.getElementById("main").style.marginLeft = "250px";
      }

      function closeNav() {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("main").style.marginLeft= "0";
      }
    </script>

    <!-- GOOGLE VISION SCANNER -->

  </body>
</html>
