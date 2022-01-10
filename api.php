<?php
// Подключаем битрикс среду
require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/modules/main/include/prolog_before.php");

// подключаем fastroute
$base_dir = __DIR__ . '/vendor/nikic/fast-route/src/';
require_once($base_dir . 'bootstrap.php');

// автозагрузчик для собственных классов в роутах
spl_autoload_register(function ($class_name) {
  $file = __DIR__ . '/api/' . strtolower($class_name).'.php';
  if (file_exists($file)) {
    require_once($file);
    return;
  }
});

$dispatcher = FastRoute\simpleDispatcher(function(FastRoute\RouteCollector $r) {
  $routes = require_once(__DIR__ . '/api_routes.php');
  foreach ($routes as $route) {
    $r->addRoute($route[0], $route[1], $route[2]);
  }
});

$httpMethod = $_SERVER['REQUEST_METHOD'];
$uri = $_SERVER['REQUEST_URI'];

if (false !== $pos = strpos($uri, '?')) {
  $uri = substr($uri, 0, $pos);
}
$uri = rawurldecode($uri);

$routeInfo = $dispatcher->dispatch($httpMethod, $uri);
switch ($routeInfo[0]) {
  case FastRoute\Dispatcher::NOT_FOUND:
      http_response_code(404);
      include('404.php');
      break;
  case FastRoute\Dispatcher::METHOD_NOT_ALLOWED:
    $allowedMethods = $routeInfo[1];
      // ... 405 Method Not Allowed
      break;
  case FastRoute\Dispatcher::FOUND:
      $handler = $routeInfo[1];
      $vars = $routeInfo[2];
      list($class, $method) = explode("/", $handler, 2);
      call_user_func_array(array(new $class, $method), $vars);
      break;
}
