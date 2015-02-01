<?php
include('Requests-1.6.0/library/Requests.php');

Requests::register_autoloader();

$data = json_decode(file_get_contents("php://input"));
$data =  (array) $data;
extract($data);


switch ($_GET['opc']) {
    case "signin":
        get_login($username, $password);
        break;

    case "get_tramime_detalles":
        get_tramime_detalles($data);
        break;

    case "set_nuevo_usuario":
        echo "set_nuevo_usuario";
        break;
        
    default:
        echo "ninguno";
}



function parser_datos($data){

	$data_string = "";
	foreach ($data as $key => $value) {
		$data_string .= $key.'='.$value.'&';
	}

	$data_string = trim($data_string, "&");
	return $data_string;
}


function gen_crc($data){
	$crc=md5("#@#->".$data."|~|");
	return $crc;
}


// Login
function get_login($username, $password){

	$url = "http://www.predimania.com:8080/saime-ws/oauth/token?grant_type=password&username=$username&password=$password";
	$headers = array('Content-Type' => 'application/json', 'Authorization' => 'Basic MzUzYjMwMmM0NDU3NGY1NjUwNDU2ODdlNTM0ZTdkNmE6Mjg2OTI0Njk3ZTYxNWE2NzJhNjQ2YTQ5MzU0NTY0NmM=');
	$response = Requests::post($url, $headers);
	echo $response->body;

}


// Obtener los datos del perfil del ciudadano
function get_perfil(){
	$url = "http://www.predimania.com:8080/saime-ws/v1.0/me";
	$headers = array('Content-Type' => 'application/json', 'Authorization' => 'Bearer <access_token>');
	$response = Requests::get($url, $headers);
	var_dump($response->body);

}

// Nuevo Usuario
function set_nuevo_usuario($datos){

	$url = "http://www.predimania.com:8080/saime-ws/v1.0/register/insert";
	$headers = array('Content-Type' => 'application/json', 'Authorization' => 'Basic MzUzYjMwMmM0NDU3NGY1NjUwNDU2ODdlNTM0ZTdkNmE6Mjg2OTI0Njk3ZTYxNWE2NzJhNjQ2YTQ5MzU0NTY0NmM=');
	$data = array('data'=> parser_datos($datos), 'crc'=> gen_crc(parser_datos($datos)));
	$response = Requests::post($url, $headers, json_encode($data));
	var_dump($response->body);

}


// Detalles del tramite
function get_tramime_detalles($datos){
	
	$url = 'http://www.predimania.com:8080/saime-ws/v1.0/transaction/details';
	$headers = array('Content-Type' => 'application/json', 'Authorization' => 'Bearer 406455a4-d7c2-44cd-9f56-777ef54c2679');
	$data = array('data' => parser_datos($datos), 'crc'=> gen_crc(parser_datos($datos)));
	$response = Requests::post($url, $headers, json_encode($data));
	var_dump($response->body);
	//$response['tramiteCritico'];
	//foreach ($response as $dato) {
	//	echo $dato['tramiteCritico'];
	//}

	//echo $data['crc'];
}





?>

