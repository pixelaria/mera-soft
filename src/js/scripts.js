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

$(function (){
  console.log('init');

  $('.radioblock__item').click(function(e){
    $(this).parent().find('.radioblock__item').removeClass('radioblock__item--active');
    $(this).addClass('radioblock__item--active');
  });
});