<html>
  <head>
  </head>
  <body>
<form enctype="multipart/form-data" action="" method="POST">
Choose an invoice to upload: <input name="uploaddocument" type="file" /><br />
<input type="submit" value="Upload Document" onclick = "transfer()"/>
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

			echo '<pre>';
			print_r($json_response);
			echo '</pre>';

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
			$response = json_decode($json_response, true);

			// for each of the detected text fragments we'll draw a box
			// the cloud API returns veticis for each fragment
			foreach($response['responses'][0]['textAnnotations'] as $box){
	
				$points = array();

				foreach($box['boundingPoly']['vertices'] as $vertex){
					array_push($points, $vertex['x'], $vertex['y']);
					}
				
				imagepolygon($im, $points, count($box['boundingPoly']['vertices']), $red);

				}
            
      function in_array_r($needle, $haystack, $strict = false) {
        foreach ($haystack as $item) {
          if (($strict ? $item === $needle : $item == $needle) || (is_array($item) && in_array_r($needle, $item, $strict))) {
            return true;
          }
        }

      return false;
      }
      
      $food = array(
        "fruits" => array ("APPLE", "APPLES", "BANANA", "BANANAS", "BLUEBERRIES", "CANTALOUPE", "CHERRIES", "DATES", "DURIAN", "FIGS", "GRAPES", "MANGO", "NECTARINES", "ORANGE", "ORANGES", "PASSIONFRUIT", "PEACHES", "PEARS", "PINEAPPLE", "RASPBERRIES", "STRAWBERRIES","WATERMELON"),
        "meat" => array ("BACON", "BEEF", "BOLOGNA", "CATFISH", "CHICKEN", "COD", "CRAB", "HALIBUT", "HAM", "HEN", "LAMB", "LIVER", "LOBSTER", "MUSSELS", "OYSTERS", "PRAWN", "PEPPERONI", "PORK", "RIBS", "SALAMI", "SALMON", "SAUSAGE", "SHRIMP", "SNAPPER", "SOCKEYE", "STEAK", "TILAPIA", "TROUT", "TUNA", "TURKEY", "WEINERS", "VEAL"),            
        "vegetables" => array ("ASPARAGUS", "AVOCADO", "BEANS", "BEETS", "BOK", "BOK-CHOY", "BOK CHOY", "BROCCOLI", "BROCCOLINI", "BRUSSEL", "CABBAGE", "CARROT", "CARROTS", "CAULIFLOWER", "CELERY", "CELERY-ROOT", "CHARD", "CHOY", "CILANTRO", "CORN/COB", "CORN", "CUCUMBER", "CUKE", "EGGPLANT", "ENDIVE", "GARLIC", "GINGER", "FENNEL", "JALAPENO", "KALE", "LEEKS", "LETTUCE", "LETTUCE BUTTER", "LETTUCE-BUTTER", "LETTUCE GREEN LEAF", "LETTUCE-GREEN-LEAF", "LETTUCE ICEBURG", "LETTUCE-ICEBURG", "LETTUCE RED LEAF", "LETTUCE-RED-LEAF", "LETTUCE ROMAIN", "LETTUCE-ROMAIN", "MINT", "MUSHROOMS", "ONION", "ONIONS", "PARSLEY", "PARSNIP", "PARSNIPS", "PEAS", "PEPPERS", "PEPPERS GREEN", "PEPPERS-GREEN", "PEPPERS ORANGE", "PEPPERS-ORANGE", "PEPPERS YELLOW", "PEPPERS-YELLOW", "PEPPERS RED", "PEPPERS-RED", "PEPPERS JALAPENO", "POTATO", "POTATOE", "POTATOES", "RADICCHIO", "RADISH", "RADISHES", "RHUBARD", "RUTABAGAS", "RUTABAGA", "SCALLIONS", "SHALLOTS", "SPINACH", "SPROUTS", "SQUASH", "SUI CHOY","SUI-CHOY", "TOMATILLOS", "TOMATO","TOMATOES","YAMS","ZUCHINNI"),
        "dairy" => array ("BISCUIT", "BISCUITS", "CHEESE", "CHEESESTRING", "COOKIES", "DIP", "EGGS", "JUICE", "KEFIR", "LEMONADE", "MARGARINE", "MILK", "MOZZARELLA", "PUDDING", "TZATZIKI", "YOGURT"),
        "grains" => array ("BREAD", "BUCKWHEAT", "CEREAL", "CHIA", "CRACKER", "CRACKERS", "LENTIL", "LENTILS", "MILLET", "NOODLE", "NOODLES", "OATMEAL", "PASTA", "QUINOA", "RICE", "TORTILLAS" ),
      );

      
      $selectedFood = array ();
      //$food = array ("BANANA", "MILK", "POTATOES", "BROCCOLI", "BRUSSEL");
          $someArray = $response['responses'][0]['textAnnotations'];
            foreach($someArray as $key => $value) {
              //echo $value['description'];
              if (in_array_r(($value['description']), $food)){
                echo $key . "<br>";
                array_push($selectedFood, ($value['description']));
          }
            }
      
        echo '<pre>';
        print_r(array_values($selectedFood));
        echo '</pre>';
      
//          echo '<pre>';
//          foreach($selectedFood as $scanned){
//            print_r($selectedFood);
//          }
//          echo '</pre>';
//          $counting = 0;
//          for($i=0; $i<count($someArray)-1; $i++) {
//            for ($x = 0; $x<count($food)-1; $x++){
//              if ($someArray[$i] == $food[$x]){
//                $counting++;
//              }
//            }
//          }
//      
//          echo $counting;
			// give our image a name and store it
			//$image_name = time().'.jpg';
			//imagejpeg($im, $image_name);
			//imagedestroy($im);

			// output the results
			//echo'<div style="width:20%; float:left;"><img src="'.$image_name.'" style="width:100%;"/></div>';

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
    
    
  
//    
//    $result = count(array_intersect($food, $response));
//    echo $result;
?>
    <script src="https://www.gstatic.com/firebasejs/4.13.0/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/4.13.0/firebase.js"></script>
    <script src="https://www.gstatic.com/firebasejs/4.13.0/firebase-firestore.js"></script>
    <script>
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
    </script>
    
    <script type = text/javascript>
      const firestore = firebase.firestore();
      const settings = {/* your settings... */ timestampsInSnapshots: true};
      firestore.settings(settings);

      
      var resultArray = <?php echo json_encode($selectedFood); ?>;
      
      function transfer(){
        var db = firebase.firestore();
      
        var user1 = db.collection('Users').doc('1giU3F3JlXm6lSDnADly').collection('Fridge').doc('Food');
      
        user1.set({
          resultArray
        })
        .then(function(){
          console.log("Documents were added");
        })
        .catch(function (error){
          console.error("Error adding documents:", error);
        });
         
      
              
      }
      
    </script>
  </body>
</html>