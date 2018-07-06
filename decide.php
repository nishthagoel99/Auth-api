<?php
$message="";
$messageuser="";
if($_SERVER['REQUEST_METHOD']=='POST'){
    $url='http://localhost:3000/login';
$data=array('name'=>$_POST['name'],'password'=>$_POST['password']);
$options = array(
    'http' => array(
        'method'  => 'POST',
        'content' => json_encode( $data ),
        'header'=>  "Content-Type: application/json\r\n" .
                    "Accept: application/json\r\n"
      )
);
$context     = stream_context_create($options);
$result      = file_get_contents($url, false, $context);
$response    = json_decode($result);
$messageuser=$response->message;
echo $messageuser;
$token= $response->token;
setcookie('token',$token,time()+3600);
setcookie('messageuser',$messageuser,time()+3600);

if($token!='null'){
    header('Location: ./display.php');
}else{
    echo "<br>YOU HAVENT REGISTERED <a href='index.php'>SIGNIN AGAIN?</a>'";
    setcookie('token','',time()-3600);
}
}


?>
