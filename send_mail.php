<?php
if(isset($_GET['q']))
{
	$receive=json_decode($_GET['q']);

	$to=$receive->contact;
	$name=$receive->name;
	$location=$receive->location;
	$subject=$receive->title;
	$message="Hi Aditya,\n\nThis is a mail from the viewer of your portfolio website with some message.\n\n Job Title : ".$subject."\n\n Description : ".$receive->description."\n\n Organization Name : ".$name."\n\nEmail Address : ".$to."\n\n Location : ".$location;
	if(mail('adityaa803@gmail.com', $subject, $message, 'From: noreply@adi.esy.es'))
		echo 1;
	else
		echo 0;
}
?>