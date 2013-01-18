<?php

header('X-UA-Compatible: IE=edge');
header('Content-Language: en');
header('Content-Type: text/html; charset=utf-8');
header('Cache-Control: no-transform');

// This allows us to deal with a desktop-sized viewport switch when js is disabled.
// If $desktop is true the <meta> viewport is set to a desktop width, else: device width.
$desktop = false;

if (isset($_GET['desktop'])) {
	$desktop = true;
}

// This allows us to return just the content for use with the History API.
$xhr = false;

if (isset($_SERVER['HTTP_PARTIAL'])) {
	$xhr = true;
}