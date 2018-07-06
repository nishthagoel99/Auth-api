<?php
session_start();
if(isset($_COOKIE['token'])):
    setcookie('token','', time()-3600);
    setcookie('messageuser','', time()-3600);
endif;
session_destroy();
//setcookie('token',0);

echo "You successfully logged out <a href='index.php'>Login again</a>";
?>