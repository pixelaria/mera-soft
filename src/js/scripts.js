function onLoadjqm(hash){
  var name = $(hash.t).data('name');

  if($(hash.t).data('autohide')){
    $(hash.w).data('autohide', $(hash.t).data('autohide'));
  }
  if(name == 'tariff'){
    if($(hash.t).data('tariff')) {
      var tariff = $(hash.t).data('tariff');
      $('input[name="TARIFF"]').val(tariff);
    }

    if($(hash.t).data('title')) {
      $('span.title').html($(hash.t).data('title'));
    }
  }
}

function onHide(hash){
  if($(hash.w).data('autohide')){
    eval($(hash.w).data('autohide'));
  }
  hash.w.empty();
  hash.o.remove();
  hash.w.removeClass('show');
}

$.fn.jqmEx = function(){
  
  $(this).each(function(){
    var _this = $(this);
    var name = _this.data('name');
    var lang = _this.data('language');
    var title = _this.data('title');
    
    if(name.length){
      var script = '/bitrix/components/pixelaria/form/ajax/form.php';
      if (lang && lang != 'ru')
        script = '/'+lang+script;
      
      var paramsStr = ''; var trigger = ''; var arTriggerAttrs = {};
      
      $.each(_this.get(0).attributes, function(index, attr){
        var attrName = attr.nodeName;
        var attrValue = _this.attr(attrName);
        trigger += '[' + attrName + '=\"' + attrValue + '\"]';
        arTriggerAttrs[attrName] = attrValue;
        if(/^data\-param\-(.+)$/.test(attrName)){
          var key = attrName.match(/^data\-param\-(.+)$/)[1];
          paramsStr += key + '=' + attrValue + '&';
        }
      });
      
      var triggerAttrs = JSON.stringify(arTriggerAttrs);
      var encTriggerAttrs = encodeURIComponent(triggerAttrs);
      script += '?' + paramsStr + 'data-trigger=' + encTriggerAttrs;
      
      if(!$('.' + name + '_frame[data-trigger="' + encTriggerAttrs + '"]').length){
        if(_this.attr('disabled') != 'disabled'){
          $('body').find('.' + name + '_frame[data-trigger="' + encTriggerAttrs + '"]').remove();
          $('body').append('<div class="' + name + '_frame jqmWindow" data-trigger="' + encTriggerAttrs + '"></div>');
          $('.' + name + '_frame[data-trigger="' + encTriggerAttrs + '"]').jqm({
            trigger: trigger, 
            onLoad: function(hash){
              onLoadjqm(hash);
              if (title && name=='popup') 
                $('.popup__title').html(title);
              $('.'+name + '_frame.jqmWindow').addClass('jqmWindow--active');
            }, 
            onHide: function(hash){
              $('.'+name + '_frame.jqmWindow').removeClass('jqmWindow--active');
              onHide(hash);
            },
            ajax:script,
          });
        }
      }
    }
  })
}

function initMap() {
  var uluru = {lat: 55.709759, lng: 37.597026};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    center: uluru
  });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });
}

