<?php

use Bitrix\Main\Loader;
use Bitrix\Main\Config\Option;
use Bitrix\Sale\PaySystem;
use Bitrix\Sale;
use Bitrix\Sale\Order as bitrixOrder;
use Bitrix\Sale\DiscountCouponsManager;
use Bitrix\Main\Mail\Event;
use Bitrix\Sale\Basket;
use Bitrix\Sale\Internals;

class BMethods {
  // Рекурсивная функция ищет родительскую секцию по id
  static function parentSection($id) {
    $tt = CIBlockSection::GetList([], ['ID' => $id]);
    $as = $tt->GetNext();
    static $a;

    if ($as['DEPTH_LEVEL'] == 1) {
      $a = $as['ID'];
    } else {
      BMethods::parentSection($as['IBLOCK_SECTION_ID']);
    }
    return $a;
  }

  // Добавляет email пользователя в подписку
  static function shadowSub($email) {
    if (empty($email)) return;
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) return;

    CModule::IncludeModule('subscribe');

    $arFieldsSub = [
      "FORMAT" => 'html',
      "EMAIL" => $email,
      "ACTIVE" => 'Y',
      "RUB_ID" => [],
      'SEND_CONFIRM ' => 'N',
      'CONFIRMED' => 'Y',
    ];

    $subscr = new CSubscription;

    $res = $subscr->Add($arFieldsSub);

    if ((int) $res > 0) {
      CSubscription::Authorize($res);
    }
  }

  static function resizeImg($id, $w, $h, $wh = false) {
    if(empty($id)) return;

    return CFile::ResizeImageGet($id, array('width' => $w, 'height' => $h), BX_RESIZE_IMAGE_PROPORTIONAL, true, $wh)['src'];
  }

  static function inGroup($arr) {
    $USER = new CUser();

    $arGroupAvalaible = $arr;
    $arGroups = CUser::GetUserGroup($USER->GetID());

    return array_intersect($arGroupAvalaible, $arGroups);
  }
}
