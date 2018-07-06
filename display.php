<?php
//$token-$_SESSION['token'];

$token=$_COOKIE['token'];
$messageuser=$_COOKIE['messageuser'];
$url1='http://localhost:3000/login/display';
$data1=array('token'=>$token);
//echo json_encode($data1);
$options1 = array(
    'http' => array(
        'method'  => 'GET',
        'content' => json_encode( $data1 ),
        'header'=>  "Content-Type: application/json\r\n" .
					"Accept: application/json\r\n"
      )
);
$context1     = stream_context_create($options1);
$result1      = file_get_contents($url1, false, $context1);
$response1    = json_decode($result1);

$message= $response1->message;
echo $message;

if($message=='auth success'){
    include('adminpage.php');
    }else if($messageuser=='Success user login'){
    include('userpage.php');
    }else{
        echo "<br>YOU HAVENT REGISTERED <a href='index.php'>SIGNIN AGAIN?</a>'";
    }

   
    ?>