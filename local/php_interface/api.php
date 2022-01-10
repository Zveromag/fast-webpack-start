<?php
class Api {

  private $method;
  protected $allowedMethods = [
    'OPTIONS',
    'HEAD',
    'GET',
    'POST',
    'PUT',
    'DELETE',
    'PATCH'
  ];

  function __construct() {
    $this->method = $_SERVER['REQUEST_METHOD'];

    // header('Access-Control-Allow-Methods: OPTIONS, HEAD, POST, PUT, DELETE, PATCH');
    header('Access-Control-Allow-Methods: ' . implode(', ', $this->allowedMethods));
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('X-Content-Type-Options: nosniff');
    header('X-Frame-Options: SAMEORIGIN');
    header('X-XSS-Protection: 1; mode=block');

    if(!in_array($this->method, $this->allowedMethods)) {
      echo $this->response([ 'error' => '405 Method Not Allowed' ], 405);
      exit;
    }

    $this->contentType = $_SERVER['CONTENT_TYPE'];
  }

  protected function methodData() {
    if (preg_match('/^application\/json/i', $this->contentType)) {
      return json_decode(file_get_contents('php://input'), true);
    }

    if ($this->method === 'GET') return $_GET;
    if ($this->method === 'POST') return $_POST;
  }

  private function requestStatus($code) {
    $codes = [
      200 => 'OK',
      201 => 'Created',
      202 => 'Accepted',
      400 => 'Bad Request',
      401 => 'Unauthorized',
      403 => 'Forbidden',
      404 => 'Not Found',
      405 => 'Method Not Allowed',
      500 => 'Internal Server Error',
      520 => '520 Unknown Error',
    ];
    if (array_key_exists($code, $codes)) {
      return $codes[$code];
    }
    return $codes[200];
  }

  function response($data, $status = 200) {
    header('HTTP/1.1 ' . $status . ' ' . $this->requestStatus($status));
    return json_encode($data);
  }
}
