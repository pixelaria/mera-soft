 var markers = [
    ["Выборгское шоссе, д. 132",60.05842, 30.3043183,false],
    ["Приморский пр., д.50",59.98247600000001,30.240202,false],
    ["Уманский переулок 68 к.1",59.966311, 30.45377,false],
    ["ул.Константина Заслонова, д.23,к.4",59.918769, 30.344165,false],
    ["Обуховской обороны, д.105",59.895222, 30.434068,false],
    ["Пр. Стачек д. 45 к.2",59.88741100000001, 30.259533,false],
    ["Софийская ул., д.14",59.881150, 30.397570,false],
    ["Пр. Металлистов., д. 51",59.968752, 30.4164554,false],
    ["Михаила Дудина, д.21А",60.069740, 30.342242,false]
];
var t; //карта

function init_map() {
  console.log('init_map');
  var e = new google.maps.StyledMapType([{
          featureType: "all",
          stylers: [{
              saturation: -80
          }]
      }, {
          featureType: "road.arterial",
          elementType: "geometry",
          stylers: [{
              hue: "#00ffee"
          }, {
              saturation: 50
          }]
      }, {
          featureType: "water",
          stylers: [{
              color: "#cccccc"
          }]
      }, {
          featureType: "poi.business",
          elementType: "labels",
          stylers: [{
              visibility: "off"
          }]
      }], {
          name: "Custom Style"
      });

  o = "custom_style",
  t = new google.maps.Map(document.getElementById("map"), {
      zoom: 10,
      scrollwheel: !1,
      center: {
          lat: 59.97365450000001,
          lng: 30.314455825000003
      },
      mapTypeControlOptions: {
          mapTypeIds: [google.maps.MapTypeId.ROADMAP, o]
      }
  }),
  n = (new google.maps.MarkerImage("../img/pin.png", new google.maps.Size(84, 86), new google.maps.Point((-10), (-14)), new google.maps.Point(52, 46)), new google.maps.MarkerImage("../img/pin.png", new google.maps.Size(70, 88), new google.maps.Point((-17), (-8)), new google.maps.Point(35, 44)));

  for (var i = 0; i < markers.length; i++) {
      var marker = markers[i];
      var ltlng = new google.maps.LatLng(marker[1], marker[2]);
      var mk = new google.maps.Marker({
          position: ltlng,
          map: t,
          optimized: !1,
          icon: n,
          title: marker[0],
          qwe: false
      });

      mk.addListener('click', function() {
          var info = new google.maps.InfoWindow({
              content: "<p style='color:#000'>"+this.title+"</p>"
          });
          info.open(t, this);
      });

      marker[3] = mk;
  }


  $("body").on("mouseover", 'img[src="pin.png"]', function(e) {
      var o = $(e.target).parent().css("left"),
          t = $(e.target).parent().css("top");
      $('img[src="pin.png"]').filter(function() {
          return e.target != this && $(this).parent().css("left") == o && $(this).parent().css("top") == t
      }).css("-webkit-transform", "scale(1.3)", "transition: 2s")
  }), $("body").on("mouseout", 'img[src="pin.png"]', function(e) {
      var o = $(e.target).parent().css("left"),
          t = $(e.target).parent().css("top");
      $('img[src="pin.png"]').filter(function() {
          return e.target != this && $(this).parent().css("left") == o && $(this).parent().css("top") == t
      }).css("-webkit-transform", "scale(1)", "transition: 2s")
  }), t.mapTypes.set(o, e), t.setMapTypeId(o);
}

