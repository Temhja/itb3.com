<?php
header('Content-Type: application/json');
if($_SERVER['REQUEST_METHOD']!=='POST'){echo json_encode(['success'=>false]);exit;}
$name=htmlspecialchars(trim($_POST['name']??''));$phone=htmlspecialchars(trim($_POST['phone']??''));$message=htmlspecialchars(trim($_POST['message']??''));
if(!$name||!$message){echo json_encode(['success'=>false,'error'=>'missing']);exit;}
$mf=__DIR__.'/../data/messages.json';$msgs=file_exists($mf)?json_decode(file_get_contents($mf),true)??[]:[];
$msgs[]=['name'=>$name,'phone'=>$phone,'message'=>$message,'date'=>date('Y-m-d H:i')];
file_put_contents($mf,json_encode($msgs,JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE));
@mail('info@itb3.com',"رسالة جديدة من الموقع — ITB3","الاسم: $name\nالهاتف: $phone\nالرسالة:\n$message","From: noreply@itb3.com\r\nContent-Type: text/plain; charset=UTF-8");
echo json_encode(['success'=>true]);
