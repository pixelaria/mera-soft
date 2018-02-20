<?
include_once($_SERVER['DOCUMENT_ROOT'].'/bitrix/modules/main/include/urlrewrite.php');

CHTTP::SetStatus("404 Not Found");
@define("ERROR_404","Y");

require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");



$APPLICATION->SetTitle("404 Not Found");
?>


<section class="section section--green">
  <div class="container">
    <div class="page__info page__info--promo">
      <p class="page__title">Ошибка 404</p>
      <p class="page__subtitle">К сожалению, указанная страница не существует или была удалена.</p>
      <a href="/" class="btn btn--orange btn--inline">Вернуться на главную</a>
    </div>
  </div>
</section>
<section class="section section--white">
  <div class="container">
    <h2 class="section__title">Карта сайта</h2>
    <?
      $APPLICATION->IncludeComponent("pixelaria:sitemap", ".default", Array(
        "LEVEL" =>  "3",
        "COL_NUM" =>  "2",
        "SHOW_DESCRIPTION"  =>  "Y",
        "SET_TITLE" =>  "Y",
        "CACHE_TIME"  =>  "36000000"
        )
      );
      ?>    
  </div>
</section>
<section class="section section--green">
  <div class="container">
    <?$APPLICATION->IncludeComponent(
      "pixelaria:form",
      "inline",
      
      Array(
        "IBLOCK_TYPE" => "aspro_allcorp_form",
        "IBLOCK_ID" => 39,
        "USE_CAPTCHA" => false,
        "AJAX_MODE" => "Y",
        "AJAX_OPTION_JUMP" => "Y",
        "AJAX_OPTION_STYLE" => "Y",
        "AJAX_OPTION_HISTORY" => "N",
        "CACHE_TYPE" => "A",
        "CACHE_TIME" => "100000",
        "AJAX_OPTION_ADDITIONAL" => "",
        "DISPLAY_CLOSE_BUTTON" => "Y",
        "POPUP" => "Y",
        "IS_PLACEHOLDER" => "N",

        /* CUSTOM */
        "SUCCESS_MESSAGE" => "Спасибо за подписку на новости!",
        "FORM_TEXT" => "Подпишитесь на рассылку и узнавайте о важных обновлениях программы, акциях и скидках первыми!",
        "FORM_TEXT_CLASS" => "section__text section__text--big",
        
        "FORM_CLASS" => "form form--news",
        "SEND_BUTTON_CLASS" => "btn btn--full btn--tr",
        "SEND_BUTTON_NAME" => "Подписаться",
        "SINGLE_FIELD" => "EMAIL",
        "FIELD_CLASS" => "",
        
        "CLASSES" => array(
          0 => "col-12",
          1 => "col-sm-8 col-lg-9",
          2 => "col-sm-4 col-lg-3"
        )
      )
    );?>
  </div>
</section>


<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>