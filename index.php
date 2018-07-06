<?php
session_start();
if(!isset($_COOKIE['token'])){
	include('homepage.php');
}else{
	include('display.php');
}
?>






