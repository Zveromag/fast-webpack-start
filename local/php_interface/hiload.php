<?php

	use Bitrix\Highloadblock\HighloadBlockTable;

	/**
	 * Класс для работы с хайлоодами.
	 */
	class WorkWithHiload
	{

		/**
		 * Сохраняем данные в хайлоад
		 * @param  Int $id ID хайлоода.
		 * @param  Array $param Массив данных для сохраннеия ("UF_*" => "Данные").
		 * @return Int ID созданного значения.
		 */
		function SaveDataToHL($id, $param) {
			$hlblock = HighloadBlockTable::getById($id)->fetch();
			$entity = HighloadBlockTable::compileEntity($hlblock);
			$entity_data = $entity->getDataClass();
			$result = $entity_data::add($param);
			$id = $result->getId();
			return $id;
		}

		/**
		 * Изменяем данные в хайлоад
		 * @param  Int $id ID хайлоода.
		 * @param  Int $elemId ID изменяемого значниея.
		 * @param  Array $param Массив данных для сохраннеия ("UF_*" => "Данные").
		 * @return Int ID созданного значения.
		 */
		function UpdateDataToHL($id, $elemId, $param) {
			$hlblock = HighloadBlockTable::getById($id)->fetch();
			$entity = HighloadBlockTable::compileEntity($hlblock);
			$entity_data = $entity->getDataClass();
			$result = $entity_data::update($elemId, $param);
			$id = $result->getId();
			return $id;
		}

		/**
		 * Удалить элемент хайлоада
		 * @param  Int $id ID хайлоода.
		 * @param  Int $elemId ID удаляемого элемента.
		 */
		function DeleteDataToHL($id, $elemId) {
			$hlblock = HighloadBlockTable::getById($id)->fetch();
			$entity = HighloadBlockTable::compileEntity($hlblock);
			$entity_data = $entity->getDataClass();
			$result = $entity_data::delete($elemId);
			if($result->isSuccess())
				return 1;
			else
				return 0;
		}

		/**
		 * Загружаем данные из хайлоада
		 * @param  Int $id ID хайлоода.
		 * @param  Array $filter Массив данных ("UF_*" => "Данные").
		 * @param  Array $select Массив данных ("UF_*").
		 * @param  Array $order Массив данных ("UF_*" => "ASC").
		 * @param  Array $group Массив данных ("UF_*").
		 * @param  Int $limit Число
		 * @param  Int $offset Число
		 * @return Array Массив данных.
		 */
		function LoadDatafromHL($id, $filter, $select, $order, $limit, $group, $offset, $count_total = false) {
			Bitrix\Main\Loader::includeModule("highloadblock");
			$data = array();
			if (!isset($order)){
				$order = array('ID' => 'ASC');
			}
			if (!isset($filter)){
				$filter = array();
			}
			if (!isset($select)){
				$select = array('*');
			}
			if (!isset($limit)){
				$limit = '';
			}
			if (!isset($group)){
				$group = array();
			}
			if (!isset($offset)) {
				$offset = '';
			}
			$arHLBlock = HighloadBlockTable::getById($id)->fetch();
			$obEntity = HighloadBlockTable::compileEntity($arHLBlock);
			$strEntityDataClass = $obEntity->getDataClass();
			$rsData = $strEntityDataClass::getList(array(
				'filter' => $filter,
				'select' => $select,
				'order' => $order,
				'limit' => $limit,
				'group' => $group,
				'offset' => $offset,
				'count_total' => $count_total,
			));
			if ($count_total){
				while ($arItem = $rsData->Fetch()) {
						$data['data'][$arItem['ID']] = $arItem;
				}
				$data['total'] = count($data['data']);
			}
			else {
				while ($arItem = $rsData->Fetch()) {
					$data['data'][$arItem['ID']] = $arItem;
				}
			}

			$data['data'] = array_values($data['data']);

			return $data;
		}

    function GetId($name) {
      return HighloadBlockTable::getList(['filter' => ['TABLE_NAME' => $name]])->fetch()['ID'];
    }
	}
