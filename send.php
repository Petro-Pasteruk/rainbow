<?php

$price = $_POST["price"];
$construction = $_POST["construction"];
$design = $_POST["design"];
$countSets = $_POST["countSets"];
$comments = $_POST["comments"];
$address = $_POST["address"];
$date = $_POST["date"];
$time = $_POST["time"];
$delivery = $_POST["delivery"];
$name = $_POST["name"];
$email = $_POST["email"];
$phone = $_POST["phone"];

$message = 'Стоимость: '.$price.'. ';
$message .= 'Конструкция: '.$construction.'. ';
$message .= 'Цвета шаров: '.$design.'. ';
$message .= 'Количество сетов: '.$countSets.'. ';
$message .= 'Коментарий: '.$comments.'. ';
$message .= 'Адрес: '.$address.'. ';
$message .= 'Дата: '.$date.'. ';
$message .= 'Время: '.$time.'. ';
$message .= 'Доставка: '.$delivery.'. ';
$message .= 'Имя: '.$name.'. ';
$message .= 'Email: '.$email.'. ';
$message .= 'Телефон: '.$phone.'. ';

$subject = 'Reinbow request';
$to = 'petropasteruk@gmail.com';
$spectex = '<!DOCTYPE HTML><html><head><title>Reinbow request</title></head><body>';
$headers = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
if (isset($_POST['send'])) {
    mail( $to , $subject, $spectex.$message.'</body></html>', $headers );
}

?>

