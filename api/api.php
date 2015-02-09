<?php
include('Requests-1.6.0/library/Requests.php');

Requests::register_autoloader();

$host = "http://www.predimania.com:8080";

$data = json_decode(file_get_contents("php://input"));
$data =  (array) $data;
extract($data);


switch ($_GET['opc']) {
    case "signin":
        get_login($username, $password, $host);
        break;

    case "get_perfil":
        get_bearer_auth($host, $uri="/saime-ws/v1.0/me");
        break;

    case "reg_usuario":
        post_basic_auth($URI="/saime-ws/v1.0/register/insert", $data);
        break;

    case "reg_persona":
    	post_bearer_auth($URI="/saime-ws/v1.0/passport/saveDataPersonal", $data);
        break;

    case "sol_ven_menor":
        post_bearer_auth($URI="/saime-ws/v1.0/passport/saveDataMinor", $data);
        break;

    case "sol_ext_mayor":
        post_bearer_auth($URI="/saime-ws/v1.0/passport/saveDataConsularPersonal", $data);
        break;

    case "sol_ext_menor":
        post_bearer_auth($URI="/saime-ws/v1.0/passport/saveDataConsularMinor", $data);
        break;

    case "validar_cita":
        get_bearer_auth($URI="/saime-ws/v1.0/passport/isValidProcessPersonal");
        break;


    case "modificar_registro":
        post_bearer_auth($URI="/saime-ws/v1.0/register/update", $data);
        break;

    case "detalle_tramites":
        post_bearer_auth($URI="/saime-ws/v1.0/transaction/details", $data);
        break;

    case "req_pass":
        post_basic_auth($URI="/saime-ws/v1.0/recover", $data);
        break;

    case "rechazar_cita":
        post_bearer_auth($URI="/saime-ws/v1.0/transaction/reject", $data);
        break;




    case "get_paises":
        get_bearer_auth($host, $uri="/saime-ws/v1.0/common/countryList");
        break;


    case "get_estados":
        get_bearer_auth($host, $uri="/saime-ws/v1.0/common/stateList");
        break;


    case "get_municipios":
        get_bearer_auth($host, $uri="/saime-ws/v1.0/common/townList");
        break;


    case "get_parroquias":
        get_bearer_auth($host, $uri="/saime-ws/v1.0/common/parishList");
        break;


    case "get_oficinas":
        get_bearer_auth($host, $uri="/saime-ws/v1.0/common/officeList");
        break;


    case "get_oficina_quota":
        post_bearer_auth($URI="/saime-ws/v1.0/passport/officeQuota");
        break;


    case "get_oficina_quota_all":
        post_bearer_auth($URI="/saime-ws/v1.0/passport/officeQuotaAll");
        break;


	case "get_cedula":
        post_bearer_auth($host, $uri="/saime-ws/v1.0/cedulado", $data);
        break;


    case "get_consulados":
        get_bearer_auth($URI="/saime-ws/v1.0/common/consularList");
        break;


    case "get_estado_tramites":
        post_bearer_auth($host, $uri="/saime-ws/v1.0/transaction/list", $data);
        break;


    case "get_oficinas_web":
        get_bearer_auth($URI="/saime-ws/v1.0/portal/oficinas");
        break;


    case "get_noticias_web":
        get_bearer_auth($URI="/saime-ws/v1.0/portal/noticias");
        break;


    case "get_tramites_web":
        get_bearer_auth($URI="/saime-ws/v1.0/portal/tramites");
        break;


    case "get_version":
        get_basic_auth($URI="/saime-ws/v1.0/healthcheck");
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
function get_login($username, $password, $host){

	$uri = "/saime-ws/oauth/token?grant_type=password&username=$username&password=$password";
	$headers = array('Content-Type' => 'application/json', 'Authorization' => 'Basic MzUzYjMwMmM0NDU3NGY1NjUwNDU2ODdlNTM0ZTdkNmE6Mjg2OTI0Njk3ZTYxNWE2NzJhNjQ2YTQ5MzU0NTY0NmM=');
	$response = Requests::post($host.$uri, $headers);
    $json = json_decode($response->body, true);

    //echo $response->body;
    
    
    if ($json['token_type'] == 'bearer') {
        
        setcookie("access_token", $json['access_token']); 
        $headers = array('Content-Type' => 'application/json', 'Authorization' => 'Bearer '.$json['access_token']);
        $response = Requests::get($host."/saime-ws/v1.0/me", $headers);
        $json = json_decode($response->body, true);

        echo '{"status":"granted", "msg":"Bienvenido, '.$json['firstName'].' '.$json['lastName'].'"}';
        
    }else{
        echo '{"status":"denied", "msg":"Usuario o Contrasena incorrecta"}';
    }

    

}


function get_bearer_auth($host, $uri){

	$headers = array('Content-Type' => 'application/json', 'Authorization' => 'Bearer '.$_COOKIE['access_token']);
	$response = Requests::get($host.$uri, $headers);
	echo $response->body;

}


function post_bearer_auth($host, $uri, $datos){
	
	$headers = array('Content-Type' => 'application/json', 'Authorization' => 'Bearer '.$_COOKIE['access_token']);
	$data = array('data' => parser_datos($datos), 'crc'=> gen_crc(parser_datos($datos)));
	$response = Requests::post($host.$uri, $headers, json_encode($data));
	echo $response->body;

}



function get_basic_auth($host, $uri, $datos){

	$headers = array('Content-Type' => 'application/json', 'Authorization' => 'Basic MzUzYjMwMmM0NDU3NGY1NjUwNDU2ODdlNTM0ZTdkNmE6Mjg2OTI0Njk3ZTYxNWE2NzJhNjQ2YTQ5MzU0NTY0NmM=');
	$response = Requests::get($host.$uri, $headers);
	echo $response->body;

}



function post_basic_auth($host, $uri, $datos){

	$headers = array('Content-Type' => 'application/json', 'Authorization' => 'Basic MzUzYjMwMmM0NDU3NGY1NjUwNDU2ODdlNTM0ZTdkNmE6Mjg2OTI0Njk3ZTYxNWE2NzJhNjQ2YTQ5MzU0NTY0NmM=');
	$data = array('data'=> parser_datos($datos), 'crc'=> gen_crc(parser_datos($datos)));
	$response = Requests::post($host.$uri, $headers, json_encode($data));
	var_dump($response->body);

}


?>

