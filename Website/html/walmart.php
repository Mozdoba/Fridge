<!-- http://api.walmartlabs.com/v1/items?apiKey={apiKey}&upc=035000521019 -->
<!-- Credit: https://stackoverflow.com/questions/41609622/walmart-api-search-products -->
<?php
$upc = "035000521019";
$appid = "qfj5bwvd5bh6drkbk4wdz5uk";
$api_endpoint = "http://api.walmartlabs.com/v1/items";
$urlParams = "apiKey=". $appid ."&upc=" . $upc;

$fullUrl = $api_endpoint . '?' . $urlParams;

$connection = curl_init();
curl_setopt($connection, CURLOPT_URL, $fullUrl);
curl_setopt($connection, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($connection, CURLOPT_HEADER, true);
curl_setopt($connection, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($connection);
curl_close($connection);

print_r($api_endpoint);
print_r($response);
?>