function getVertexLabels(labels,language) {
  
  var checklist = ["Торговые сети", "АЗС", "Фитнес-клубы", "Производство", "Склад", "Банки", "Рестораны", "Кафе", "Транспорт"];
  var rack = ["Продукты питания","Косметика","Парфюмерия","Медикаменты","Одежда","Обувь","Мебель","Электроника","Книги, газеты","Строительство","Бытовые товары","Текстиль"];
  var portal = ["Сеть ресторанов", "Сеть быстрого питания", "Пиццерии", "Кофейни", "Сети АЗС", "Аптечные сети", "Сети магазинов", "Фитнес-клуб","Спортивные сети", "Винные сети", "Продуктовые сети", "Продажа электроники"];
  var control = ["Желдорнадзор", "МЧС", "Ространснадзор", "Россельхознадзор", "Росприроднадзор"];
  
  var checklist_en = ["Cafes", "Restaurants", "Pizzerias", "Hotels", "Fitness clubs", "Private clinics", "Water parks", "Retail networks", "Clinics", "Taxis", "Cinemas", "Banks"];
  var rack_en = ["Grocery","Cosmetics","Perfumery","Medical supplies","Clothes","Footwear","Furniture","Electronics","Books and newspapers","Construction","Consumer goods","Textile"];
  var portal_en = ["Restaurant chain", "Fast-food chain", "Pizzerias", "Coffee-shops", "Network of petrol stations", "Pharmacy chain", "Retail chain", "Fitness clubs","Sport goods chain", "Wine shops chain", "Grocery shops chain", "Chain of electronics stores"];
  var control_en = ["Желдорнадзор", "МЧС", "Ространснадзор", "Россельхознадзор", "Росприроднадзор"];

  var checklist_de = ["Cafés", "Restaurants", "Pizzerias", "Hotels", "Fitnessstudios", "Privatkliniken", "Spaßbäder", "Handelsketten", "Kliniken", "Taxi", "Kinos", "Banken"];
  var rack_de = ["Nahrungsmitel","Kosmetik","Parfümerie","Medikamenten","Kleidung","Schuhwaren","Möbel","Elektronik","Bücher, Zeitungen","Baubetrieb","Haushaltswaren","Textilien"];
  var portal_de = ["Restaurantkette", "Fast-Food-Kette", "Пиццерии", "Kaffeehäuser", "Tankstellenkette", "Apothekennkette", "Handelskette", "Fitnessstudio","Sportketten", "Weinhandelskette", "Lebensmittelkette", "Elektronikverkauf"];
  var control_de = ["Желдорнадзор", "МЧС", "Ространснадзор", "Россельхознадзор", "Росприроднадзор"];


  var result = [];
  switch (labels) {
    case 'checklist':
      switch (language) {
        case 'en':
          result=checklist_en;
        break;
        case 'de':
          result=checklist_de;
        break;
        case 'ru':
        default:
          result=checklist;
        break;
      }
    break;
    case 'rack':
       switch (language) {
        case 'en':
          result=rack_en;
        break;
        case 'de':
          result=rack_de;
        break;
        case 'ru':
        default:
          result=rack;
        break;
      }
    break;
    case 'portal':
      switch (language) {
        case 'en':
          result=portal_en;
        break;
        case 'de':
          result=portal_de;
        break;
        case 'ru':
        default:
          result=portal;
        break;
      }
    break;
    case 'control':
      switch (language) {
        case 'en':
          result=control_en;
        break;
        case 'de':
          result=control_de;
        break;
        case 'ru':
        default:
          result=control;
        break;
      }
    break;
  }
  return result;
};


var Icosahedron = function(t) {
  var e = this;
  e.options = t || {}, e.container = t.container, e.containerSize = {
    width: e.container.offsetWidth,
    height: e.container.offsetHeight
  }, e.MAX_SIZE = 450, e.OBJ_SCALE = 1.2, e.radius = t.radius || 120, e.vertexLabels = t.vertexLabels || [], e.mouseDown = !1, e.rotateStartPoint = new THREE.Vector3(0, 0, 1), e.rotateEndPoint = new THREE.Vector3(0, 0, 1), e.curQuaternion, e.idleRotationSpeed = .5 * Math.pow(e.containerSize.width / e.MAX_SIZE, 2), e.interactiveRotationSpeed = 1.5, e.lastMoveTimestamp = (new Date).getTime(), e.moveReleaseTimeDelta = 50, e.mouseStartPoint = {
    x: 0,
    y: 0
  }, e.delta = {
    x: 80 * Math.pow(e.containerSize.width / e.MAX_SIZE, 4),
    y: 80 * Math.pow(e.containerSize.width / e.MAX_SIZE, 4)
  }, e.scene = new THREE.Scene, e.camera = new THREE.PerspectiveCamera(75, e.containerSize.width / e.containerSize.height, .1, 2e3), e.camera.position.z = 200, e.renderer = new THREE.WebGLRenderer({
    antialias: !0,
    alpha: !0
  }), e.renderer.setPixelRatio(window.devicePixelRatio), e.renderer.setSize(e.containerSize.width, e.containerSize.height), e.renderer.setClearColor(16777215, 0), e.container.appendChild(e.renderer.domElement), e.setupLighting(), e.setupObject(), e.render = e.render.bind(e), e.onDragStart = e.onDragStart.bind(e), e.onDragMove = e.onDragMove.bind(e), e.onDragEnd = e.onDragEnd.bind(e), "ontouchend" in document ? document.addEventListener("touchstart", e.onDragStart, !1) : document.addEventListener("mousedown", e.onDragStart, !1), window.addEventListener("resize", function() {
    e.containerSize = {
      width: e.container.offsetWidth,
      height: e.container.offsetHeight
    }, e.renderer.setSize(e.containerSize.width, e.containerSize.height)
  })
};                                                                

