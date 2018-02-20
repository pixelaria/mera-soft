<?
$arUrlRewrite = array(
	array(
		"CONDITION" => "#^/company/licenses/#",
		"RULE" => "",
		"ID" => "bitrix:news",
		"PATH" => "/company/licenses/index.php",
	),
	array(
		"CONDITION" => "#^/company/partners/#",
		"RULE" => "",
		"ID" => "bitrix:news",
		"PATH" => "/company/partners/index.php",
	),
	array(
		"CONDITION" => "#^/company/licenses/#",
		"RULE" => "",
		"ID" => "bitrix:news",
		"PATH" => "/company/sertificats/index.php",
	),
	array(
		"CONDITION" => "#^/company/vacancy/#",
		"RULE" => "",
		"ID" => "bitrix:news",
		"PATH" => "/company/vacancy/index.php",
	),
	array(
		"CONDITION" => "#^/company/history/#",
		"RULE" => "",
		"ID" => "bitrix:news",
		"PATH" => "/company/history/index.php",
	),
	array(
		"CONDITION" => "#^/info/articles/#",
		"RULE" => "",
		"ID" => "bitrix:news",
		"PATH" => "/info/articles/index.php",
	),
	array(
		"CONDITION" => "#^/company/staff/#",
		"RULE" => "",
		"ID" => "bitrix:news",
		"PATH" => "/company/staff/index.php",
	),
	array(
		"CONDITION" => "#^/info/stock/#",
		"RULE" => "",
		"ID" => "bitrix:news",
		"PATH" => "/info/stock/index.php",
	),
	array(
		"CONDITION" => "#^/info/news/#",
		"RULE" => "",
		"ID" => "bitrix:news",
		"PATH" => "/info/news/index.php",
	),
	array(
		"CONDITION" => "#^/services/#",
		"RULE" => "",
		"ID" => "bitrix:news",
		"PATH" => "/services/index.php",
	),
	array(
		"CONDITION" => "#^/info/faq/#",
		"RULE" => "",
		"ID" => "bitrix:news",
		"PATH" => "/support/index.php",
	),
	array(
		"CONDITION" => "#^/info/faq/#",
		"RULE" => "",
		"ID" => "bitrix:news",
		"PATH" => "/info/faq/index.php",
	),
	array(
		"CONDITION" => "#^/projects/#",
		"RULE" => "",
		"ID" => "bitrix:news",
		"PATH" => "/projects/index.php",
	),
	array(
		"CONDITION" => "#^/catalog/#",
		"RULE" => "",
		"ID" => "bitrix:news",
		"PATH" => "/catalog/index.php",
	),
    array(
		"CONDITION" => "#^/ws/audits/([0-9]+)/(.*)#",
		"RULE" => "/ws/audits/detail.php?id=\$1",
		"ID" => "",
		"PATH" => "",
	),

	array(
		"CONDITION" => "#^/ws/actions/([0-9]+)/(.*)#",
		"RULE" => "/ws/actions/detail.php?id=\$1",
		"ID" => "",
		"PATH" => "",
	),

	array(
		"CONDITION" => "#^/ws_demo/audits/([0-9]+)/(.*)#",
		"RULE" => "/ws_demo/audits/detail.php?id=\$1",
		"ID" => "",
		"PATH" => "",
	),

	array(
		"CONDITION" => "#^/ws_demo/actions/([0-9]+)/(.*)#",
		"RULE" => "/ws_demo/actions/detail.php?id=\$1",
		"ID" => "",
		"PATH" => "",
	),







);

?>