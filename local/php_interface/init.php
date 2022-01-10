<?php
define('ROOT_PATH', $_SERVER['DOCUMENT_ROOT']);

require(ROOT_PATH . '/local/php_interface/vars.php'); // Подключаем переменные
require(ROOT_PATH . '/local/php_interface/function.php'); // Подключаем доп функции
//require(ROOT_PATH . '/local/php_interface/agents/init.php'); // Подключаем агентов

CModule::IncludeModule('catalog');

CModule::AddAutoloadClasses(
  '',
  array(
    'BMethods' => '/local/php_interface/baseMethods.php', // Подключаем методы для работы с базой
    'GHelpers' => '/local/php_interface/helpers.php', // Подключем класс хелперов
    'WorkWithHiload' => '/local/php_interface/hiload.php', // Подключаем класс для работы с hload блоками
    'Api' => '/local/php_interface/api.php', // Базовый класс для Api
    'Cache' => '/local/php_interface/facade/cacheFacade.php', // Фасад для кеша
  )
);

// Инитим фасад кеша, с настройками
new Cache('Files', [
  'path' => ROOT_PATH . '/cache',
  'itemDetailedDate' => false
]);

require(ROOT_PATH . '/local/php_interface/events.php'); // Подключаем события
