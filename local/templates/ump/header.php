<?php if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) {
  die();
} ?>
<?php
global $USER;

use Bitrix\Main\Page\Asset;
use Bitrix\Main\Loader;

CModule::IncludeModule("iblock");

$dir = $APPLICATION->GetCurDir(true);
$page = $APPLICATION->GetCurPage(true);
?>
<?php $APPLICATION->ShowPanel() ?>
<?php $APPLICATION->ShowHead() ?>
<?php $APPLICATION->ShowTitle() ?>