Icosahedron.prototype = {
  setupLighting: function() {
    var t = this,
      e = new THREE.AmbientLight(16759263, .3);
    t.scene.add(e);
    var i = new THREE.PointLight(16768752, .5);
    i.position.z = 350, i.position.y = 200, i.position.x = -200, t.scene.add(i);
    var n = new THREE.PointLight(16756699, .4);
    n.position.z = 150, n.position.y = 100, n.position.x = 250, t.scene.add(n);
  },
  setupObject: function() {
    var t = this;
    
    t.material = new THREE.MeshPhongMaterial({
      color: new THREE.Color("rgb(47,198,85)"),
      emissive: new THREE.Color("rgb(65,180,102)"),
      emissiveIntensity: 0.25,
      specular: new THREE.Color("rgb(56,149,98)"),
      shininess: 8
    });

    t.geometry = new THREE.IcosahedronGeometry(t.radius, 0); 

    t.lowResMesh = new THREE.Mesh(t.geometry, t.material);

    (new THREE.OBJLoader).load("/assets/icosa.min.obj", function(e) {
      e.traverse(function(e) {
        if(e instanceof THREE.Mesh) {
          var i = (new THREE.Geometry).fromBufferGeometry(e.geometry);
          i.computeFaceNormals(), i.mergeVertices(), i.computeVertexNormals(), e.geometry = (new THREE.BufferGeometry).fromGeometry(i), e.material = t.material
        }
      }), t.highResMesh = e, t.highResMesh.scale.set(t.OBJ_SCALE, t.OBJ_SCALE, t.OBJ_SCALE), t.scene.add(t.highResMesh)
    });

    t.vertices = [];
    for(var e = 0; e < t.geometry.vertices.length; e++) {
      console.log(t.vertexLabels[e]);
      var i = document.createElement("div");
      var n = document.createElement("div");
      var r = document.createElement("div");
      
      if (t.vertexLabels[e]!=undefined) {
        i.classList.add("icosahedron__marker");
        i.classList.add("initially-hidden");
        n.classList.add("icosahedron__container");
        r.classList.add("icosahedron__label");
        r.innerHTML = t.vertexLabels[e];
      }
      
      n.appendChild(r);
      i.appendChild(n);
      t.container.appendChild(i);

      t.vertices.push({
        marker: i,
        labelContainer: n,
        label: r,
        z: -1
      });
    }
  },
  onDragStart: function(t) {
    var e = this;
    t.target == e.renderer.domElement && (t.preventDefault(), "ontouchend" in document ? (document.addEventListener("touchmove", e.onDragMove, !1), document.addEventListener("touchend", e.onDragEnd, !1)) : (document.addEventListener("mousemove", e.onDragMove, !1), document.addEventListener("mouseup", e.onDragEnd, !1)), e.mouseDown = !0, t.touches && (t = t.touches[0]), e.mouseStartPoint = {
      x: t.clientX,
      y: t.clientY
    }, e.rotateStartPoint = e.rotateEndPoint = e.projectOnTrackball(0, 0), window.siteAnalytics && window.siteAnalytics.trackRadarIcosahedron && window.siteAnalytics.trackRadarIcosahedron())
  },
  onDragMove: function(t) {
    var e = this;
    t.touches && (t = t.touches[0]), e.delta.x = t.clientX - e.mouseStartPoint.x, e.delta.y = t.clientY - e.mouseStartPoint.y, e.rotateObject(), e.mouseStartPoint.x = t.clientX, e.mouseStartPoint.y = t.clientY, e.lastMoveTimestamp = new Date
  },
  onDragEnd: function(t) {
    var e = this;
    (new Date).getTime() - e.lastMoveTimestamp.getTime() > e.moveReleaseTimeDelta && (e.delta.x = t.clientX - e.mouseStartPoint.x, e.delta.y = t.clientY - e.mouseStartPoint.y), e.mouseDown = !1, "ontouchend" in document ? (document.removeEventListener("touchmove", e.onDragMove, !1), document.removeEventListener("touchend", e.onDragEnd, !1)) : (document.removeEventListener("mousemove", e.onDragMove, !1), document.removeEventListener("mouseup", e.onDragEnd, !1))
  },
  vertexScreenCoordinates: function(t) {
    var e = this,
      i = e.geometry.vertices[t].clone();
    e.lowResMesh.updateMatrixWorld(), i.applyMatrix4(e.lowResMesh.matrixWorld);
    var n = i.project(e.camera);
    return n.x = (n.x + 1) / 2 * e.containerSize.width, n.y = -(n.y - 1) / 2 * e.containerSize.height, n
  },
  projectOnTrackball: function(t, e) {
    var i = this,
      n = new THREE.Vector3,
      r = window.innerWidth / 2,
      a = window.innerHeight / 2;
    n.set(i.clamp(t / r, -1, 1), i.clamp(-e / a, -1, 1), 0);
    var o = n.length();
    return o > 1 ? n.normalize() : n.z = Math.sqrt(1 - o * o), n
  },
  rotateMatrix: function(t, e, i) {
    var n = new THREE.Vector3,
      r = new THREE.Quaternion,
      a = Math.acos(t.dot(e) / t.length() / e.length());
    return a && (n.crossVectors(t, e).normalize(), a *= i, r.setFromAxisAngle(n, a)), r
  },
  rotateObject: function() {
    var t = this;
    t.rotateEndPoint = t.projectOnTrackball(t.delta.x, t.delta.y);
    var e = t.rotateMatrix(t.rotateStartPoint, t.rotateEndPoint, t.interactiveRotationSpeed);
    t.curQuaternion = t.lowResMesh.quaternion, t.curQuaternion.multiplyQuaternions(e, t.curQuaternion), t.curQuaternion.normalize(), t.lowResMesh.setRotationFromQuaternion(t.curQuaternion), t.highResMesh && t.highResMesh.setRotationFromQuaternion(t.curQuaternion), t.rotateEndPoint = t.rotateStartPoint
  },
  updateLabels: function() {
    for(var t = this, e = t.geometry.vertices.map(function(e) {
        return t.lowResMesh.localToWorld(e.clone()).z
      }).sort(function(t, e) {
        return t - e
      }), i = -t.radius, n = t.radius, r = .75, a = 1, o = n - i, s = a - r, c = 0; c < t.geometry.vertices.length; c++) {
      var h = t.vertexScreenCoordinates(c);
      t.vertices[c].marker.style.transform = "translate(" + h.x + "px," + h.y + "px)";
      var l = t.lowResMesh.localToWorld(t.geometry.vertices[c].clone());
      t.vertices[c].worldZ = l.z, l.z < 5 ? t.vertices[c].marker.classList.remove("icosahedron__marker--visible") : t.vertices[c].marker.classList.add("icosahedron__marker--visible");
      var u = e.indexOf(l.z);
      u > -1 && t.vertices[c].z != u && (t.vertices[c].z = u, t.vertices[c].marker.style.zIndex = u + 1e3);
      var d = (l.z - i) * s / o + r;
      t.vertices[c].label.style.transform = "scale(" + d + ")"
    }
  },
  render: function() {
    var t = this;
    if(requestAnimationFrame(t.render), !t.mouseDown) {
      var e = .92,
        i = t.idleRotationSpeed;
      t.delta.x < -i || t.delta.x > i ? t.delta.x *= e : t.delta.x = i * (t.delta.x < 0 ? -1 : 1), t.delta.y < -i || t.delta.y > i ? t.delta.y *= e : t.delta.y = i * (t.delta.y < 0 ? -1 : 1), t.rotateObject()
    }
    t.renderer.render(t.scene, t.camera), t.updateLabels()
  },
  show: function(t) {
    var e = this;
    setTimeout(function() {
      e.container.classList.add("visible"), e.render(), setTimeout(function() {
        e.vertices.forEach(function(t, e) {
          t.marker.style.display = "flex", setTimeout(function() {
            t.marker.classList.remove("initially-hidden")
          }, 30 * e + 100)
        })
      }, 1e3)
    }, t)
  },
  showConnection: function() {
    var t = this,
      e = 30;
    t.updateLabels();
    for(var i = t.vertices.filter(function(t) {
        return t.worldZ > e
      }), n = [], r = 0; r < 2; r++) n.push(i[Math.floor(Math.random() * i.length)]);
    for(var a = function(t) {
        setTimeout(function() {
          n[t].label.classList.add("highlighted"), setTimeout(function() {
            n[t].label.classList.remove("highlighted")
          }, 100 * t + 500)
        }, 250 * t)
      }, r = 0; r < 2; r++) a(r)
  },
  clamp: function(t, e, i) {
    return Math.min(Math.max(t, e), i)
  },
  setInterval: function(t, e) {
    var i = function(r) {
        r - n >= e && (n = r, t()), requestAnimationFrame(i)
      },
      n = performance.now();
    requestAnimationFrame(i)
  }
};
    
