<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
$email = 'airpowerkiev@gmail.com';
$type = isset($_POST['type']) ? (int) $_POST['type'] : 0;
$name = isset($_POST['us_name']) ? htmlspecialchars($_POST['us_name']) : '';
$phone = isset($_POST['phone']) ? htmlspecialchars($_POST['phone']) : '';
$response = [];
if($type == 1){
$city = isset($_POST['city']) ? htmlspecialchars($_POST['city']) : '';
$otdelenie = isset($_POST['otdelenie']) ? htmlspecialchars($_POST['otdelenie']) : '';
$sposob = isset($_POST['sposob']) ? htmlspecialchars($_POST['sposob']) : '';
$comment = isset($_POST['comment']) ? htmlspecialchars($_POST['comment']) : '';
$tovar = isset($_POST['tovar']) ? htmlspecialchars($_POST['tovar']) : '';
if($name){
if($phone){
if($city){
if($otdelenie){
if($sposob){
if($tovar){
$mail = new PHPMailer;
$mail->CharSet = 'UTF-8';
$mail->isSendmail();
$mail->setFrom($email);
$mail->addAddress($email);
$mail->Subject = 'Заказ';
$mail->msgHTML("Товар: {$tovar}<br>Имя: {$name}<br>Телефон: {$phone}<br>Город: {$city}<br>Отделение: {$otdelenie}<br>Способ оплаты: {$sposob}<br>Комментарий: {$comment}");
$mail->send();
$response['success'] = 'Заказ отправлен в обработку';
} else $response['error'] = 'Выберите товар';
} else $response['error'] = 'Выберите способ оплаты';
} else $response['error'] = 'Введите отделение';
} else $response['error'] = 'Введите город';
} else $response['error'] = 'Введите телефон';
} else $response['error'] = 'Введите имя';
} else {
if($name){
if($phone){
$mail = new PHPMailer;
$mail->CharSet = 'UTF-8';
$mail->isSendmail();
$mail->setFrom($email);
$mail->addAddress($email);
$mail->Subject = 'Заявка';
$mail->msgHTML("Name: {$name}<br>Phone: {$phone}");
$mail->send();
$response['success'] = 'Заявка отправлена';
} else $response['error'] = 'Введите телефон';
} else $response['error'] = 'Введите имя';
}
echo json_encode($response);
?>