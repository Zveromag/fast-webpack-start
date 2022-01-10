<?php

class GHelpers {
  /**
   * Разница в секундах между 2-мя датами
   * @param { string datetime } $endDate  https://www.php.net/manual/ru/datetime.formats.php
   * @param { string dateinterval } $addInterval
   * @return { int } timestamp
   */
  static function timeIntervalBetweenDates($endDate = 'now', $addInterval) {
    $start = new DateTime('now', new DateTimeZone('Europe/Moscow'));
    $end = new DateTime($endDate, new DateTimeZone('Europe/Moscow'));

    if ($addInterval) {
      $end->add(new DateInterval($addInterval));
    }

    return $end->getTimestamp() - $start->getTimestamp();
  }

  // Проверяет доступность файла по переданному пути
  static function getQueryAsset($filename) {
    $realfile = $_SERVER['DOCUMENT_ROOT'] . $filename;
    if (file_exists($realfile)) {
      $time = filectime($realfile);
      $size = filesize($realfile);
      return $filename . '?' . $time . $size;
    }
    return $filename;
  }

  // Возвращает SVG по имени и пути
  static function getSvg($name, $path='/local/templates/main/img/menu/') {
    $root = $_SERVER['DOCUMENT_ROOT'];
    $name = str_replace('-', '_', $name);
    $svg = file_get_contents($root . $path . $name . '.svg');
    return $svg;
  }

  // Генерирует строку запроса для пагинации
  static function paginate_build_query($base_path, $pagination_number, $page_number) {
    $query_string = $_GET;
    $query_string['PAGEN_' . $pagination_number] = $page_number;
    $page_params = http_build_query($query_string);

    return $base_path . '?' . $page_params;
  }

  // Приводит число к формату цены
  static function priceFormat($number) {
    return number_format($number, 2, ',', ' ');
  }

  // Генерирует номер
  static function getNumber($prefix = '', $length = 10) {
    $strChars = '1234567890ABCDEFGHJKMNOPQRSTUVWXYZ';
    $str = array();
    $strCharsLen = strlen($strChars) - 1;

    for ($i = 0; $i < $length; $i++) {
      $n = rand(0, $strCharsLen);
      $str[] = $strChars[$n];
    }

    $str = $prefix.implode($str);

    return $str;
  }

  // Генерирует пароль заданной длины
  static function createPassword($len) {
    $strChars = 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNOPQRSTUVWXYZ23456789';
    $pass = array();
    $strCharsLen = strlen($strChars) - 1;

    for ($i = 0; $i < $len; $i++) {
      $n = rand(0, $strCharsLen);
      $pass[] = $strChars[$n];
    }

    return implode($pass);
  }

  // Возвращает падеж слова $words[] по количеству предметов $num
  static function declension($number, $words) {
    $number = abs( floatval( str_replace(',', '.', $number) ) );
    if ($number > 100) $number %= 100;
    if ($number > 20) $number %= 10;
    if ($number == 1) return $words[0];
    if ($number >= 1.5 && $number <= 4.5) return $words[1];
    return $words[2];
  }

  // Сколько дней прошло с даты
  static function daysPassed($date) {
    $time = substr($date, -8, -3);
    $diffSec = time() - strtotime($date);
    $diff = [
      'd' => (date('d', $diffSec) - 1),
      'm' => (date('m', $diffSec) - 1),
      'y' => (date('y', $diffSec) - 70)
    ];
    if ($diff['y'] > 0) {
      return $diff['y'] . ' ' . GHelpers::declension($diff['y'], ['год', 'года', 'лет']) . ' назад';
    } elseif ($diff['m'] > 0) {
      return $diff['m'] . ' ' . GHelpers::declension($diff['m'], ['месяц', 'месяца', 'месяцев']) . ' назад';
    } elseif ($diff['d'] > 6) {
      $weeks = floor($diff['d'] / 7);
      return $weeks . ' ' . GHelpers::declension($weeks, ['неделю', 'недели', 'недель']) . ' назад';
    } elseif ($diff['d'] > 1) {
      return $diff['d'] . ' ' . GHelpers::declension($diff['d'], ['день', 'дня', 'дней']) . ' назад';
    } elseif ($diff['d'] > 0) {
      return 'вчера, ' . $time;
    } elseif ($diff['d'] === 0){
      return 'сегодня, ' . $time;
    }
  }
}