$(function (){

  if ($('.table').length) {   
    var Table = {
      base: parseInt(window.Tariffs.px_base),

      language: 'ru',
      ruble: 'руб.',

      //variables
      _license_user:5,
      _license_mobile:5,
      _license_portal:5,

      _license_total:0,

      t_license:[
        window.Tariffs.px_license_user,
        window.Tariffs.px_license_mobile,
        window.Tariffs.px_license_portal
      ],  
     
      result: 0,

      init: function() {
        console.log('table.init');
        Table = this; 

        Table.license_user = $('#license_user');
        Table.license_mobile = $('#license_mobile');
        Table.license_total = $('#license_total');

        var current_language = document.cookie.match(new RegExp("(?:^|; )current_language=([^;]*)"));
        Table.language = current_language ? decodeURIComponent(current_language[1]) : 'ru';

        if (Table.language!='ru') {
          Table.ruble = 'rub.';
        }

        $('.spinner__input').on('keydown', function(e){
          var val;
          if (e.which == 38) {
            val=parseInt($(this).val()) + 1;
          } else if (e.which == 40) {
            val=parseInt($(this).val()) - 1;
          }
          if (val<1) val=1;
          if (val>99) val=99;
          $(this).val(val).change();
          return false;
        });

        $('.table-switcher__cell').click(function(e){
          $('.table-switcher__cell').toggleClass('table-switcher__cell--active');
          $('.table__inner').toggleClass('table__inner--active');
        });

        $('.spinner__button').click(function(e){
          var target = $(this).siblings('.spinner__input--main');
          var change = 1,min = 0,max=9999;

          if (target.data('change') != undefined) change = parseInt(target.data('change'));
          if (target.data('min') != undefined) min = parseInt(target.data('min'));
          if (target.data('max') != undefined) max = parseInt(target.data('max'));
          
          var val;
          var current = parseInt(target.val());

          if ($(this).hasClass('spinner__button--up')) {
            if (current < 6 && (current+1)!=6) change = 1;
            val=parseInt(current) + change;
          } else {
            if (current < 6) change = 1;
            val=parseInt(current) - change;
          }
          
          if (val<min) val=min;
          if (val>max) val=max;

          $(target).val(val).change();
          return false;
        });


        $('.spinner__input').change(function(e){
        });

       Table.license_user.change(function(e){
          var val = parseInt($(this).val());
          Table._license_user = val;
          Table.calc_license();
        }); 

        Table.license_mobile.change(function(e){
          var val = parseInt($(this).val());
          Table._license_mobile = val;
          Table._license_portal = val;
          Table.calc_license();
        });

        Table.calc_license();
      },

      calc_license:function(){
        console.log('calc_license');
        Table._license_total = Table.base;

        var license_index = Table.get_index(Table._license_user),
            license_mobile_index = Table.get_index(Table._license_mobile),
            license_portal_index = Table.get_index(Table._license_portal);

        if (license_index > 2 ||
            license_mobile_index > 5 ||
            license_portal_index > 5) {
          Table.license_total.html('Договорная');
        } else {
          Table._license_total += Table.t_license[0][license_index]*Table._license_user +
                Table.t_license[1][license_mobile_index]*Table._license_mobile +
              Table.t_license[2][license_portal_index]*Table._license_portal;

          Table._license_total = Math.ceil(Table._license_total * 1.25);

          Table.license_total.html('от '+Table._license_total+' '+Table.ruble);
        }
      },

      get_index:function(value){
        var index = 0;
        if (value < 5) {
          index=0;
        } else if (value < 11) {
          index=1;
        } else if (value < 21) {
          index=2;
        } else if (value < 51) {
          index=3;
        } else if (value < 101) {
          index=4;
        } else if (value < 201){
          index=5;
        } else {
          index=6;
        }
        console.log('index:'+index);

        return index;
      }
    };
  }

  $('main').append('<div class="scroll-to-top"></div>');

  $(window).scroll(function(){
    var scroll = $(window).scrollTop();

    if (scroll >= 300) {
        $('.scroll-to-top').fadeIn();
    } else {
        $('.s').fadeOut();
    }
  });


  $('.scroll-to-top').click(function () {
      $('body,html').animate({
          scrollTop: 0
      }, 400);
      return false
  });


  var cookie_msg = document.cookie.match(new RegExp("(?:^|; )oamsk-cookie-active=([^;]*)"));
    cookie_msg = cookie_msg ? decodeURIComponent(cookie_msg[1]) : undefined;

  if(!cookie_msg) {
    $('.cookie').addClass('cookie--active');
   
  }

  $('.cookie__btn').click(function(e){
    $('.cookie').removeClass('cookie--active');
    document.cookie = "oamsk-cookie-active=1";
  });

  

  console.log('init');
  $('body').delegate('*[data-event="jqm"]','click', function(e){
    e.preventDefault();
    $(this).jqmEx();
    $(this).trigger('click');
  });

  $('body').delegate('*[data-event="jqms"]','click', function(e){
    console.log('jqms');
    $('.jqmOverlay').addClass('jqmOverlay--active');
    $('.popup--single').addClass('active');
    $('body').addClass('noscroll');
    return false;
  });
  
  $('body').delegate('.popup__closer--single','click', function(e){
    $('.jqmOverlay').removeClass('jqmOverlay--active');
    $(this).closest('.popup').removeClass('active');
    $('body').removeClass('noscroll');
  });

  $('.radioblock__item').click(function(e){
    $(this).parent().find('.radioblock__item').removeClass('radioblock__item--active');
    $(this).addClass('radioblock__item--active');
  });

  $('.radioblock--info .radioblock__item').click(function(e){
    var target = $(this).data('target');
    $('.info__text').removeClass('info__text--active');
    $('.info__text[data-text="'+target+'"]').addClass('info__text--active');
  });

  $('.radioblock--reports .radioblock__item').click(function(e){
    var target = $(this).data('target');
    $('.report__img').removeClass('report__img--active');
    $('.report__img[data-index="'+target+'"]').addClass('report__img--active');
  });

  $('.accordeon__preview').click(function(e){
    $(this).closest('.accordeon').toggleClass('accordeon--active');
  });
  
  $('.checkbox').click(function(e){
    
    var checkbox = $(this);
    var input = checkbox.find('.checkbox__input')
    checkbox.toggleClass('checkbox--active');
    input.prop('checked', !input.prop('checked'));
    input.trigger('change');
  });

  
  $('.circles__layer').parallax(
    { mouseport: $("body"), xorigin: 0, yorigin: 0 },
    { xparallax: '100px', yparallax: '100px' },
    { xparallax: '50px', yparallax: '50px' },
    { xparallax: '75px', yparallax: '75px' },
    { xparallax: '15px', yparallax: '15px' },
    { xparallax: '30px', yparallax: '30px' }
  );
  
  var reviews_big = $('.slider--big ul').lightSlider({
    item:1,
    loop:true,
    infinite:true,
    slideMove:1,
    easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
    speed:600,
    controls:true,
    pager:false,
    adaptiveHeight:true
  });  

  $('.slider--big .slider__arrow--prev').on('click', function(e) {
      reviews_big.goToPrevSlide();
  });

  $('.slider--big .slider__arrow--next').on('click', function(e) {
      reviews_big.goToNextSlide();
  });


  var reviews = $('.slider--reviews ul').lightSlider({
    item:6,
    loop:true,
    infinite:true,
    slideMove:2,
    easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
    speed:600,
    controls:false,
    pager:false,
    responsive : [
      {
        breakpoint:1200,
        settings: {
          item:4,
          slideMove:1,
        }
      },
      {
        breakpoint:768,
        settings: {
          item:2,
          slideMove:1
        }
      },
      {
        breakpoint:560,
        settings: {
          item:1,
          slideMove:1
        }
      }
    ]
  });   
  
  $('.slider--reviews .slider__arrow--prev').on('click', function(e) {
      reviews.goToPrevSlide();
  });

  $('.slider--reviews .slider__arrow--next').on('click', function(e) {
      reviews.goToNextSlide();
  });

  $('.table__cell:nth-child(1)').addClass('table__cell--active');

  $('.scroll-to-target').click(function(e) {
    console.log('scroll-to-target');
    var target = $(this).attr('href');
    var offset = 100;
    if ($(this).data('offset') != undefined) offset = $(this).data('offset');
    $('.nav').removeClass('nav--active');
    $.scrollTo(target, 600, { offset: -offset });
    return false;
  });

  $('.navbar-toggler').click(function(e){
    var target = $(this).data('target');
    $('#'+target).toggleClass('nav--active');
  });

  
  
  if ($('#gears').length) {
    bodymovin.loadAnimation({
      container: document.getElementById('gears'), 
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '/assets/gears.json'
    });
  }

  if ($('#list').length) {
    bodymovin.loadAnimation({
      container: document.getElementById('list'), 
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '/assets/checklist.json'
    });
  }

  if ($('#monitor').length) {
    bodymovin.loadAnimation({
      container: document.getElementById('monitor'), 
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '/assets/monitor.json'
    });
  }

  if ($('#cloud').length) {
    bodymovin.loadAnimation({
      container: document.getElementById('cloud'), 
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '/assets/cloud.json'
    });
  }

  if ($('#smartphone').length) {
    bodymovin.loadAnimation({
      container: document.getElementById('smartphone'), 
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '/assets/smartphone.json'
    });
  }

  if ($('#system').length) {
    bodymovin.loadAnimation({
      container: document.getElementById('system'), 
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '/assets/arrows.json'
    });
  }

  if ($('.icosahedron').length) {
    var labels = $('.icosahedron').data('labels');

    var current_language = document.cookie.match(new RegExp("(?:^|; )current_language=([^;]*)"));
    current_language = current_language ? decodeURIComponent(current_language[1]) : undefined;

    var icosahedron = new Icosahedron({
      container: document.querySelector(".icosahedron"),
      radius: 100,
      vertexLabels: getVertexLabels(labels,current_language)
    });
    icosahedron.show(1e3);  
  }
  if ($('.table').length) {
    Table.init();
  }

  initMap();

  if ($('.baron').length) {
    baron({
        root: '.baron',
        scroller: '.baron__scroller',
        bar: '.baron__bar',
        scrollingCls: '_scrolling',
        draggingCls: '_dragging'
    }).controls({
      // Element to be used as interactive track. Note: it could be different from 'track' param of baron.
      track: '.baron__track',
      forward: '.baron__down',
      backward: '.baron__up'
    });


  }
});
