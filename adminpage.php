<?php
//echo $message;
$jsondata=json_decode($response1->data,true);
$arr=array_values($jsondata);
$temp="<br>";
echo 'HEllO ADMIN';
	
	$temp="<table>";
	$temp.="<tr><th>Name</th>";
	$temp.="<th>Password</th></tr>";
	for($i=0;$i<count($jsondata);$i++){
		//echo $jsondata[$i]["Name"];
		$temp .="<tr>";
		$temp.="<td>" .$jsondata[$i]["Name"] . "</td>";
		$temp.="<td>" .$jsondata[$i]["Password"] . "</td>";
		$temp.= "</tr>";
	}
	$temp.="</table>";
	echo $temp;
	echo "click here for logout <a href='logout.php'>logout</a>";
		?>