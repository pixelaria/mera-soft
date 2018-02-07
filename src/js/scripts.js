function initMap() {
  var uluru = {lat: 55.709759, lng: 37.597026};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 17,
    center: uluru
  });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });
}

function getVertexLabels() {
  var labels = ["Вершина 1","Вершина 2","Вершина 3","Вершина 4","Вершина 5","Вершина 6","Вершина 7","Вершина 8","Вершина 9","Вершина 10","Вершина 11","Вершина 12"];
  return labels;
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
    var r = new THREE.PointLight(16777215, .4);
    r.position.z = 150, r.position.y = -300, r.position.x = 25, t.scene.add(r)
  },
  setupObject: function() {
    var t = this;
    
    t.material = new THREE.MeshPhongMaterial({
      color: new THREE.Color("rgb(47,198,85)"),
      emissive: new THREE.Color("rgb(65,180,102)"),
      emissiveIntensity: 0.2,
      specular: new THREE.Color("rgb(56,149,98)"),
      shininess: 7
    });

    t.geometry = new THREE.IcosahedronGeometry(t.radius, 0); 

    t.lowResMesh = new THREE.Mesh(t.geometry, t.material);

    (new THREE.OBJLoader).load("./img/icosa.min.obj", function(e) {
      e.traverse(function(e) {
        if(e instanceof THREE.Mesh) {
          var i = (new THREE.Geometry).fromBufferGeometry(e.geometry);
          i.computeFaceNormals(), i.mergeVertices(), i.computeVertexNormals(), e.geometry = (new THREE.BufferGeometry).fromGeometry(i), e.material = t.material
        }
      }), t.highResMesh = e, t.highResMesh.scale.set(t.OBJ_SCALE, t.OBJ_SCALE, t.OBJ_SCALE), t.scene.add(t.highResMesh)
    });

    t.vertices = [];
    for(var e = 0; e < t.geometry.vertices.length; e++) {
      var i = document.createElement("div");
      i.classList.add("icosahedron__marker"), i.classList.add("initially-hidden");
      var n = document.createElement("div");
      n.classList.add("icosahedron__container");
      var r = document.createElement("div");
      r.classList.add("icosahedron__label"), r.innerHTML = t.vertexLabels[e], n.appendChild(r), i.appendChild(n), t.container.appendChild(i), t.vertices.push({
        marker: i,
        labelContainer: n,
        label: r,
        z: -1
      })
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
  console.log('init');

  $('.radioblock__item').click(function(e){
    $(this).parent().find('.radioblock__item').removeClass('radioblock__item--active');
    $(this).addClass('radioblock__item--active');
  });

  $('.slider').unslider({
    arrows:false,
    autoplay: true
  });

  $('.slider').unslider('initSwipe');


  bodymovin.loadAnimation({
    container: document.getElementById('gears'), 
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: './icons/gears.json'
  });
  bodymovin.loadAnimation({
    container: document.getElementById('list'), 
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: './icons/checklist.json'
  });
  bodymovin.loadAnimation({
    container: document.getElementById('monitor'), 
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: './icons/monitor.json'
  });
  bodymovin.loadAnimation({
    container: document.getElementById('cloud'), 
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: './icons/cloud.json'
  });
      bodymovin.loadAnimation({
    container: document.getElementById('smartphone'), 
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: './icons/arrows.json'
  });
  var icosahedron = new Icosahedron({
    container: document.querySelector(".icosahedron"),
    radius: 100,
    vertexLabels: getVertexLabels()
  });

  icosahedron.show(1e3);

});


