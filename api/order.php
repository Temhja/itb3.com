<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
$of = __DIR__.'/../data/orders.json';
$pf = __DIR__.'/../data/products.json';
function load($f){if(!file_exists($f))return[];$r=file_get_contents($f);return json_decode($r,true)?:[];}
function save($f,$d){return file_put_contents($f,json_encode($d,JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE));}
if($_SERVER['REQUEST_METHOD']==='GET'){
  if(isset($_GET['list'])){$o=load($of);usort($o,fn($a,$b)=>strcmp($b['date']??'',$a['date']??''));echo json_encode(['orders'=>array_values($o)]);exit;}
  if(isset($_GET['track'])){$id=trim($_GET['track']);$o=load($of);$f=null;foreach($o as $x){if(($x['id']??'')===$id){$f=$x;break;}}echo json_encode($f?['found'=>true,'status'=>$f['status']??'pending','date'=>$f['date']??'']:['found'=>false]);exit;}
  echo json_encode(['ok'=>true]);exit;
}
if($_SERVER['REQUEST_METHOD']==='POST'){
  $action=$_POST['action']??'new';
  if($action==='update_status'){$id=trim($_POST['id']??'');$s=trim($_POST['status']??'pending');$v=['pending','printing','finishing','ready','delivered'];if(!in_array($s,$v)){echo json_encode(['success'=>false]);exit;}$o=load($of);$u=false;foreach($o as &$x){if(($x['id']??'')===$id){$x['status']=$s;$u=true;break;}}unset($x);if($u)save($of,$o);echo json_encode(['success'=>$u]);exit;}
  if($action==='save_products'){$raw=$_POST['data']??'';$d=json_decode($raw,true);if(!$d||!isset($d['products'])){echo json_encode(['success'=>false]);exit;}$ok=file_put_contents($pf,json_encode($d,JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE));echo json_encode(['success'=>$ok!==false]);exit;}
  $name=htmlspecialchars(trim($_POST['name']??''));$phone=htmlspecialchars(trim($_POST['phone']??''));$city=htmlspecialchars(trim($_POST['city']??''));$address=htmlspecialchars(trim($_POST['address']??''));$notes=htmlspecialchars(trim($_POST['notes']??''));$cart=$_POST['cart']??'[]';$total=intval($_POST['total']??0);$note=htmlspecialchars(trim($_POST['note']??''));
  if(!$name||!$phone){echo json_encode(['success'=>false,'error'=>'missing fields']);exit;}
  $oid='ITB-'.strtoupper(substr(md5(microtime()),0,6));
  $dp='';if(!empty($_FILES['design']['name'])){$ud=__DIR__.'/../data/uploads/';if(!is_dir($ud))mkdir($ud,0755,true);$ext=strtolower(pathinfo($_FILES['design']['name'],PATHINFO_EXTENSION));$al=['pdf','ai','psd','jpg','jpeg','png','zip'];if(in_array($ext,$al)&&$_FILES['design']['size']<52428800){$fn=$oid.'.'.$ext;move_uploaded_file($_FILES['design']['tmp_name'],$ud.$fn);$dp='data/uploads/'.$fn;}}
  $order=['id'=>$oid,'name'=>$name,'phone'=>$phone,'city'=>$city,'address'=>$address,'notes'=>$notes,'cart'=>json_decode($cart,true)?:[],'total'=>$total,'note'=>$note,'design'=>$dp,'status'=>'pending','date'=>date('Y-m-d H:i')];
  $orders=load($of);$orders[]=$order;$saved=save($of,$orders);
  @mail('info@itb3.com',"طلب جديد ITB3 — $oid","الاسم: $name\nالهاتف: $phone\nالإجمالي: $total\nالسلة:\n$cart","From: noreply@itb3.com\r\nContent-Type: text/plain; charset=UTF-8");
  echo json_encode(['success'=>$saved!==false,'order_id'=>$oid]);exit;
}
echo json_encode(['ok'=>true]);
