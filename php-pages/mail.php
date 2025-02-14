<?php
$name = $_POST['name'];
$mail = $_POST['mail'];

$formcontent = "Name: $name \n mail: $mail";
$recipient = "order@" . $_SERVER['HTTP_HOST'];
$subject = "Contact Form";
$mailheader = "From: $recipient \r\n";
mail($recipient, $subject, $formcontent, $mailheader) or die("Error!");


header("Location: thank_you.html");
exit();
?>
