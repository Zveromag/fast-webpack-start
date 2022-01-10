<?php
require $_SERVER['DOCUMENT_ROOT'].'/vendor/phpfastcache-7/lib/Phpfastcache/Autoload/Autoload.php';

use Phpfastcache\Config\Config;
use Phpfastcache\Helper\Psr16Adapter;

class Cache {

  protected static $cache;

  public function __construct($driver = 'Files', $config = []) {
    $configIntance = new Config($config);
    self::$cache = new Psr16Adapter($driver, $configIntance);
  }

  public static function __callStatic($method, $params) {
    return self::$cache->$method(...$params);
  }

}