$(function (){
  console.log('init');

  $('.section--page .parallax-layer').parallax({
    mouseport: $("body"),
    
    xorigin: 0,
    yorigin: 0
  },{xparallax: '15px'},{xparallax: '50px'},{xparallax: '100px'});


  $('.info__item:nth-child(1) .parallax-layer').parallax({
    mouseport: $(this).find('.info__item:nth-child(1) .info__img'),
    xparallax: '15px',
    yparallax: '15px',
    xorigin: 0,
    yorigin: 0
  });

  $('.info__item:nth-child(2) .parallax-layer').parallax({
    mouseport: $(this).find('.info__item:nth-child(2) .info__img'),
    xparallax: '15px',
    yparallax: '15px',
    xorigin: 0,
    yorigin: 0
  });

  $('.info__item:nth-child(3) .parallax-layer').parallax({
    mouseport: $(this).find('.info__item:nth-child(3) .info__img'),
    xparallax: '15px',
    yparallax: '15px',
    xorigin: 0,
    yorigin: 0
  });

  $(document).on('click','.select', function(e){
    $(this).toggleClass('select--opened');
    return false;
  });

  $(document).on('click','.select__item', function(e){
    var text = $(this).html();
    var select = $(this).closest('.select');
    select.find('.select__input').val(text);
    select.find('.select__input').trigger('change');
    select.find('.select__placeholder').html(text);
    select.removeClass('select--opened');
    return false;
  });
  
  $('.select__item--map').click(function(e){
      var data = $(this).data('index');
      var marker = markers[parseInt(data)];
      t.setCenter(marker[3].getPosition());
      t.setZoom(14);
      google.maps.event.trigger(marker[3], 'click');
  });


  $('.navbar-toggler').click(function(e){
    var target = $(this).data('target');
    $('#'+target).toggleClass('nav--active');
  });

  $('.im--phone').mask('+7 (000) 000-00-00');
  
  var swiper_photos = new Swiper('.swiper--photos', {
    effect: 'coverflow',
    loop: false,
    centeredSlides: true,
    slidesPerView: 3,
    initialSlide: 1,
    
    navigation: {
      nextEl: '.swiper--photos .swiper-button-next',
      prevEl: '.swiper--photos .swiper-button-prev',
    },
    coverflowEffect: {
      rotate: 0,
      slideShadows: true,
      stretch: -70,
      depth: 250
    },
    breakpoints: {
      // when window width is <= 640px
      640: {
        slidesPerView: 1,
        spaceBetween: 30,
        stretch:-150,
        depth:50
      }
    }
  });

  var swiper = new Swiper('.swiper--reviews', {
    spaceBetween: 120,
    navigation: {
      nextEl: '.swiper--reviews .swiper-button-next',
      prevEl: '.swiper--reviews .swiper-button-prev',
    },
    pagination: {
      el: '.swiper--reviews .swiper-pagination',
      type: 'bullets',
      clickable: true
    },
  });

  console.log('init');

  var flexslider = $('.flexslider').flexslider({
    animation: "slide",
    controlNav: "thumbnails"
  });

  // Переносим навигацию для верной пагинации
  let $container = $('.flex-viewport');
  $container.append($('.flex-direction-nav'));


  $(document).on('click','.swiper--photos .swiper-slide', function(e){
    $('body').addClass('noscroll');
    $('#photos').addClass('overlay--active');
    var index = swiper_photos.activeIndex;
    flexslider.flexslider(index);
    return false;
  });

  $(document).on('click','.overlay__close', function(e){
    $('body').removeClass('noscroll');
    $('.overlay').removeClass('overlay--active');

    if ($(this).hasClass('overlay__close--remove')) {
      $(this).closest('.overlay').remove();
    }
    return false;
  });

  $('body').delegate('*[data-event="jqm"]', 'click', function(e) {
    var overlay = $(this).data('overlay');
    if (overlay) {
      $('#'+overlay).addClass('overlay--active');
      $('body').addClass('noscroll');
    }
    return false;
  });

  $('body').delegate('.scroll-to-target', 'click', function(e) {
    console.log('scroll-to-target');
    var target = $(this).attr('href');
    var offset = 200;
    if ($(this).data('offset') != undefined) offset = $(this).data('offset');
    
    $.scrollTo(target, 600, { offset: -offset });
    
    return false;
  });

  $(window).scroll(function(){
    var header = $('.header'),
        main = $('.main'),
        scroll = $(window).scrollTop();
    if (scroll >= 250) {
      header.addClass('header--fixed');
      main.addClass('main--fixed');
    } else {
      header.removeClass('header--fixed');
      main.removeClass('main--fixed');
    }
  });
});