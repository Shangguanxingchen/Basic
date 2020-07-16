<?php

//    $username = $_GET["user"];
//    $password = $_GET["key"];
    $username = $_POST["user"];
    $password = $_POST["key"];

    if ($username == 'abc' && $password == '123123') {
        echo 'true';
    } else {
        echo 'false';
    }

?>