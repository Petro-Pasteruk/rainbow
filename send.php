<?php

if($_POST) { //Массив параметров которые пришли через POST запрос

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

    $project_name = "Rainbow заявка";//Тема письма
    $admin_email = "petropasteruk@gmail.com";//То куда отправляем

    $message = 'Стоимость: '.$price. '.' . '<br />';
    $message .= 'Конструкция: '.$construction. '.' . '<br />';
    $message .= 'Цвета шаров: '.$design. '.' . '<br />';
    $message .= 'Количество сетов: '.$countSets. '.' . '<br />';
    $message .= 'Коментарий: '.$comments. '.' . '<br />';
    $message .= 'Адрес: '.$address. '.' . '<br />';
    $message .= 'Дата: '.$date. '.' . '<br />';
    $message .= 'Время: '.$time. '.' . '<br />';
    $message .= 'Доставка: '.$delivery. '.' . '<br />';
    $message .= 'Имя: '.$name. '.' . '<br />';
    $message .= 'Email: '.$email. '.' . '<br />';
    $message .= 'Телефон: '.$phone. '.' . '<br />';

    function adopt($text)
    {
        return '=?UTF-8?B?' . Base64_encode($text) . '?=';
    }

    $headers = "MIME-Version: 1.0" . PHP_EOL .
        "Content-Type: text/html; charset=utf-8" . PHP_EOL . //кодировка письма
        'From: ' . adopt($project_name) . '<admin@vivel.ru>' . PHP_EOL . //от кого отправляем, а именно с какого доммена или почты
        'Reply-To: ' . $admin_email . '' . PHP_EOL; //кому отправляем


    mail($admin_email, adopt($project_name), $message, $headers);
}
?>

