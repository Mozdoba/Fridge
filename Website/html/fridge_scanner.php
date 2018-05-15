<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Upload Receipt</title>
    <script src='https://cdn.rawgit.com/naptha/tesseract.js/1.0.10/dist/tesseract.js'></script>
    <link rel="stylesheet" type="text/css" href="../css/fridge_scanner.css">
  </head>
  <body>
      <!-- SIDE NAV -->
      <div id="mySidenav" class="sidenav">
        <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
        <a href="#">Home</a>
        <a href="fridgepg3.html">Your Fridge</a> <!-- LINK PAGES -->
        <a href="#">Facts</a>
        <a href="#">About Us</a>
      </div>

      <!-- <div id="main"> -->
        <span onclick="openNav()">&#9776; Menu</span>
      <!-- MENU BUTTON FOR SIDE NAV -->

      <!-- HERO HEADER -->
      <div class="hero-image">
        <div class="hero-text">
          <h1><span><i>fridged-it</i></span></h1>
        </div>
      </div>

      <!-- DIV TO UPLOAD PHOTO -->

      <h2><span>Receipt Upload </span></h2>
      <p>We understand that you're always on the go. To make things easier for you, follow these steps: </p>
      <ol>
        <li>Save your receipts.</li>
        <li>Snap a picture of it! We recommend using apps like Evernote Scannable to help get the best results.</li>
        <li>Upload your photo using the "Choose File" button below.</li>
        <li>Return back to your fridge and see your food items!</li>
      </ol>
      <hr />

      <h2>Upload Your Receipt: </h2>
      <img src="../images/evernote-scan.gif" alt="Scannable gif"/>

      <br />

      <!-- CODE IN THIS FILE
      <label for="fileInput">Choose Receipt to scan:</label>
      <input type="file" id="fileInput" name="fileInput"/>
      <br />
      <br />
      <div id="document-content">
      </div>
      <div id = "ocr_status"></div> -->

      <!-- ALAN'S ORIGINAL CODE
      <label for=fileInput>Choose your receipt:</label>
      <br>
      <br>
      <input type="file" id="fileInput" name="fileInput"/>

      <div id="document-content"></div>
      <div id="ocr_status"></div>
      </div> -->

    <!-- TESSERACT SCRIPT TO PARSE RECEIPT -->
    <!-- <script>
    document.addEventListener('DOMContentLoaded', function(){
          var fileInput = document.getElementById('fileInput');
          fileInput.addEventListener('change', handleInputChange);
      });

      function handleInputChange(event){
          var input = event.target;
          var file = input.files[0];
          console.log(file);
          Tesseract.recognize(file)
              .progress(function(message){
                  document.getElementById("ocr_status")
                          .innerText = message["status"] + " (" +
                              (message["progress"] * 100) + "%)";
              })


              .then(function(result){
                  var contentArea = document.getElementById('document-content')
                  .innerText = result.text;
              })
              .catch(function(err){
                  console.error(err);
              });
      }
    </script>

    JAVASCRIPT FOR SIDE NAV -->
    <!-- <script>
      function openNav() {
        document.getElementById("mySidenav").style.width = "250px";
        document.getElementById("main").style.marginLeft = "250px";
      }

      function closeNav() {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("main").style.marginLeft= "0";
      }
    </script>  -->

    <!-- CREDIT: http://www.leanx.eu/tutorials/use-google-cloud-vision-api-to-process-invoices-and-receipts -->
    <form enctype="multipart/form-data" action="" method="POST">
    Choose file to upload: <input name="uploaddocument" type="file" /><br />
    <input type="submit" value="Upload" />
    </form>

    <?php

    // settings
    $api_key = 'AIzaSyDATxhUzfa7mcLVwM02Cfrdi6ErXtRHDIg';
    $url = "https://vision.googleapis.com/v1/images:annotate?key=" . $api_key;
    $detection_type = "TEXT_DETECTION";

    // allowed image mime types
    // Cloud Vision allows more image types but this application will only support three
    $allowed_types = array('image/jpeg','image/png','image/gif');

    if($_FILES){

      // check if uploaded image has an allowed mime type
      if(in_array($_FILES['uploaddocument']['type'],$allowed_types)){

          // base64 encode image
            $image = file_get_contents($_FILES['uploaddocument']['tmp_name']);
          $image_base64 = base64_encode($image);

          $json_request ='{
                "requests": [
                {
                  "image": {
                    "content":"' . $image_base64. '"
                  },
                  "features": [
                      {
                        "type": "' .$detection_type. '",
                    "maxResults": 200
                      }
                  ]
                }
              ]
            }';

          $curl = curl_init();

          curl_setopt($curl, CURLOPT_URL, $url);
          curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
          curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
          curl_setopt($curl, CURLOPT_HTTPHEADER, array("Content-type: application/json"));
          curl_setopt($curl, CURLOPT_POST, true);
          curl_setopt($curl, CURLOPT_POSTFIELDS, $json_request);

          $json_response = curl_exec($curl);
          $status = curl_getinfo($curl, CURLINFO_HTTP_CODE);

          curl_close($curl);

          // verify if we got a correct response
          if ( $status != 200 ) {
               die("Something when wrong. Status code: $status" );
            }

          // prints out JSON raw data
          // echo '<pre>';
          // print_r($json_response);
          // echo '</pre>';

          // create an image identifier for the uploaded file
          switch($_FILES['uploaddocument']['type']){
            case 'image/jpeg':
              $im = imagecreatefromjpeg($_FILES['uploaddocument']['tmp_name']);
              break;
            case 'image/png':
              $im = imagecreatefrompng($_FILES['uploaddocument']['tmp_name']);
              break;
            case 'image/gif':
              $im = imagecreatefromgif($_FILES['uploaddocument']['tmp_name']);
              break;
            }

          $red = imagecolorallocate($im, 255, 0, 42);

          // transform the json response to an associative array
          // decodes JSON string into PHP variable, returns an object
          $response = json_decode($json_response, true);

          // loop through PHP array, outputs each word from image
          $someArray = $response['responses'][0]['textAnnotations'];
          foreach($someArray as $key => $value) {
            echo $value['description'] . "<br />";
          }

          // for each of the detected text fragments we'll draw a box
          // the cloud API returns veticis for each fragment
          foreach($response['responses'][0]['textAnnotations'] as $box){

            $points = array();

            foreach($box['boundingPoly']['vertices'] as $vertex){
              array_push($points, $vertex['x'], $vertex['y']);
              }

            imagepolygon($im, $points, count($box['boundingPoly']['vertices']), $red);

            }

          // Give our image a name and store it (saves a .jpeg file in your comp with rectangles)
          // $image_name = time().'.jpg';
          // imagejpeg($im, $image_name);
          // imagedestroy($im);

          // output the results
          echo'<div style="width:20%; float:left;"><img src="'.$image_name.'" style="width:100%;"/></div>';

          echo'<div style="width:50%; float:left; padding:20px;">';
              // display the first text annotation
              echo'<pre>';
              print_r($response['responses'][0]['textAnnotations'][0]['description']);
              echo'</pre>';
          echo'</div>';

            }
          else{
            echo 'File type not allowed';
            }

      }

    ?>

  </body>
</html>